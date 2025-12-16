const { pool } = require('../config/db');

class AlertService {
  static async create(alertData) {
    const { user_id, location, alert_type, condition, threshold } = alertData;

    const result = await pool.query(
      `INSERT INTO alerts
       (user_id, location, alert_type, condition, threshold, is_active, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, true, NOW(), NOW())
       RETURNING *`,
      [user_id, JSON.stringify(location), alert_type, condition, threshold]
    );

    return result.rows[0];
  }

  static async findByUserId(userId) {
    const result = await pool.query(
      'SELECT * FROM alerts WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );

    return result.rows;
  }

  static async findActiveByUserId(userId) {
    const result = await pool.query(
      'SELECT * FROM alerts WHERE user_id = $1 AND is_active = true ORDER BY created_at DESC',
      [userId]
    );

    return result.rows;
  }

  static async update(id, userId, updates) {
    const { alert_type, condition, threshold, is_active } = updates;

    const result = await pool.query(
      `UPDATE alerts
       SET alert_type = $1, condition = $2, threshold = $3, is_active = $4, updated_at = NOW()
       WHERE id = $5 AND user_id = $6
       RETURNING *`,
      [alert_type, condition, threshold, is_active, id, userId]
    );

    return result.rows[0];
  }

  static async delete(id, userId) {
    const result = await pool.query(
      'DELETE FROM alerts WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, userId]
    );

    return result.rows[0];
  }

  static async toggleActive(id, userId) {
    const result = await pool.query(
      `UPDATE alerts
       SET is_active = NOT is_active, updated_at = NOW()
       WHERE id = $1 AND user_id = $2
       RETURNING *`,
      [id, userId]
    );

    return result.rows[0];
  }
}

module.exports = AlertService;


