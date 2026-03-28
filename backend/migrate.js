const pool = require('./db');
async function migrate() {
    try {
        console.log("Adding availability column to USER_SKILL...");
        await pool.query("ALTER TABLE USER_SKILL ADD COLUMN IF NOT EXISTS availability VARCHAR(255)");
        console.log("Success!");
    } catch (err) {
        console.error("Migration failed:", err);
    } finally {
        process.exit();
    }
}
migrate();
