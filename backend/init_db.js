const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function initDb() {
  try {
    console.log('🚀 Starting Database Initialization...');

    // Paths to SQL files (relative to backend folder)
    const schemaPath = path.join(__dirname, '..', 'schema.sql');
    const seedPath = path.join(__dirname, '..', 'seed.sql');

    console.log('📖 Reading schema.sql...');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    
    console.log('📖 Reading seed.sql...');
    const seedSql = fs.readFileSync(seedPath, 'utf8');

    console.log('🚿 Clearing and creating tables (Schema)...');
    await pool.query(schemaSql);
    console.log('✅ Schema applied successfully.');

    console.log('🌱 Planting seed data...');
    await pool.query(seedSql);
    console.log('✅ Seed data imported successfully.');

    console.log('\n✨ Database is now fully ready with all mock data!');
  } catch (err) {
    console.error('\n❌ Error initializing database:');
    console.error(err.message);
    if (err.position) {
        console.error(`Error near character ${err.position}`);
    }
  } finally {
    await pool.end();
  }
}

initDb();
