import API from './api';

const weatherService = {
  currentByCity: city => API.get('/weather/current', { params: { city } }),
  forecastByCity: city => API.get('/weather/forecast', { params: { city } }),
  searchCities: q => API.get('/weather/search', { params: { q } })
};

export default weatherService;
