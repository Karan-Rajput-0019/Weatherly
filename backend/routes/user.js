const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

// Favorites
router.post('/favorites', auth, userController.addFavorite);
router.get('/favorites', auth, userController.getFavorites);
router.delete('/favorites/:id', auth, userController.removeFavorite);

// Alerts
router.post('/alerts', auth, userController.createAlert);
router.get('/alerts', auth, userController.getAlerts);
router.put('/alerts/:id', auth, userController.updateAlert);
router.delete('/alerts/:id', auth, userController.deleteAlert);

module.exports = router;
