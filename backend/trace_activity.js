const pool = require('./db');

async function checkActivity(userId) {
    try {
        const skillsResult = await pool.query(
            `SELECT s.skill_name as title, 'Skill Added' as type, CURRENT_TIMESTAMP as date
         FROM SKILL s
         JOIN USER_SKILL us ON s.skill_id = us.skill_id
         WHERE us.user_id = $1
         ORDER BY s.skill_id DESC LIMIT 5`,
            [userId]
        );

        const requestsResult = await pool.query(
            `SELECT s.skill_name as title, 'Request Created' as type, sr.preferred_date as date
         FROM SERVICE_REQUEST sr
         JOIN SKILL s ON sr.skill_id = s.skill_id
         WHERE sr.requester_id = $1
         ORDER BY sr.request_id DESC LIMIT 5`,
            [userId]
        );

        const completedResult = await pool.query(
            `SELECT s.skill_name as title, 'Task Completed' as type, sa.completion_date as date
         FROM SERVICE_ASSIGNMENT sa
         JOIN SERVICE_REQUEST sr ON sa.request_id = sr.request_id
         JOIN SKILL s ON sr.skill_id = s.skill_id
         WHERE (sa.provider_id = $1 OR sr.requester_id = $1) AND sa.status = 'Completed'
         ORDER BY sa.completion_date DESC LIMIT 5`,
            [userId]
        );

        console.log("SKILLS:", skillsResult.rows.length);
        console.log("REQUESTS:", requestsResult.rows.length);
        console.log("COMPLETED:", completedResult.rows.length);
        if (completedResult.rows.length > 0) {
            console.log("COMPLETED DATA:", JSON.stringify(completedResult.rows, null, 2));
        }

        const activity = [
            ...skillsResult.rows,
            ...requestsResult.rows,
            ...completedResult.rows
        ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10);

        console.log("FINAL ACTIVITY:", JSON.stringify(activity, null, 2));

    } catch (err) {
        console.error(err);
    } finally {
        process.exit(0);
    }
}

checkActivity(5); // Check for Nithin
