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
    const res = await pool.query('SELECT user_id, name, email FROM "USER" ORDER BY user_id ASC');
    console.log(JSON.stringify(res.rows, null, 2));
    
    const seq = await pool.query('SELECT last_value FROM "USER_user_id_seq"');
    console.log("Current sequence value:", seq.rows[0].last_value);
  } catch (err) {
    console.error(err.message);
  } finally {
    await pool.end();
  }
}

run();
