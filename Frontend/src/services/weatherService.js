import API from './api';

const weatherService = {
  currentByCity: city =>
    API.get('/weather/current', { params: { city } }),

  forecastByCity: city =>
    API.get('/weather/forecast', { params: { city } }),

  searchCities: q =>
    API.get('/weather/search', { params: { q } }),

  fitnessByCity: city =>
    API.get('/weather/fitness', { params: { city } }),

  currentByCoords: (lat, lon) =>
    API.get('/weather/current', { params: { lat, lon } }),

  forecastByCoords: (lat, lon) =>
    API.get('/weather/forecast', { params: { lat, lon } }),

  reverseGeocode: (lat, lon) =>
    API.get('/weather/reverse-geocode', { params: { lat, lon } })
};

export default weatherService;
