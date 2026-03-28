const pool = require('./db');

async function check() {
    try {
        console.log("--- SEARCHING FOR USERS ---");
        const specificUsers = await pool.query('SELECT user_id, name, role FROM "USER" WHERE name ILIKE $1 OR name ILIKE $2', ['%jaswanth%', '%nithin%']);
        console.log(JSON.stringify(specificUsers.rows, null, 2));

        console.log("\n--- ALL USERS ---");
        const users = await pool.query('SELECT user_id, name, email, role FROM "USER"');
        console.log(JSON.stringify(users.rows, null, 2));

        console.log("\n--- USER SKILLS ---");
        const userSkills = await pool.query(`
            SELECT us.user_id, u.name, s.skill_name 
            FROM USER_SKILL us
            JOIN "USER" u ON us.user_id = u.user_id
            JOIN SKILL s ON us.skill_id = s.skill_id
        `);
        console.log(JSON.stringify(userSkills.rows, null, 2));

        console.log("\n--- SERVICE REQUESTS ---");
        const requests = await pool.query('SELECT * FROM SERVICE_REQUEST');
        console.log(JSON.stringify(requests.rows, null, 2));

        console.log("\n--- SERVICE ASSIGNMENTS ---");
        const assignments = await pool.query('SELECT * FROM SERVICE_ASSIGNMENT');
        console.log(JSON.stringify(assignments.rows, null, 2));

    } catch (err) {
        console.error(err);
    } finally {
        await pool.end();
    }
}

check();
