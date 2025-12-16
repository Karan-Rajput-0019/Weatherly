const { pool } = require('../config/db');

class FavoriteService {
  static async create(data) {
    const { user_id, city, country, latitude, longitude, nickname } = data;

    const result = await pool.query(
      `INSERT INTO favorites
       (user_id, city, country, latitude, longitude, nickname, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
       RETURNING *`,
      [user_id, city, country, latitude, longitude, nickname || city]
    );

    return result.rows[0];
  }

  static async findByUserId(userId) {
    const result = await pool.query(
      'SELECT * FROM favorites WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );

    return result.rows;
  }

  static async delete(id, userId) {
    const result = await pool.query(
      'DELETE FROM favorites WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, userId]
    );

    return result.rows[0];
  }

  static async findById(id, userId) {
    const result = await pool.query(
      'SELECT * FROM favorites WHERE id = $1 AND user_id = $2',
      [id, userId]
    );

    return result.rows[0];
  }
}

module.exports = FavoriteService;
