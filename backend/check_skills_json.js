const pool = require('./db');
async function check() {
    try {
        const skills = await pool.query("SELECT * FROM SKILL");
        const userSkills = await pool.query("SELECT * FROM USER_SKILL");
        const users = await pool.query("SELECT * FROM \"USER\"");

        console.log("SKILLS_JSON:" + JSON.stringify(skills.rows));
        console.log("USERSKILLS_JSON:" + JSON.stringify(userSkills.rows));
        console.log("USERS_JSON:" + JSON.stringify(users.rows));
    } catch (err) {
        console.error("Check failed:", err);
    } finally {
        process.exit();
    }
}
check();
