const FavoriteService = require('../services/favoriteService');
const AlertService = require('../services/alertService');

exports.addFavorite = async (req, res) => {
  try {
    const { city, country, latitude, longitude, nickname } = req.body;

    if (!city || !country || latitude == null || longitude == null) {
      return res.status(400).json({
        success: false,
        message: 'city, country, latitude, longitude are required'
      });
    }

    const duplicate = await FavoriteService.findDuplicate(
      req.userId,
      city,
      country
    );
    if (duplicate) {
      return res.status(400).json({
        success: false,
        message: 'Location already in favorites'
      });
    }

    const favorite = await FavoriteService.create({
      user_id: req.userId,
      city,
      country,
      latitude,
      longitude,
      nickname
    });

    res.status(201).json({
      success: true,
      message: 'Favorite added',
      data: favorite
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getFavorites = async (req, res) => {
  try {
    const favorites = await FavoriteService.findByUserId(req.userId);
    res.json({ success: true, data: favorites });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.removeFavorite = async (req, res) => {
  try {
    const ok = await FavoriteService.delete(req.params.id);
    if (!ok) {
      return res.status(404).json({
        success: false,
        message: 'Favorite not found'
      });
    }
    res.json({ success: true, message: 'Favorite removed' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.createAlert = async (req, res) => {
  try {
    const { location, alert_type, condition, threshold } = req.body;

    const alert = await AlertService.create({
      user_id: req.userId,
      location,
      alert_type,
      condition,
      threshold
    });

    res.status(201).json({
      success: true,
      message: 'Alert created',
      data: alert
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getAlerts = async (req, res) => {
  try {
    const alerts = await AlertService.findByUserId(req.userId);
    res.json({ success: true, data: alerts });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateAlert = async (req, res) => {
  try {
    const alert = await AlertService.update(req.params.id, req.body);
    res.json({ success: true, data: alert });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteAlert = async (req, res) => {
  try {
    const ok = await AlertService.delete(req.params.id);
    if (!ok) {
      return res.status(404).json({
        success: false,
        message: 'Alert not found'
      });
    }
    res.json({ success: true, message: 'Alert deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
