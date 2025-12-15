const mysql = require('mysql2/promise');
require('dotenv').config();

const isProd = process.env.NODE_ENV === 'production';

const pool = mysql.createPool({
  host: isProd ? process.env.MYSQLHOST : process.env.MYSQL_HOST,
  user: isProd ? process.env.MYSQLUSER : process.env.MYSQL_USER,
  password: isProd ? process.env.MYSQLPASSWORD : process.env.MYSQL_PASSWORD,
  database: isProd ? process.env.MYSQLDATABASE : process.env.MYSQL_DATABASE,
  port: isProd ? process.env.MYSQLPORT : process.env.MYSQL_PORT || 3306,
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

