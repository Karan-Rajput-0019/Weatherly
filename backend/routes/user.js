const express = require('express');
const router = express.Router();
const usercontroller = require('../controllers/usercontroller');
const auth = require('../middleware/auth');

// Favorites
router.post('/favorites', auth, usercontroller.addFavorite);
router.get('/favorites', auth, usercontroller.getFavorites);
router.delete('/favorites/:id', auth, usercontroller.removeFavorite);

// Alerts
router.post('/alerts', auth, usercontroller.createAlert);
router.get('/alerts', auth, usercontroller.getAlerts);
router.put('/alerts/:id', auth, usercontroller.updateAlert);
router.delete('/alerts/:id', auth, usercontroller.deleteAlert);

module.exports = router;
