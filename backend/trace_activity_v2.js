const pool = require('./db');

async function checkActivity(userId) {
    try {
        console.log("Checking for User ID:", userId);

        // Check assignments for this user
        const allAssignments = await pool.query(`
      SELECT sa.assignment_id, sa.provider_id, sa.status as assignment_status, 
             sr.requester_id, sr.status as request_status, s.skill_name
      FROM SERVICE_ASSIGNMENT sa
      JOIN SERVICE_REQUEST sr ON sa.request_id = sr.request_id
      JOIN SKILL s ON sr.skill_id = s.skill_id
    `);
        console.log("ALL ASSIGNMENTS IN DB:", JSON.stringify(allAssignments.rows, null, 2));

        const completed = allAssignments.rows.filter(r =>
            (r.provider_id == userId || r.requester_id == userId) && r.assignment_status == 'Completed'
        );
        console.log("FILTERED COMPLETED FOR USER:", completed.length);

    } catch (err) {
        console.error(err);
    } finally {
        process.exit(0);
    }
}

checkActivity(5);
