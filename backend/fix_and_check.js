const pool = require('./db');
async function run() {
    console.log("1. Fixing roles...");
    await pool.query("UPDATE \"USER\" SET role = 'Both' WHERE name ILIKE '%nithin%' OR name ILIKE '%jaswanth%'");

    const nithin = await pool.query("SELECT user_id FROM \"USER\" WHERE name ILIKE '%nithin%' LIMIT 1");
    const nithinId = nithin.rows[0]?.user_id;

    if (nithinId) {
        console.log(`2. Linking request 7 to nithin (ID: ${nithinId})...`);
        // Check if assignment exists
        const assigned = await pool.query("SELECT * FROM SERVICE_ASSIGNMENT WHERE request_id = 7");
        if (assigned.rows.length === 0) {
            await pool.query("INSERT INTO SERVICE_ASSIGNMENT (request_id, provider_id) VALUES (7, $1)", [nithinId]);
            await pool.query("UPDATE SERVICE_REQUEST SET status = 'Assigned' WHERE request_id = 7");
            console.log("✅ Linked request 7 to nithin.");
        } else {
            console.log("Request 7 already assigned.");
        }
    }

    console.log("\n3. Verifying Assignments for nithin...");
    const assignments = await pool.query(`
        SELECT sa.*, sr.description, s.skill_name, u.name as requester
        FROM SERVICE_ASSIGNMENT sa
        JOIN SERVICE_REQUEST sr ON sa.request_id = sr.request_id
        JOIN SKILL s ON sr.skill_id = s.skill_id
        JOIN "USER" u ON sr.requester_id = u.user_id
        WHERE sa.provider_id = $1
    `, [nithinId]);
    console.log(JSON.stringify(assignments.rows, null, 2));

    await pool.end();
}
run();
