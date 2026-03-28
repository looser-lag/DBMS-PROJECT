const pool = require('./db');

async function debug() {
    try {
        const users = await pool.query('SELECT user_id, name FROM "USER"');
        console.log("USERS:", JSON.stringify(users.rows, null, 2));

        const assignments = await pool.query(`
      SELECT sa.*, sr.status as request_status, s.skill_name 
      FROM SERVICE_ASSIGNMENT sa
      JOIN SERVICE_REQUEST sr ON sa.request_id = sr.request_id
      JOIN SKILL s ON sr.skill_id = s.skill_id
      WHERE s.skill_name ILIKE '%python%'
    `);
        console.log("PYTHON ASSIGNMENTS:", JSON.stringify(assignments.rows, null, 2));

        const requests = await pool.query(`
      SELECT sr.*, s.skill_name 
      FROM SERVICE_REQUEST sr
      JOIN SKILL s ON sr.skill_id = s.skill_id
      WHERE s.skill_name ILIKE '%python%'
    `);
        console.log("PYTHON REQUESTS:", JSON.stringify(requests.rows, null, 2));

    } catch (err) {
        console.error(err);
    } finally {
        process.exit(0);
    }
}

debug();
