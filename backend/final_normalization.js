const pool = require('./db');

async function finalNormalization() {
    try {
        console.log("Starting final normalization...");

        // 1. Check if the column exists
        const checkCol = await pool.query(
            "SELECT column_name FROM information_schema.columns WHERE table_name = 'user_skill' AND column_name = 'availability'"
        );

        if (checkCol.rows.length === 0) {
            console.log("Column 'availability' already removed from 'user_skill'. No migration needed.");
            process.exit(0);
        }

        // 2. Fetch rows that have non-empty availability strings
        const rows = await pool.query("SELECT user_id, skill_id, availability FROM USER_SKILL WHERE availability IS NOT NULL AND availability != ''");
        console.log(`Found ${rows.rows.length} rows to migrate.`);

        const dayMap = {
            'monday': 'Monday', 'mondays': 'Monday',
            'tuesday': 'Tuesday', 'tuesdays': 'Tuesday',
            'wednesday': 'Wednesday', 'wednesdays': 'Wednesday',
            'thursday': 'Thursday', 'thursdays': 'Thursday',
            'friday': 'Friday', 'fridays': 'Friday',
            'saturday': 'Saturday', 'saturdays': 'Saturday',
            'sunday': 'Sunday', 'sundays': 'Sunday',
            'weekend': ['Saturday', 'Sunday'],
            'weekends': ['Saturday', 'Sunday'],
            'everyday': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            'anytime': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        };

        for (const row of rows.rows) {
            const { user_id, skill_id, availability } = row;
            let rawDays = availability.toLowerCase().split(/[,\s&]+/).map(d => d.trim()).filter(d => d);
            
            let expandedDays = new Set();
            for (let d of rawDays) {
                const mapped = dayMap[d];
                if (Array.isArray(mapped)) {
                    mapped.forEach(day => expandedDays.add(day));
                } else if (mapped) {
                    expandedDays.add(mapped);
                } else {
                    // Try to match partials like "Mon", "Tue"
                    const fullDay = Object.values(dayMap).find(val => typeof val === 'string' && val.toLowerCase().startsWith(d));
                    if (fullDay) expandedDays.add(fullDay);
                }
            }

            console.log(`Migrating skill ${skill_id} for user ${user_id}: [${availability}] -> [${Array.from(expandedDays).join(', ')}]`);

            for (const day of expandedDays) {
                await pool.query(
                    "INSERT INTO USER_SKILL_AVAILABILITY (user_id, skill_id, day_of_week) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING",
                    [user_id, skill_id, day]
                );
            }
        }

        // 3. Drop the column
        console.log("Dropping 'availability' column from 'user_skill'...");
        await pool.query("ALTER TABLE USER_SKILL DROP COLUMN availability");
        console.log("Migration successful! Column dropped.");

        process.exit(0);
    } catch (err) {
        console.error("Migration failed:", err);
        process.exit(1);
    }
}

finalNormalization();
