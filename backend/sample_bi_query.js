const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

async function runBIQueries() {
  console.log('📊 Starting Business Intelligence Suite...\n');

  try {
    // ----------------------------------------------------
    // QUERY 1: Department Performance
    // ----------------------------------------------------
    console.log('========================================================================');
    console.log('📝 QUESTION 1: Performance by University Department');
    console.log('Which departments are providing the most completed jobs, and what are their average ratings?');
    console.log('========================================================================');
    
    const q1 = await pool.query(`
      SELECT 
        d.department, 
        COUNT(f.completion_id) as total_completed_jobs, 
        CAST(AVG(f.rating) AS DECIMAL(10,2)) as avg_rating 
      FROM F_SERVICE_COMPLETIONS f 
      JOIN D_USER d ON f.provider_key = d.user_key 
      GROUP BY d.department 
      ORDER BY total_completed_jobs DESC, avg_rating DESC
    `);
    console.table(q1.rows);

    // ----------------------------------------------------
    // QUERY 2: Most Popular Skill Categories
    // ----------------------------------------------------
    console.log('\n========================================================================');
    console.log('🏆 QUESTION 2: Most Popular Skill Categories');
    console.log('What types of services are in the highest demand among students?');
    console.log('========================================================================');
    
    const q2 = await pool.query(`
      SELECT 
        s.category_name, 
        COUNT(f.completion_id) as total_jobs
      FROM F_SERVICE_COMPLETIONS f
      JOIN D_SKILL s ON f.skill_key = s.skill_key
      GROUP BY s.category_name
      ORDER BY total_jobs DESC
    `);
    console.table(q2.rows);

    // ----------------------------------------------------
    // QUERY 3: Time & Activity Analysis
    // ----------------------------------------------------
    console.log('\n========================================================================');
    console.log('📅 QUESTION 3: Student Activity Tracing (Weekdays vs. Weekends)');
    console.log('Do students tend to finish their service assignments on weekends or weekdays?');
    console.log('========================================================================');
    
    const q3 = await pool.query(`
      SELECT 
        CASE WHEN dt.is_weekend THEN 'Weekend (Sat/Sun)' ELSE 'Weekday (Mon-Fri)' END as time_of_week,
        COUNT(f.completion_id) as jobs_completed
      FROM F_SERVICE_COMPLETIONS f
      JOIN D_DATE dt ON f.completion_date_key = dt.date_key
      GROUP BY time_of_week
      ORDER BY jobs_completed DESC
    `);
    console.table(q3.rows);

    // ----------------------------------------------------
    // QUERY 4: Top Performing Providers
    // ----------------------------------------------------
    console.log('\n========================================================================');
    console.log('🌟 QUESTION 4: Identify the "Top Student Providers"');
    console.log('Who are our best providers based on the Star Schema fact table logs?');
    console.log('========================================================================');
    
    const q4 = await pool.query(`
      SELECT 
        d.name as provider_name,
        d.department,
        COUNT(f.completion_id) as total_jobs_done,
        CAST(AVG(f.rating) AS DECIMAL(10,2)) as avg_rating
      FROM F_SERVICE_COMPLETIONS f
      JOIN D_USER d ON f.provider_key = d.user_key
      GROUP BY provider_name, d.department
      HAVING COUNT(f.completion_id) > 0
      ORDER BY total_jobs_done DESC, avg_rating DESC
    `);
    console.table(q4.rows);

    console.log('\n✅ BI Suite execution completed.');

  } catch (err) {
    console.error('❌ Query failed:', err.message);
  } finally {
    pool.end();
  }
}

runBIQueries();
