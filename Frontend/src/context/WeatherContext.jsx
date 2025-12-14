import React, { createContext, useReducer } from 'react';

export const WeatherContext = createContext();

const initialState = {
  currentWeather: null,
  forecast: null,
  unit: localStorage.getItem('unit') || 'metric',
  theme: localStorage.getItem('theme') || 'light'
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_CURRENT':
      return { ...state, currentWeather: action.payload };
    case 'SET_FORECAST':
      return { ...state, forecast: action.payload };
    case 'SET_UNIT':
      localStorage.setItem('unit', action.payload);
      return { ...state, unit: action.payload };
    case 'TOGGLE_THEME': {
      const theme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', theme);
      return { ...state, theme };
    }
    default:
      return state;
  }
};

export const WeatherProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <WeatherContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WeatherContext.Provider>
  );
};
