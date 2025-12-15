const express = require('express');
const router = express.Router();
const weathercontroller = require('../controllers/weathercontroller');
const auth = require('../middleware/auth');

router.get('/current', weathercontroller.getCurrentWeather);
router.get('/forecast', weathercontroller.getForecast);
router.get('/search', weathercontroller.searchCities);
router.get('/fitness', auth, weathercontroller.getFitnessForecast);

// NEW: reverse geocoding endpoint used by weatherService.reverseGeocode
router.get('/reverse-geocode', weathercontroller.reverseGeocode);

module.exports = router;



