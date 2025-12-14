import React, { useEffect, useState } from 'react';
import { useWeather } from '../hooks/useWeather';
import weatherService from '../services/weatherService';
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';

const Dashboard = () => {
  const { currentWeather, forecast, dispatch } = useWeather();
  const [loading, setLoading] = useState(false);

  const loadByCity = async city => {
    setLoading(true);
    try {
      const [cur, fore] = await Promise.all([
        weatherService.currentByCity(city),
        weatherService.forecastByCity(city)
      ]);
      dispatch({ type: 'SET_CURRENT', payload: cur.data.data });
      dispatch({ type: 'SET_FORECAST', payload: fore.data.data });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadByCity('London');
  }, []);

  const selectCity = c => loadByCity(c.name);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-5xl mx-auto px-4 space-y-6">
        <SearchBar onSelect={selectCity} />
        {loading && <p className="text-sm">Loading weather...</p>}
        {!loading && currentWeather && <WeatherCard data={currentWeather} />}
        {/* You can later render forecast data here */}
      </div>
    </div>
  );
};

export default Dashboard;
