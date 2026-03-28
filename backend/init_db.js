const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();

const config = {
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    password: process.env.DB_PASSWORD || 'password',
    port: process.env.DB_PORT || 5432,
};

async function run() {
    console.log('Initializing database...');

    // First, connect to default 'postgres' database to create the new database
    const initialPool = new Pool({ ...config, database: 'postgres' });

    try {
        console.log('Checking if target database exists...');
        await initialPool.query(`CREATE DATABASE ${process.env.DB_NAME || 'campus_skill_exchange'}`);
        console.log('Created database successfully.');
    } catch (err) {
        if (err.code === '42P04') {
            console.log('Database already exists. Proceeding to create tables.');
        } else {
            console.error('Error creating database. Please ensure PostgreSQL is running and credentials in .env are correct.');
            console.error(err.message);
            process.exit(1);
        }
    } finally {
        await initialPool.end();
    }

    // Connect to the specific database
    const targetPool = new Pool({ ...config, database: process.env.DB_NAME || 'campus_skill_exchange' });

    try {
        const schemaPath = path.join(__dirname, '..', 'schema.sql');
        const seedPath = path.join(__dirname, '..', 'seed.sql');

        console.log('Executing schema.sql...');
        const schemaSql = fs.readFileSync(schemaPath, 'utf8');
        await targetPool.query(schemaSql);

        console.log('Executing seed.sql...');
        const seedSql = fs.readFileSync(seedPath, 'utf8');
        await targetPool.query(seedSql);

        console.log('Successfully setup database and inserted mock data!');
    } catch (err) {
        console.error('Error executing SQL scripts:');
        console.error(err.message);
    } finally {
        await targetPool.end();
    }
}

run();
