const pool = require('./db');

async function checkData() {
    try {
        console.log("--- USER_SKILL_AVAILABILITY content ---");
        const avail = await pool.query("SELECT * FROM USER_SKILL_AVAILABILITY");
        console.table(avail.rows);
        
        console.log("\n--- Example row for user_id=1, skill_id=10 ---");
        const example = await pool.query("SELECT * FROM USER_SKILL_AVAILABILITY WHERE user_id = 1 AND skill_id = 10");
        console.table(example.rows);

        process.exit(0);
    } catch (err) {
        process.exit(1);
    }
}

checkData();
