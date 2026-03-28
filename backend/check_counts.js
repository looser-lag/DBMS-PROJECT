const pool = require('./db');
async function check() {
    try {
        const counts = await pool.query(`
            SELECT 
                (SELECT COUNT(*) FROM SKILL) as skill_count,
                (SELECT COUNT(*) FROM "USER") as user_count,
                (SELECT COUNT(*) FROM USER_SKILL) as user_skill_count,
                (SELECT COUNT(*) FROM CATEGORY) as category_count
        `);
        console.log("DATABASE_COUNTS:" + JSON.stringify(counts.rows[0]));
    } catch (err) {
        console.error("Check failed:", err);
    } finally {
        process.exit();
    }
}
check();
