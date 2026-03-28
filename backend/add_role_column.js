const pool = require('./db');
async function addRoleColumn() {
    try {
        console.log("Adding role column to USER table...");
        await pool.query('ALTER TABLE "USER" ADD COLUMN IF NOT EXISTS role VARCHAR(50) DEFAULT \'Receiver\'');
        console.log("Success!");
    } catch (err) {
        console.error("Failed to add role column:", err);
    } finally {
        process.exit();
    }
}
addRoleColumn();
