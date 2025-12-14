const db = require('../config/db');
const bcrypt = require('bcryptjs');

class UserService {
  static async create({ name, email, password }) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.pool.execute(
      `INSERT INTO users (name, email, password, preferences, created_at, updated_at)
       VALUES (?, ?, ?, ?, NOW(), NOW())`,
      [
        name,
        email.toLowerCase(),
        hashedPassword,
        JSON.stringify({
          unit: 'metric',
          theme: 'light',
          notifications: true,
          language: 'en'
        })
      ]
    );

    return { id: result.insertId, name, email };
  }

  static async findByEmail(email) {
    const [rows] = await db.pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email.toLowerCase()]
    );
    return rows[0];
  }

  static async comparePassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  }

  static async findById(id) {
    const [rows] = await db.pool.execute(
      `SELECT id, name, email, avatar, preferences, default_location,
              created_at, updated_at
       FROM users
       WHERE id = ?`,
      [id]
    );
    return rows[0];
  }

  static async update(id, updateData) {
    const entries = Object.entries(updateData);
    if (!entries.length) return this.findById(id);

    const fields = entries.map(([key]) => `${key} = ?`).join(', ');
    const values = entries.map(([, value]) => value);
    values.push(id);

    await db.pool.execute(
      `UPDATE users SET ${fields}, updated_at = NOW() WHERE id = ?`,
      values
    );

    return this.findById(id);
  }
}

module.exports = UserService;
