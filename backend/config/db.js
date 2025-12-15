const { Pool } = require('pg');
require('dotenv').config();

const isProd = process.env.NODE_ENV === 'production';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isProd ? { rejectUnauthorized: false } : false
});

const connectDB = async () => {
  try {
    const connection = await pool.connect();
    console.log(
      `🌤️ PostgreSQL connected: ${connection.host || 'Railway PostgreSQL'}`
    );
    connection.release();
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    process.exit(1);
  }
};

module.exports = { pool, connectDB };
