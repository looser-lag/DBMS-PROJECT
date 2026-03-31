const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function checkCounts() {
  try {
    const tables = ['CATEGORY', 'SKILL', '"USER"', 'USER_PHONE', 'USER_SKILL', 'SERVICE_REQUEST', 'SERVICE_ASSIGNMENT', 'FEEDBACK'];
    console.log('--- Database Row Counts ---');
    for (const table of tables) {
      const res = await pool.query(`SELECT COUNT(*) FROM ${table}`);
      console.log(`${table}: ${res.rows[0].count}`);
    }
  } catch (err) {
    console.error('Error checking counts:', err.message);
  } finally {
    await pool.end();
  }
}

checkCounts();
