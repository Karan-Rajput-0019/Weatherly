import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useWeather } from '../hooks/useWeather';

const Navbar = () => {
  const { user, isAuthenticated, dispatch } = useAuth();
  const { theme, dispatch: weatherDispatch } = useWeather();
  const navigate = useNavigate();

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  const toggleTheme = () => {
    weatherDispatch({ type: 'TOGGLE_THEME' });
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center gap-2">
          <span className="text-2xl">🌤️</span>
          <span className="font-semibold text-lg text-primary">Weatherly</span>
        </Link>

        <div className="flex items-center gap-4">
          {isAuthenticated && (
            <>
              <Link
                to="/dashboard"
                className="text-gray-700 dark:text-gray-200 hover:text-primary"
              >
                Dashboard
              </Link>
              <Link
                to="/profile"
                className="text-gray-700 dark:text-gray-200 hover:text-primary"
              >
                Profile
              </Link>
            </>
          )}

          <button
            onClick={toggleTheme}
            className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-700"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          {isAuthenticated ? (
            <>
              <span className="hidden sm:inline text-sm text-gray-600 dark:text-gray-300">
                {user?.name}
              </span>
              <button
                onClick={logout}
                className="px-3 py-1 bg-red-500 text-white rounded-md text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-700 dark:text-gray-200 hover:text-primary"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-3 py-1 bg-primary text-white rounded-md text-sm"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
