const pool = require('./db');
async function check() {
    try {
        const res = await pool.query(`
            SELECT u.name, s.skill_name, us.availability 
            FROM "USER" u 
            JOIN USER_SKILL us ON u.user_id = us.user_id 
            JOIN SKILL s ON us.skill_id = s.skill_id 
            WHERE u.name ILIKE $1`, ['%nithin%']);
        console.log(JSON.stringify(res.rows, null, 2));
    } catch (e) {
        console.error(e);
    } finally {
        pool.end();
    }
}
check();
