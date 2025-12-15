const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');
const auth = require('../middleware/auth');

router.get('/current', weatherController.getCurrentWeather);
router.get('/forecast', weatherController.getForecast);
router.get('/search', weatherController.searchCities);
router.get('/fitness', auth, weatherController.getFitnessForecast);

// NEW: reverse geocoding endpoint used by weatherService.reverseGeocode
router.get('/reverse-geocode', weatherController.reverseGeocode);

module.exports = router;



