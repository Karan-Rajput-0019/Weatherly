import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [name, setName] = useState("");
  const [temperatureUnit, setTemperatureUnit] = useState("C");
  const [theme, setTheme] = useState("dark");
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        setName(userData.name);
        setTemperatureUnit(userData.preferences?.temperatureUnit || "C");
        setTheme(userData.preferences?.theme || "dark");
      } else {
        setError("Failed to load profile");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          preferences: {
            temperatureUnit,
            theme,
          },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setSuccess("Profile updated successfully!");
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError("Failed to update profile");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) {
    return <div className="profile-loading">Loading profile...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-background"></div>
      <div className="profile-wrapper">
        <header className="profile-header">
          <h1>👤 User Profile</h1>
          <button className="back-btn" onClick={() => navigate("/")}>
            ← Back to Weather
          </button>
        </header>

        <div className="profile-content">
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          {user && (
            <>
              {/* User Info Card */}
              <div className="profile-card">
                <h2>Account Information</h2>

                <div className="info-grid">
                  <div className="info-item">
                    <label>Name</label>
                    <p>{user.name}</p>
                  </div>
                  <div className="info-item">
                    <label>Email</label>
                    <p>{user.email}</p>
                  </div>
                  <div className="info-item">
                    <label>Member Since</label>
                    <p>{new Date(user.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              {/* Edit Profile Card */}
              <div className="profile-card">
                <h2>Edit Profile</h2>

                <form onSubmit={handleUpdateProfile} className="profile-form">
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="temperatureUnit">Temperature Unit</label>
                    <select
                      id="temperatureUnit"
                      value={temperatureUnit}
                      onChange={(e) => setTemperatureUnit(e.target.value)}
                      className="form-input"
                    >
                      <option value="C">Celsius (°C)</option>
                      <option value="F">Fahrenheit (°F)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="theme">Theme</label>
                    <select
                      id="theme"
                      value={theme}
                      onChange={(e) => setTheme(e.target.value)}
                      className="form-input"
                    >
                      <option value="dark">Dark Mode</option>
                      <option value="light">Light Mode</option>
                    </select>
                  </div>

                  <button type="submit" className="save-btn">
                    Save Changes
                  </button>
                </form>
              </div>

              {/* Saved Cities Card */}
              {user.savedCities && user.savedCities.length > 0 && (
                <div className="profile-card">
                  <h2>Saved Cities ({user.savedCities.length})</h2>
                  <div className="cities-list">
                    {user.savedCities.map((city, index) => (
                      <div key={index} className="city-item">
                        <span className="city-text">
                          {city.city}, {city.country}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Danger Zone */}
              <div className="profile-card danger-zone">
                <h2>Danger Zone</h2>
                <p className="danger-text">
                  Once you logout, you'll need to login again to access your account.
                </p>
                <button className="logout-btn" onClick={handleLogout}>
                  🚪 Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
