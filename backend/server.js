const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

// Serve the Admin Dashboard
app.use('/admin', express.static(path.join(__dirname, 'admin_public')));// Request logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`, req.body);
    next();
});

// Basic health check endpoint
app.get('/', (req, res) => {
    res.json({ message: 'Campus Skill Exchange API is running!', version: '1.1.0' });
});

// Authentication Endpoints
app.post('/api/auth/register', async (req, res) => {
    const { name, email, password, role, department, year, phone } = req.body;
    try {
        // Check if user exists
        const userExists = await pool.query('SELECT * FROM "USER" WHERE email = $1', [email]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Insert new user
        const newUser = await pool.query(
            'INSERT INTO "USER" (name, email, department, year, reputation_score, role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [name, email, department || 'General', year || 1, 0.0, role || 'Receiver']
        );

        if (phone) {
            await pool.query(
                'INSERT INTO USER_PHONE (user_id, phone_number) VALUES ($1, $2)',
                [newUser.rows[0].user_id, phone]
            );
        }

        res.json({
            user: newUser.rows[0],
            token: 'mock-jwt-token-for-' + newUser.rows[0].user_id
        });
    } catch (err) {
        console.error("Register Error:", err.stack);
        res.status(500).json({ msg: 'Database error (Register): ' + err.message });
    }
});

app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await pool.query('SELECT * FROM "USER" WHERE email = $1', [email]);
        if (user.rows.length === 0) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // Return user info from DB (including real role)
        res.json({
            user: user.rows[0],
            token: 'mock-jwt-token-for-' + user.rows[0].user_id
        });
    } catch (err) {
        console.error("Login Error:", err.stack);
        res.status(500).json({ msg: 'Database error (Login): ' + err.message });
    }
});

// Example API Endpoint: Get all available skills
app.get('/api/skills', async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT s.skill_id, s.skill_name, c.category_name, u.name as provider_name, 
                    us.user_id as provider_id, us.experience_level, us.hourly_rate, 
                    us.availability, u.reputation_score
             FROM SKILL s
             JOIN CATEGORY c ON s.category_id = c.category_id
             JOIN USER_SKILL us ON s.skill_id = us.skill_id
             JOIN "USER" u ON us.user_id = u.user_id
             ORDER BY s.skill_id DESC`
        );
        res.json(result.rows);
    } catch (err) {
        console.error("Fetch Skills Error:", err.stack);
        res.status(500).json({ msg: 'Database error fetching skills' });
    }
});

// Example API Endpoint: Add a new skill
app.post('/api/skills', async (req, res) => {
    const { skillName, categoryId, categoryName, experienceLevel, hourlyRate, availability, userId } = req.body;
    try {
        let finalCategoryId = categoryId;

        // If no categoryId is provided but categoryName is, try to find or create the category
        if (!finalCategoryId && categoryName) {
            const catResult = await pool.query("SELECT category_id FROM CATEGORY WHERE category_name = $1", [categoryName]);
            if (catResult.rows.length > 0) {
                finalCategoryId = catResult.rows[0].category_id;
            } else {
                const newCat = await pool.query("INSERT INTO CATEGORY (category_name) VALUES ($1) RETURNING category_id", [categoryName]);
                finalCategoryId = newCat.rows[0].category_id;
            }
        }

        if (!finalCategoryId) finalCategoryId = 5; // Default to 'Other' if still null

        // 1. Check if skill exists, else insert into SKILL table
        let skillId;
        const existingSkill = await pool.query("SELECT skill_id FROM SKILL WHERE skill_name = $1 AND category_id = $2", [skillName, finalCategoryId]);
        
        if (existingSkill.rows.length > 0) {
            skillId = existingSkill.rows[0].skill_id;
            console.log(`Reusing existing skill_id: ${skillId} for "${skillName}"`);
        } else {
            const newSkill = await pool.query(
                "INSERT INTO SKILL (skill_name, category_id, description) VALUES ($1, $2, $3) RETURNING *",
                [skillName, finalCategoryId, 'Newly added skill']
            );
            skillId = newSkill.rows[0].skill_id;
        }

        // 2. Check if this user already offers this skill
        let numericRate = parseFloat(hourlyRate);
        if (isNaN(numericRate)) numericRate = 0.0;

        const existingUserSkill = await pool.query("SELECT * FROM USER_SKILL WHERE user_id = $1 AND skill_id = $2", [userId || 1, skillId]);
        
        if (existingUserSkill.rows.length > 0) {
            // Update existing entry
            await pool.query(
                "UPDATE USER_SKILL SET experience_level = $1, hourly_rate = $2, availability = $3, availability_status = $4 WHERE user_id = $5 AND skill_id = $6",
                [experienceLevel, numericRate, availability || 'Weekends', true, userId || 1, skillId]
            );
            return res.json({ message: "Skill info updated!", skillId });
        } else {
            // Insert into USER_SKILL table
            await pool.query(
                "INSERT INTO USER_SKILL (user_id, skill_id, experience_level, hourly_rate, availability, availability_status) VALUES ($1, $2, $3, $4, $5, $6)",
                [userId || 1, skillId, experienceLevel, numericRate, availability || 'Weekends', true]
            );
            res.json({ message: "Skill successfully added!", skillId });
        }
    } catch (err) {
        console.error("Add Skill Error:", err.stack);
        res.status(500).json({ msg: 'Database error adding skill: ' + err.message });
    }
});

// API Endpoint: Get user activity
app.get('/api/users/:userId/activity', async (req, res) => {
    const { userId } = req.params;
    try {
        // Fetch recently added skills (No created_at column, using skill_id for order)
        const skillsResult = await pool.query(
            `SELECT s.skill_name as title, 'Skill Added' as type, CURRENT_TIMESTAMP as date
             FROM SKILL s
             JOIN USER_SKILL us ON s.skill_id = us.skill_id
             WHERE us.user_id = $1
             ORDER BY s.skill_id DESC LIMIT 5`,
            [userId]
        );

        // Fetch user's requests using SERVICE_REQUEST
        const requestsResult = await pool.query(
            `SELECT s.skill_name as title, 'Request Created' as type, sr.preferred_date as date
             FROM SERVICE_REQUEST sr
             JOIN SKILL s ON sr.skill_id = s.skill_id
             WHERE sr.requester_id = $1
             ORDER BY sr.request_id DESC LIMIT 5`,
            [userId]
        );

        // Fetch completed assignments
        const completedResult = await pool.query(
            `SELECT s.skill_name as title, 'Task Completed' as type, sa.completion_date as date
             FROM SERVICE_ASSIGNMENT sa
             JOIN SERVICE_REQUEST sr ON sa.request_id = sr.request_id
             JOIN SKILL s ON sr.skill_id = s.skill_id
             WHERE (sa.provider_id = $1 OR sr.requester_id = $1) AND sa.status = 'Completed'
             ORDER BY sa.completion_date DESC LIMIT 5`,
            [userId]
        );

        // Combine, sort by date descending, and limit
        const activity = [
            ...skillsResult.rows,
            ...requestsResult.rows,
            ...completedResult.rows
        ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10);

        console.log(`Activity for user ${userId}:`, activity.length, "items found");
        res.json(activity);
    } catch (err) {
        console.error("Activity Error:", err.stack);
        res.status(500).json({ msg: 'Server Error fetching activity' });
    }
});

// API Endpoint: Get requests created BY a user
app.get('/api/requests/user/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const result = await pool.query(
            `SELECT sr.*, s.skill_name, u.name as provider_name 
             FROM SERVICE_REQUEST sr
             JOIN SKILL s ON sr.skill_id = s.skill_id
             LEFT JOIN SERVICE_ASSIGNMENT sa ON sr.request_id = sa.request_id
             LEFT JOIN "USER" u ON sa.provider_id = u.user_id
             WHERE sr.requester_id = $1
             ORDER BY sr.request_id DESC`,
            [userId]
        );
        res.json(result.rows);
    } catch (err) {
        console.error("User Requests Error:", err.stack);
        res.status(500).json({ msg: 'Database error fetching user requests' });
    }
});

// API Endpoint: Get assignments/requests FOR a provider
app.get('/api/assignments/provider/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const result = await pool.query(
            `SELECT sa.*, sr.description, sr.preferred_date, sr.status, 
                    s.skill_name, u.name as requester_name
             FROM SERVICE_ASSIGNMENT sa
             JOIN SERVICE_REQUEST sr ON sa.request_id = sr.request_id
             JOIN SKILL s ON sr.skill_id = s.skill_id
             JOIN "USER" u ON sr.requester_id = u.user_id
             WHERE sa.provider_id = $1
             ORDER BY sa.assignment_id DESC`,
            [userId]
        );
        res.json(result.rows);
    } catch (err) {
        console.error("Provider Assignments Error:", err.stack);
        res.status(500).json({ msg: 'Database error fetching provider assignments' });
    }
});

// API Endpoint: Update Assignment Status (Accept/Decline/Complete)
app.put('/api/assignments/:id/status', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body; // 'Accepted', 'Declined', 'Completed'

    try {
        let query = 'UPDATE SERVICE_ASSIGNMENT SET status = $1 ';
        let params = [status, id];

        if (status === 'Completed') {
            query += ', completion_date = CURRENT_TIMESTAMP ';
        }

        query += 'WHERE assignment_id = $2 RETURNING *';

        const assignmentRes = await pool.query(query, params);

        if (assignmentRes.rows.length === 0) {
            return res.status(404).json({ msg: 'Assignment not found' });
        }

        const assignment = assignmentRes.rows[0];
        let requestStatus = 'Assigned'; // Default for Accepted
        if (status === 'Declined') requestStatus = 'Cancelled';
        if (status === 'Completed') requestStatus = 'Completed';

        // Update the associated request status
        await pool.query(
            'UPDATE SERVICE_REQUEST SET status = $1 WHERE request_id = $2',
            [requestStatus, assignment.request_id]
        );

        res.json({ msg: `Assignment ${status}`, assignment });
    } catch (err) {
        console.error("Update Assignment Error:", err.stack);
        res.status(500).json({ msg: 'Database error: ' + err.message });
    }
});

// API Endpoint: Get user statistics
app.get('/api/users/:userId/stats', async (req, res) => {
    const { userId } = req.params;
    try {
        const skillsCount = await pool.query("SELECT COUNT(*) FROM USER_SKILL WHERE user_id = $1", [userId]);
        const requestsCount = await pool.query("SELECT COUNT(*) FROM SERVICE_REQUEST WHERE requester_id = $1", [userId]);
        res.json({
            skillsCount: parseInt(skillsCount.rows[0].count),
            requestsCount: parseInt(requestsCount.rows[0].count)
        });
    } catch (err) {
        console.error("Stats Error:", err.stack);
        res.status(500).json({ msg: 'Server Error fetching stats' });
    }
});

// API Endpoint: Get global platform statistics
app.get('/api/stats', async (req, res) => {
    try {
        const usersCount = await pool.query('SELECT COUNT(*) FROM "USER"');
        const skillsCount = await pool.query('SELECT COUNT(DISTINCT skill_name) FROM SKILL s JOIN USER_SKILL us ON s.skill_id = us.skill_id');
        const tasksCompletedCount = await pool.query("SELECT COUNT(*) FROM SERVICE_ASSIGNMENT WHERE status = 'Completed'");
        const avgRating = await pool.query('SELECT AVG(reputation_score) FROM "USER" WHERE reputation_score > 0');

        res.json({
            activeStudents: parseInt(usersCount.rows[0].count) || 0,
            skillsAvailable: parseInt(skillsCount.rows[0].count) || 0,
            tasksCompleted: parseInt(tasksCompletedCount.rows[0].count) || 0,
            campusRating: parseFloat(avgRating.rows[0].avg || 0.0).toFixed(1)
        });
    } catch (err) {
        console.error("Global Stats Error:", err.stack);
        res.status(500).json({ msg: 'Server Error fetching global stats' });
    }
});

// API Endpoint: Get all service requests
app.get('/api/requests', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM SERVICE_REQUEST ORDER BY request_id DESC');
        res.json(result.rows);
    } catch (err) {
        console.error(err.stack);
        res.status(500).json({ msg: 'Database error' });
    }
});

// API Endpoint: Create a service request
app.post('/api/requests', async (req, res) => {
    const { requesterId, skillId, description, preferredDate, providerId } = req.body;
    try {
        console.log("Creating request:", { requesterId, skillId, description, preferredDate, providerId });

        // 1. Check availability if provider is known
        if (providerId) {
            const availResult = await pool.query(
                "SELECT availability FROM USER_SKILL WHERE user_id = $1 AND skill_id = $2",
                [providerId, skillId]
            );
            if (availResult.rows.length > 0) {
                const availStr = availResult.rows[0].availability;
                const date = new Date(preferredDate);
                const dayName = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
                const avail = (availStr || '').toLowerCase();

                let isValid = true;
                if (avail && !avail.includes('everyday') && !avail.includes('anytime')) {
                    isValid = false;
                    if (avail.includes('weekend')) {
                        if (dayName === 'saturday' || dayName === 'sunday') isValid = true;
                    } else if (avail.includes('weekday')) {
                        if (!['saturday', 'sunday'].includes(dayName)) isValid = true;
                    } else {
                        const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
                        for (const day of days) {
                            if (avail.includes(day) && dayName === day) {
                                isValid = true;
                                break;
                            }
                        }
                    }
                }

                if (!isValid) {
                    return res.status(400).json({ msg: `Provider is not available on ${dayName}. Availability: ${availStr}` });
                }
            }
        }

        // 2. Start as 'Pending' regardless of whether we know the provider
        const requestStatus = 'Pending';

        const result = await pool.query(
            'INSERT INTO SERVICE_REQUEST (requester_id, skill_id, description, preferred_date, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [requesterId, skillId, description || 'I need help with this skill', preferredDate || new Date(), requestStatus]
        );
        const newRequest = result.rows[0];

        // 3. Automatically create assignment if providerId is known
        if (providerId) {
            await pool.query(
                'INSERT INTO SERVICE_ASSIGNMENT (request_id, provider_id) VALUES ($1, $2)',
                [newRequest.request_id, providerId]
            );
        }

        res.status(201).json({ msg: 'Request created successfully', request: newRequest });
    } catch (err) {
        console.error("Create Request Error:", err.stack);
        res.status(500).json({ msg: 'Database error creating request: ' + err.message });
    }
});

// API Endpoint: Delete a skill
app.delete('/api/skills/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query("DELETE FROM SKILL WHERE skill_id = $1", [id]);
        res.json({ message: "Skill successfully deleted!" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Example API Endpoint: Get a user's profile
app.get('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            `SELECT user_id, name, email, department, year, reputation_score 
             FROM "USER" WHERE user_id = $1`, [id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// --- ADMIN DASHBOARD ENDPOINTS ---
app.get('/api/admin/tables', async (req, res) => {
    try {
        const query = `SELECT tablename FROM pg_tables WHERE schemaname='public' ORDER BY tablename ASC`;
        const result = await pool.query(query);
        res.json(result.rows.map(r => r.tablename));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/admin/table/:name', async (req, res) => {
    const tableName = req.params.name;
    if (!/^[a-zA-Z0-9_]+$/.test(tableName)) {
        return res.status(400).json({ error: 'Invalid table name.' });
    }
    try {
        // Enclose table name in quotes in case it's a reserved keyword like "USER"
        const result = await pool.query(`SELECT * FROM "${tableName}" LIMIT 100`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/admin/sql', async (req, res) => {
    const { query } = req.body;
    if (!query) return res.status(400).json({ error: 'Query is required.' });
    
    try {
        const cmd = query.trim().toUpperCase();
        const isSelect = cmd.startsWith('SELECT') || cmd.startsWith('WITH');
        const result = await pool.query(query);
        
        if (isSelect || (result.command === 'SELECT')) {
            res.json({ type: 'select', data: result.rows });
        } else {
            res.json({ type: 'run', message: 'Query executed successfully.', changes: result.rowCount || 0 });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
