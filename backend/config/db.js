const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'weatherly',
  port: process.env.MYSQL_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const connectDB = async () => {
  try {
    const connection = await pool.getConnection();
    console.log(
      `✅ MySQL Connected: ${connection.config.host}:${connection.config.port}`
    );
    connection.release();
    return pool;
  } catch (error) {
    console.error('❌ MySQL connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
module.exports.pool = pool;
