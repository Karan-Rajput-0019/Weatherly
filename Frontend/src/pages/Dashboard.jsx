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
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';


// helper: best time today from fitness points
const getBestTodayWindow = points => {
  if (!points || points.length === 0) return null;

  const todayStr = new Date().toISOString().split('T')[0];

  const todayPoints = points.filter(p => {
    const d = new Date(p.time);
    return d.toISOString().split('T')[0] === todayStr;
  });

  if (todayPoints.length === 0) return null;

  const best = todayPoints.reduce(
    (acc, p) => (p.score > acc.score ? p : acc),
    todayPoints[0]
  );

  const time = new Date(best.time).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });

  return { time, score: best.score, label: best.label };
};


// helper: basic weather alert from forecast + fitness
const buildAlert = (forecast, fitnessData) => {
  if (!forecast && !fitnessData) return null;

  // from 5‑day forecast cards
  if (forecast?.days?.some(d => d.temp_max >= 32)) {
    return {
      type: 'heat',
      message:
        'High temperatures expected. Consider avoiding midday outdoor activities.'
    };
  }

  if (forecast?.days?.some(d => d.temp_min <= 0)) {
    return {
      type: 'cold',
      message:
        'Very low temperatures expected. Dress warmly and limit long exposure.'
    };
  }

  // from fitness intraday points (wind)
  if (fitnessData?.points?.some(p => p.windSpeed >= 10)) {
    return {
      type: 'wind',
      message:
        'Strong winds expected. Outdoor activities may feel more difficult.'
    };
  }

  return null;
};


const Dashboard = () => {
  const { currentWeather, forecast, dispatch } = useWeather();
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

  // UPDATED: use reverse geocoding, then reuse loadByCity
  const loadByCoords = async (lat, lon) => {
    console.log('loadByCoords called with:', lat, lon);
    setLoading(true);
    try {
      // 1) Get city name from reverse geocoding endpoint
      const rev = await weatherService.reverseGeocode(lat, lon);
      const { city } = rev.data;
      console.log('Reverse geocoded city:', city);

      // 2) Reuse existing city-based loader
      await loadByCity(city);
    } finally {
      setLoading(false);
    }
  };

  const useMyLocation = () => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      pos => {
        const { latitude, longitude } = pos.coords;
        console.log('Geo coords from browser:', latitude, longitude);
        loadByCoords(latitude, longitude);
      },
      err => {
        console.error('Geolocation error', err);
      }
    );
  };

  useEffect(() => {
    loadByCity('London');
  }, []);

  const selectCity = c => loadByCity(c.name);

  const bestToday = fitnessData
    ? getBestTodayWindow(fitnessData.points)
    : null;

  const alert = buildAlert(forecast, fitnessData);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-5xl mx-auto px-4 space-y-6">
        <SearchBar onSelect={selectCity} onUseLocation={useMyLocation} />

        {alert && (
          <div
            className={`rounded-lg px-4 py-2 text-sm ${
              alert.type === 'heat'
                ? 'bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-100'
                : alert.type === 'cold'
                ? 'bg-sky-50 text-sky-800 dark:bg-sky-900/30 dark:text-sky-100'
                : 'bg-amber-50 text-amber-800 dark:bg-amber-900/30 dark:text-amber-100'
            }`}
          >
            <span className="font-semibold mr-1">Weather alert:</span>
            {alert.message}
          </div>
        )}

        {loading && <p className="text-sm">Loading weather...</p>}

        {!loading && currentWeather && <WeatherCard data={currentWeather} />}

        {/* 5‑day forecast cards */}
        {!loading && forecast && forecast.days && (
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {forecast.days.map((day, idx) => {
              const isToday =
                new Date(day.date).toDateString() ===
                new Date().toDateString();
              return (
                <div
                  key={day.date}
                  className={`rounded-xl p-4 text-center border shadow-sm
                    bg-white/80 dark:bg-gray-800/80 backdrop-blur
                    ${
                      isToday
                        ? 'border-blue-500 ring-1 ring-blue-500/40'
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                >
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    {isToday
                      ? 'Today'
                      : new Date(day.date).toLocaleDateString(undefined, {
                          weekday: 'short'
                        })}
                  </p>
                  <p className="mt-1 text-2xl font-semibold">
                    {Math.round(day.temp_max)}°
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Low {Math.round(day.temp_min)}°
                  </p>
                  <p className="mt-1 text-xs capitalize text-gray-600 dark:text-gray-300">
                    {day.description}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {/* Intraday fitness chart */}
        {fitnessData && (
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

            {bestToday && (
              <div className="mt-1 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 px-3 py-2 text-sm">
                <span className="font-medium">Best time today:</span>{' '}
                {bestToday.time} · score {bestToday.score} (
                {bestToday.label})
              </div>
            )}

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Higher scores mean better outdoor conditions for your selected
              activities.
            </p>
          </div>
        )}

        {/* Weekly fitness summary */}
        {fitnessData && fitnessData.week && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow space-y-4">
            <h2 className="text-lg font-semibold">
              Weekly fitness summary – {fitnessData.city}
            </h2>

            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={fitnessData.week}>
                <XAxis dataKey="day" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="avgScore" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Shows the average fitness score for each day of the week.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;



