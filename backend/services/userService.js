const { pool } = require('../config/db');
const bcrypt = require('bcryptjs');

class UserService {
  static async create(userData) {
    const { name, email, password } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (name, email, password, created_at, updated_at)
       VALUES ($1, $2, $3, NOW(), NOW())
       RETURNING id, name, email, preferences, created_at, updated_at`,
      [name, email, hashedPassword]
    );

    return result.rows[0];
  }

  static async findByEmail(email) {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    return result.rows[0];
  }

  static async findById(id) {
    const result = await pool.query(
      'SELECT id, name, email, preferences, created_at, updated_at FROM users WHERE id = $1',
      [id]
    );

    return result.rows[0];
  }

  static async updatePreferences(userId, preferences) {
    const result = await pool.query(
      'UPDATE users SET preferences = $1, updated_at = NOW() WHERE id = $2 RETURNING id, name, email, preferences',
      [JSON.stringify(preferences), userId]
    );

    return result.rows[0];
  }

  static async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = UserService;
