import React, { useEffect, useState } from 'react';
import { useWeather } from '../hooks/useWeather';
import { useAuth } from '../hooks/useAuth';
import weatherService from '../services/weatherService';
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const Dashboard = () => {
  const { currentWeather, dispatch } = useWeather();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [fitnessData, setFitnessData] = useState(null);

  const loadByCity = async city => {
    setLoading(true);
    try {
      const [cur, fore, fit] = await Promise.all([
        weatherService.currentByCity(city),
        weatherService.forecastByCity(city),
        weatherService.fitnessByCity(city)
      ]);

      dispatch({ type: 'SET_CURRENT', payload: cur.data.data });
      dispatch({ type: 'SET_FORECAST', payload: fore.data.data });
      setFitnessData(fit.data.data);
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

        {user?.profile_mode === 'fitness' && fitnessData && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow space-y-4">
            <h2 className="text-lg font-semibold">
              Fitness conditions – {fitnessData.city}
            </h2>

            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={fitnessData.points}>
                <XAxis
                  dataKey="time"
                  tickFormatter={t =>
                    new Date(t).toLocaleTimeString([], { hour: '2-digit' })
                  }
                />
                <YAxis domain={[0, 100]} />
                <Tooltip
                  labelFormatter={t => new Date(t).toLocaleString()}
                  formatter={(val, name) =>
                    name === 'score' ? [`${val}`, 'Score'] : [val, name]
                  }
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Higher scores mean better outdoor conditions for your selected
              activities.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
