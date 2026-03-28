const pool = require('./db');
async function check() {
    try {
        const skills = await pool.query("SELECT * FROM SKILL");
        const userSkills = await pool.query("SELECT * FROM USER_SKILL");
        const users = await pool.query("SELECT * FROM \"USER\"");

        console.log("--- SKILL Table ---");
        console.table(skills.rows);
        console.log("--- USER_SKILL Table ---");
        console.table(userSkills.rows);
        console.log("--- USER Table ---");
        console.table(users.rows);
    } catch (err) {
        console.error("Check failed:", err);
    } finally {
        process.exit();
    }
}
check();
