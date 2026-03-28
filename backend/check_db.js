const pool = require('./db');
const fs = require('fs');
async function check() {
    try {
        const res = await pool.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'USER'");
        fs.writeFileSync('db_columns.json', JSON.stringify(res.rows, null, 2));
        console.log("Check complete. See db_columns.json");
    } catch (err) {
        console.error("Check failed:", err);
    } finally {
        process.exit();
    }
}
check();
