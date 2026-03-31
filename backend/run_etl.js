const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

async function runETL() {
  console.log('🚀 Starting Data Warehouse ETL Pipeline...\n');

  try {
    // ---- 1. SETUP: Create Tables & Clean existing warehouse data ----
    console.log('🏗️  Creating Data Warehouse Schema...');
    const schemaSql = fs.readFileSync(path.join(__dirname, '..', 'data_warehouse.sql'), 'utf-8');
    await pool.query(schemaSql);
    
    console.log('🧹 Formatting Data Warehouse dimension and fact tables for a fresh load...');
    await pool.query('TRUNCATE TABLE F_SERVICE_COMPLETIONS RESTART IDENTITY CASCADE');
    await pool.query('TRUNCATE TABLE D_SKILL RESTART IDENTITY CASCADE');
    await pool.query('TRUNCATE TABLE D_USER RESTART IDENTITY CASCADE');
    await pool.query('TRUNCATE TABLE D_DATE RESTART IDENTITY CASCADE');
    console.log('✅ Tables cleaned and ready.\n');

    // ---- 2. EXTRACT & LOAD: D_USER Dimension ----
    console.log('🔄 Extracting Users...');
    const users = await pool.query('SELECT user_id, name, department, year, role FROM "USER"');
    for (const u of users.rows) {
      await pool.query(
        'INSERT INTO D_USER (user_id, name, department, year, role) VALUES ($1, $2, $3, $4, $5)',
        [u.user_id, u.name, u.department, u.year, u.role]
      );
    }
    console.log(`✅ Loaded ${users.rowCount} users into D_USER.\n`);

    // ---- 3. EXTRACT & LOAD: D_SKILL Dimension ----
    console.log('🔄 Extracting Skills and Categories...');
    const skills = await pool.query(`
      SELECT s.skill_id, s.skill_name, c.category_name 
      FROM SKILL s
      JOIN CATEGORY c ON s.category_id = c.category_id
    `);
    for (const s of skills.rows) {
      await pool.query(
        'INSERT INTO D_SKILL (skill_id, skill_name, category_name) VALUES ($1, $2, $3)',
        [s.skill_id, s.skill_name, s.category_name]
      );
    }
    console.log(`✅ Loaded ${skills.rowCount} skills into D_SKILL.\n`);

    // ---- 4. EXTRACT & LOAD: D_DATE Dimension ----
    console.log('🔄 Extracting Dates from completed assignments...');
    const dates = await pool.query(`
      SELECT DISTINCT DATE(completion_date) as c_date 
      FROM SERVICE_ASSIGNMENT 
      WHERE status = 'Completed' AND completion_date IS NOT NULL
    `);
    
    for (const d of dates.rows) {
      const dateObj = new Date(d.c_date);
      const year = dateObj.getFullYear();
      const month = dateObj.getMonth() + 1; // 0-indexed
      const day = dateObj.getDate();
      
      const date_key = parseInt(`${year}${month.toString().padStart(2, '0')}${day.toString().padStart(2, '0')}`);
      const day_name = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
      const month_name = dateObj.toLocaleDateString('en-US', { month: 'long' });
      const is_weekend = (dateObj.getDay() === 0 || dateObj.getDay() === 6);

      await pool.query(
        'INSERT INTO D_DATE (date_key, full_date, year, month, day, day_name, month_name, is_weekend) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) ON CONFLICT DO NOTHING',
        [date_key, dateObj, year, month, day, day_name, month_name, is_weekend]
      );
    }
    console.log(`✅ Loaded ${dates.rowCount} precise dates into D_DATE.\n`);

    // ---- 5. EXTRACT & LOAD: F_SERVICE_COMPLETIONS (The Fact Table) ----
    console.log('🔄 Extracting completed assignments to build the Fact Table...');
    const facts = await pool.query(`
      SELECT 
        sa.assignment_id,
        sa.provider_id,
        sr.requester_id,
        sr.skill_id,
        sa.completion_date,
        f.rating
      FROM SERVICE_ASSIGNMENT sa
      JOIN SERVICE_REQUEST sr ON sa.request_id = sr.request_id
      LEFT JOIN FEEDBACK f ON sa.assignment_id = f.assignment_id
      WHERE sa.status = 'Completed' AND sa.completion_date IS NOT NULL
    `);

    // Fetch Surrogate Keys Maps
    const dUsers = await pool.query('SELECT user_id, user_key FROM D_USER');
    const userMap = {}; dUsers.rows.forEach(r => userMap[r.user_id] = r.user_key);

    const dSkills = await pool.query('SELECT skill_id, skill_key FROM D_SKILL');
    const skillMap = {}; dSkills.rows.forEach(r => skillMap[r.skill_id] = r.skill_key);

    let factsLoaded = 0;
    for (const f of facts.rows) {
      const dateObj = new Date(f.completion_date);
      const year = dateObj.getFullYear();
      const month = dateObj.getMonth() + 1;
      const day = dateObj.getDate();
      const date_key = parseInt(`${year}${month.toString().padStart(2, '0')}${day.toString().padStart(2, '0')}`);

      const provider_key = userMap[f.provider_id];
      const requester_key = userMap[f.requester_id];
      const skill_key = skillMap[f.skill_id];

      if (provider_key && requester_key && skill_key && date_key) {
        await pool.query(
          'INSERT INTO F_SERVICE_COMPLETIONS (assignment_id, provider_key, requester_key, skill_key, completion_date_key, rating) VALUES ($1, $2, $3, $4, $5, $6)',
          [f.assignment_id, provider_key, requester_key, skill_key, date_key, f.rating]
        );
        factsLoaded++;
      }
    }
    console.log(`✅ Loaded ${factsLoaded} detailed completion metrics into F_SERVICE_COMPLETIONS.\n`);
    
    console.log('🎉 ETL Pipeline Finished Successfully! Your Data Warehouse is ready for Business Intelligence queries.');

  } catch (err) {
    console.error('❌ ETL Pipeline Failed:', err);
  } finally {
    pool.end();
  }
}

runETL();
