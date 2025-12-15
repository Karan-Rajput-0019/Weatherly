// Database Initialization Script
// Run this file once to create all necessary database tables
// Usage: node backend/initDb.js

const fs = require('fs');
const path = require('path');
const { pool } = require('./config/db');

async function initializeDatabase() {
  try {
    console.log('🔧 Starting database initialization...');
    
    // Read the schema file
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    // Execute the schema
    await pool.query(schema);
    
    console.log('✅ Database tables created successfully!');
    console.log('📊 Tables created: users, favorites, alerts');
    console.log('✨ Database initialization complete!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error initializing database:', error.message);
    process.exit(1);
  }
}

initializeDatabase();
