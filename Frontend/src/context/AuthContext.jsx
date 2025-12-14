import React, { createContext, useReducer } from 'react';

export const AuthContext = createContext();

const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token')
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
    case 'SIGNUP':
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true
      };
    case 'LOGOUT':
      localStorage.removeItem('token');
      return { ...state, user: null, token: null, isAuthenticated: false };
    case 'UPDATE_USER':
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
