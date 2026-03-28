const pool = require('./db');
async function testQuery() {
    try {
        const query = `
             SELECT s.skill_id, s.skill_name, c.category_name, u.name as provider_name, 
                    us.experience_level, us.hourly_rate
             FROM SKILL s
             JOIN CATEGORY c ON s.category_id = c.category_id
             JOIN USER_SKILL us ON s.skill_id = us.skill_id
             JOIN "USER" u ON us.user_id = u.user_id
        `;
        const result = await pool.query(query);
        console.log("QUERY_RESULT_COUNT:" + result.rows.length);
        console.log("QUERY_RESULT:" + JSON.stringify(result.rows));
    } catch (err) {
        console.error("Query failed:", err.stack);
    } finally {
        process.exit();
    }
}
testQuery();
