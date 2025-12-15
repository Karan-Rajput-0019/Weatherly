const { pool } = require('../config/db');
class FavoriteService {
  static async create(data) {
    const { user_id, city, country, latitude, longitude, nickname } = data;

    const [result] = await pool.execute(
      `INSERT INTO favorites
       (user_id, city, country, latitude, longitude, nickname, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [user_id, city, country, latitude, longitude, nickname || city]
    );

    return { id: result.insertId, ...data };
  }

  static async findByUserId(userId) {
    const [rows] = await pool.execute(
      'SELECT * FROM favorites WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );
    return rows;
  }

  static async delete(id) {
    const [result] = await pool.execute(
      'DELETE FROM favorites WHERE id = ?',
      [id]
    );
    return result.affectedRows > 0;
  }

  static async findDuplicate(userId, city, country) {
    const [rows] = await pool.execute(
      'SELECT id FROM favorites WHERE user_id = ? AND city = ? AND country = ?',
      [userId, city, country]
    );
    return rows[0];
  }
}

module.exports = FavoriteService;
