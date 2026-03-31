const pool = require('./db');
const fs = require('fs');
const path = require('path');

async function exportSeeds() {
  try {
    console.log('📤 Exporting current database state to seed.sql...');

    const tables = [
      { name: 'CATEGORY', pks: ['category_name'], columns: ['category_name', 'description'] },
      { name: 'SKILL', pks: ['skill_name', 'category_id'], columns: ['skill_name', 'category_id', 'description'] },
      { name: '"USER"', pks: ['email'], columns: ['name', 'email', 'password_hash', 'department', 'year', 'reputation_score', 'role'] },
      { name: 'USER_PHONE', pks: ['user_id', 'phone_number'], columns: ['user_id', 'phone_number'] },
      { name: 'USER_SKILL', pks: ['user_id', 'skill_id'], columns: ['user_id', 'skill_id', 'experience_level', 'hourly_rate', 'availability_status', 'availability'] },
      { name: 'SERVICE_REQUEST', pks: ['request_id'], columns: ['request_id', 'requester_id', 'skill_id', 'description', 'preferred_date', 'status'] },
      { name: 'SERVICE_ASSIGNMENT', pks: ['assignment_id'], columns: ['assignment_id', 'request_id', 'provider_id', 'assigned_date', 'completion_date', 'status'] },
      { name: 'FEEDBACK', pks: ['assignment_id'], columns: ['assignment_id', 'rating', 'comments', 'feedback_date'] }
    ];

    let sqlContent = '-- Campus Skill Exchange System - DML Seed Data (Exported)\n';
    sqlContent += '-- Generated on: ' + new Date().toISOString() + '\n\n';

    for (const table of tables) {
      console.log(`Processing table: ${table.name}...`);
      const result = await pool.query(`SELECT * FROM ${table.name}`);
      
      if (result.rows.length === 0) continue;

      sqlContent += `-- Data for ${table.name}\n`;
      const cols = table.columns.join(', ');
      sqlContent += `INSERT INTO ${table.name} (${cols}) VALUES\n`;

      const valueRows = result.rows.map(row => {
        const values = table.columns.map(col => {
          const val = row[col.replace(/^"|"$/g, '')];
          if (val === null) return 'NULL';
          if (typeof val === 'string') return `'${val.replace(/'/g, "''")}'`;
          if (val instanceof Date) return `'${val.toISOString()}'`;
          return val;
        });
        return `(${values.join(', ')})`;
      });

      sqlContent += valueRows.join(',\n') + '\n';
      
      if (table.pks && table.pks.length > 0) {
        sqlContent += `ON CONFLICT (${table.pks.join(', ')}) DO NOTHING;\n\n`;
      } else {
        sqlContent += ';\n\n';
      }
    }

    const seedPath = path.join(__dirname, '..', 'seed.sql');
    fs.writeFileSync(seedPath, sqlContent);
    console.log(`✅ Database exported successfully to ${seedPath}`);
  } catch (err) {
    console.error('❌ Error exporting seeds:', err.message);
  } finally {
    await pool.end();
  }
}

exportSeeds();
