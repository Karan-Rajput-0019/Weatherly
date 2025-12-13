const express = require("express");
const axios = require("axios");
const auth = require("../middleware/auth");

const router = express.Router();

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const OPENWEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5";

// Get weather by city name
router.get("/city/:cityName", async (req, res) => {
  try {
    const { cityName } = req.params;
    const { units = "metric" } = req.query;

    const weatherResponse = await axios.get(
      `${OPENWEATHER_BASE_URL}/weather`,
      {
        params: {
          q: cityName,
          appid: OPENWEATHER_API_KEY,
          units: units,
        },
      }
    );

    const forecastResponse = await axios.get(
      `${OPENWEATHER_BASE_URL}/forecast`,
      {
        params: {
          q: cityName,
          appid: OPENWEATHER_API_KEY,
          units: units,
        },
      }
    );

    res.json({
      weather: weatherResponse.data,
      forecast: forecastResponse.data.list.slice(0, 40), // 5 days * 8 (3-hour intervals)
    });
  } catch (error) {
    if (error.response?.status === 404) {
      res.status(404).json({ message: "City not found" });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

// Get weather by coordinates
router.get("/coordinates", async (req, res) => {
  try {
    const { lat, lon, units = "metric" } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({ message: "Latitude and longitude are required" });
    }

    const weatherResponse = await axios.get(
      `${OPENWEATHER_BASE_URL}/weather`,
      {
        params: {
          lat,
          lon,
          appid: OPENWEATHER_API_KEY,
          units: units,
        },
      }
    );

    const forecastResponse = await axios.get(
      `${OPENWEATHER_BASE_URL}/forecast`,
      {
        params: {
          lat,
          lon,
          appid: OPENWEATHER_API_KEY,
          units: units,
        },
      }
    );

    res.json({
      weather: weatherResponse.data,
      forecast: forecastResponse.data.list.slice(0, 40),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get air quality data
router.get("/air-quality", async (req, res) => {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({ message: "Latitude and longitude are required" });
    }

    const airQualityResponse = await axios.get(
      `${OPENWEATHER_BASE_URL}/air_pollution`,
      {
        params: {
          lat,
          lon,
          appid: OPENWEATHER_API_KEY,
        },
      }
    );

    res.json(airQualityResponse.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
