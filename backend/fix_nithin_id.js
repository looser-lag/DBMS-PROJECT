const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

async function run() {
  try {
    // 1. First delete Nithin's potentially conflicting entries in dependent tables if ID 77 was used
    await pool.query('DELETE FROM USER_PHONE WHERE user_id = 77');
    await pool.query('DELETE FROM USER_SKILL WHERE user_id = 77');
    
    // 2. Update Nithin's ID to 26
    const res = await pool.query('UPDATE "USER" SET user_id = 26 WHERE email = \'nithin@university.edu\'');
    console.log(`Updated ${res.rowCount} user rows.`);
    
    // 3. Reset the sequence
    await pool.query('SELECT setval(\'"USER_user_id_seq"\', 26)');
    
    console.log('Successfully fixed Nithin ID to 26 and reset sequence.');
  } catch (err) {
    console.error('Error fixing record:', err.message);
  } finally {
    await pool.end();
  }
}

run();
