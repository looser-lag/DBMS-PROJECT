const pool = require('./db');
async function run() {
    const r = await pool.query('SELECT user_id, name, email FROM "USER"');
    console.log(JSON.stringify(r.rows, null, 2));
    await pool.end();
}
run();
