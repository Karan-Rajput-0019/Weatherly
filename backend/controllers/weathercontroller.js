const axios = require('axios');

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Helper: build fitness score from a forecast item
const buildFitnessScore = data => {
  const temp = data.main.temp;
  const humidity = data.main.humidity;
  const wind = data.wind.speed;

  let score = 100;

  // Temperature impact
  if (temp < 0 || temp > 32) score -= 35;
  else if (temp < 5 || temp > 28) score -= 20;
  else if (temp < 10 || temp > 24) score -= 10;

  // Humidity impact
  if (humidity > 80) score -= 20;
  else if (humidity > 65) score -= 10;

  // Wind impact
  if (wind > 10) score -= 15;
  else if (wind > 6) score -= 8;

  if (score < 0) score = 0;
  if (score > 100) score = 100;

  const label = score >= 75 ? 'Great' : score >= 50 ? 'Okay' : 'Poor';

  return { score, label };
};

exports.getCurrentWeather = async (req, res) => {
  try {
    const { city, lat, lon } = req.query;

    if (!city && (!lat || !lon)) {
      return res.status(400).json({
        success: false,
        message: 'Send either city or lat & lon'
      });
    }

    let url = `${BASE_URL}/weather?appid=${OPENWEATHER_API_KEY}&units=metric`;
    if (city) url += `&q=${city}`;
    else url += `&lat=${lat}&lon=${lon}`;

    const { data } = await axios.get(url);

    res.json({
      success: true,
      data: {
        city: data.name,
        country: data.sys.country,
        temperature: data.main.temp,
        feelsLike: data.main.feels_like,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        windSpeed: data.wind.speed,
        cloudiness: data.clouds.all,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
        lat: data.coord.lat,
        lon: data.coord.lon
      }
    });
  } catch (err) {
    if (err.response?.status === 404) {
      return res.status(404).json({
        success: false,
        message: 'City not found'
      });
    }
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getForecast = async (req, res) => {
  try {
    const { city, lat, lon } = req.query;

    if (!city && (!lat || !lon)) {
      return res.status(400).json({
        success: false,
        message: 'Send either city or lat & lon'
      });
    }

    let url = `${BASE_URL}/forecast?appid=${OPENWEATHER_API_KEY}&units=metric`;
    if (city) url += `&q=${city}`;
    else url += `&lat=${lat}&lon=${lon}`;

    const { data } = await axios.get(url);

    // Group 3‑hour entries by date
    const byDate = {};
    data.list.forEach(item => {
      const date = new Date(item.dt * 1000).toISOString().split('T')[0];
      if (!byDate[date]) byDate[date] = [];
      byDate[date].push(item);
    });

    // Build compact 5‑day summary
    const days = Object.keys(byDate)
      .slice(0, 5)
      .map(date => {
        const items = byDate[date];
        const temps = items.map(i => i.main.temp);
        const temp_min = Math.min(...temps);
        const temp_max = Math.max(...temps);

        const mid = items[Math.floor(items.length / 2)];

        return {
          date,
          temp_min,
          temp_max,
          description: mid.weather[0].description,
          icon: mid.weather[0].icon
        };
      });

    res.json({
      success: true,
      data: {
        city: data.city.name,
        country: data.city.country,
        days
      }
    });
  } catch (err) {
    if (err.response?.status === 404) {
      return res.status(404).json({
        success: false,
        message: 'City not found'
      });
    }
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getFitnessForecast = async (req, res) => {
  try {
    const { city } = req.query;

    if (!city) {
      return res.status(400).json({
        success: false,
        message: 'city is required for fitness forecast'
      });
    }

    const url = `${BASE_URL}/forecast?appid=${OPENWEATHER_API_KEY}&units=metric&q=${city}`;
    const { data } = await axios.get(url);

    // Intraday points (first ~48 hours)
    const points = data.list.slice(0, 16).map(item => {
      const time = item.dt * 1000;
      const fitness = buildFitnessScore(item);
      return {
        time,
        temperature: item.main.temp,
        humidity: item.main.humidity,
        windSpeed: item.wind.speed,
        score: fitness.score,
        label: fitness.label
      };
    });

    // Weekly summary from all forecast entries, next 5 days
    const dailyMap = {};
    data.list.forEach(item => {
      const date = new Date(item.dt * 1000);
      const dayKey = date.toISOString().split('T')[0]; // YYYY-MM-DD
      const { score } = buildFitnessScore(item);
      if (!dailyMap[dayKey]) {
        dailyMap[dayKey] = { total: 0, count: 0, dateObj: date };
      }
      dailyMap[dayKey].total += score;
      dailyMap[dayKey].count += 1;
    });

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const week = Object.entries(dailyMap)
      .sort((a, b) => a[1].dateObj - b[1].dateObj) // chronological
      .slice(0, 5) // next 5 days
      .map(([dateStr, { total, count, dateObj }]) => {
        const avgScore = Math.round(total / count);
        const day = dayNames[dateObj.getDay()];
        return { day, avgScore };
      });

    res.json({
      success: true,
      data: {
        city: data.city.name,
        country: data.city.country,
        points,
        week
      }
    });
  } catch (err) {
    if (err.response?.status === 404) {
      return res.status(404).json({
        success: false,
        message: 'City not found'
      });
    }
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.searchCities = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || q.length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Query must be at least 2 chars'
      });
    }

    const url = `${BASE_URL}/find?q=${q}&appid=${OPENWEATHER_API_KEY}&units=metric`;
    const { data } = await axios.get(url);

    const cities = data.list.map(c => ({
      name: c.name,
      country: c.sys.country,
      lat: c.coord.lat,
      lon: c.coord.lon,
      temperature: c.main.temp
    }));

    res.json({ success: true, data: cities.slice(0, 10) });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
