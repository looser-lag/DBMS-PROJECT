const pool = require('./db');
async function check() {
    try {
        const res = await pool.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");
        console.log("Tables in DB:");
        console.table(res.rows);
    } catch (err) {
        console.error("Check failed:", err);
    } finally {
        process.exit();
    }
}
check();
