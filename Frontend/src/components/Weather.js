import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Weather.css";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [searchCity, setSearchCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [savedCities, setSavedCities] = useState([]);
  const [currentCity, setCurrentCity] = useState("London");
  const [unit, setUnit] = useState("metric"); // metric for Celsius, imperial for Fahrenheit
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchWeather(currentCity);
    fetchSavedCities();
  }, []);

  const fetchSavedCities = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/auth/saved-cities", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const cities = await response.json();
        setSavedCities(cities);
      }
    } catch (error) {
      console.error("Error fetching saved cities:", error);
    }
  };

  const fetchWeather = async (city) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:5000/api/weather/city/${city}?units=${unit}`
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();
      setWeatherData(data.weather);
      setForecast(data.forecast);
      setCurrentCity(city);
      setSearchCity("");
    } catch (error) {
      setError(error.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchCity.trim()) {
      fetchWeather(searchCity);
    }
  };

  const handleSaveCity = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/auth/saved-cities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          city: currentCity,
          country: weatherData?.sys?.country || "",
        }),
      });

      if (response.ok) {
        fetchSavedCities();
      }
    } catch (error) {
      console.error("Error saving city:", error);
    }
  };

  const handleRemoveCity = async (city) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/auth/saved-cities/${city}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        fetchSavedCities();
      }
    } catch (error) {
      console.error("Error removing city:", error);
    }
  };

  const toggleUnit = () => {
    const newUnit = unit === "metric" ? "imperial" : "metric";
    setUnit(newUnit);
    fetchWeather(currentCity);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading && !weatherData) {
    return <div className="loading">Loading weather data...</div>;
  }

  return (
    <div className="weather-container">
      {/* Header */}
      <header className="weather-header">
        <div className="header-left">
          <h1>🌤️ Weatherly</h1>
        </div>
        <div className="header-right">
          <button className="unit-toggle" onClick={toggleUnit}>
            °{unit === "metric" ? "F" : "C"}
          </button>
          <button
            className="profile-btn"
            onClick={() => navigate("/profile")}
            title={user?.name}
          >
            👤 {user?.name}
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="weather-main">
        {/* Search Bar */}
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for a city..."
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-btn">
            🔍
          </button>
        </form>

        {error && <div className="error-message">{error}</div>}

        {weatherData && (
          <>
            {/* Current Weather Card */}
            <div className="current-weather-card">
              <div className="weather-header-section">
                <h2>{weatherData.name}, {weatherData.sys?.country}</h2>
                <p className="weather-date">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              <div className="weather-content">
                <div className="temperature-section">
                  <img
                    src={`https://openweathermap.org/img/wn/${weatherData.weather[0]?.icon}@4x.png`}
                    alt={weatherData.weather[0]?.main}
                    className="weather-icon"
                  />
                  <div className="temp-info">
                    <h3 className="temperature">
                      {Math.round(weatherData.main?.temp)}°
                    </h3>
                    <p className="weather-description">
                      {weatherData.weather[0]?.description}
                    </p>
                  </div>
                </div>

                <div className="weather-details">
                  <div className="detail-item">
                    <span className="detail-label">Feels Like</span>
                    <span className="detail-value">
                      {Math.round(weatherData.main?.feels_like)}°
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Humidity</span>
                    <span className="detail-value">
                      {weatherData.main?.humidity}%
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Wind Speed</span>
                    <span className="detail-value">
                      {weatherData.wind?.speed} {unit === "metric" ? "m/s" : "mph"}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Pressure</span>
                    <span className="detail-value">{weatherData.main?.pressure} mb</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Visibility</span>
                    <span className="detail-value">
                      {(weatherData.visibility / 1000).toFixed(1)} km
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">UV Index</span>
                    <span className="detail-value">
                      {weatherData.clouds?.all || "N/A"}%
                    </span>
                  </div>
                </div>
              </div>

              <button className="save-city-btn" onClick={handleSaveCity}>
                ⭐ Save This City
              </button>
            </div>

            {/* 5-Day Forecast */}
            <div className="forecast-section">
              <h3>5-Day Forecast</h3>
              <div className="forecast-grid">
                {forecast
                  .filter((_, index) => index % 8 === 0) // Get one forecast per day (every 8 intervals)
                  .slice(0, 5)
                  .map((item, index) => (
                    <div key={index} className="forecast-card">
                      <p className="forecast-date">
                        {new Date(item.dt * 1000).toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                      <img
                        src={`https://openweathermap.org/img/wn/${item.weather[0]?.icon}@2x.png`}
                        alt={item.weather[0]?.main}
                      />
                      <p className="forecast-temp">
                        {Math.round(item.main.temp)}°
                      </p>
                      <p className="forecast-condition">
                        {item.weather[0]?.main}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </>
        )}

        {/* Saved Cities */}
        {savedCities.length > 0 && (
          <div className="saved-cities-section">
            <h3>Your Saved Cities</h3>
            <div className="saved-cities-grid">
              {savedCities.map((city, index) => (
                <div key={index} className="saved-city-card">
                  <p className="city-name">
                    {city.city}, {city.country}
                  </p>
                  <div className="city-actions">
                    <button
                      className="city-view-btn"
                      onClick={() => fetchWeather(city.city)}
                    >
                      View
                    </button>
                    <button
                      className="city-remove-btn"
                      onClick={() => handleRemoveCity(city.city)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
