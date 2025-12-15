const { pool } = require('../config/db');
class AlertService {
  static async create(data) {
    const { user_id, location, alert_type, condition, threshold } = data;

    const [result] = await pool.execute(
      `INSERT INTO alerts
       (user_id, location, alert_type, \`condition\`, threshold, is_active, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, 1, NOW(), NOW())`,
      [user_id, JSON.stringify(location), alert_type, condition, threshold]
    );

    return { id: result.insertId, ...data, is_active: 1 };
  }

  static async findByUserId(userId) {
    const [rows] = await pool.execute(
      'SELECT * FROM alerts WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );
    return rows.map(row => ({
      ...row,
      location: row.location ? JSON.parse(row.location) : null
    }));
  }

  static async update(id, updateData) {
    const entries = Object.entries(updateData);
    if (!entries.length) return this.findById(id);

    const fields = entries.map(([key]) => `${key} = ?`).join(', ');
    const values = entries.map(([, value]) => value);
    values.push(id);

    await pool.execute(
      `UPDATE alerts SET ${fields}, updated_at = NOW() WHERE id = ?`,
      values
    );

    return this.findById(id);
  }

  static async delete(id) {
    const [result] = await pool.execute(
      'DELETE FROM alerts WHERE id = ?',
      [id]
    );
    return result.affectedRows > 0;
  }

  static async findById(id) {
    const [rows] = await pool.execute(
      'SELECT * FROM alerts WHERE id = ?',
      [id]
    );
    const row = rows[0];
    if (!row) return null;
    return {
      ...row,
      location: row.location ? JSON.parse(row.location) : null
    };
  }
}

module.exports = AlertService;
