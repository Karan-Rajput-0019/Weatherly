import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const { dispatch } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const submit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await authService.login(form.email, form.password);
      dispatch({ type: 'LOGIN', payload: res.data });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow p-8">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-100 p-2 rounded">
            {error}
          </div>
        )}
        <form className="space-y-4" onSubmit={submit}>
          <div>
            <label className="text-sm">Email</label>
            <input
              type="email"
              className="w-full mt-1 px-3 py-2 border rounded-lg bg-gray-50 dark:bg-gray-900 dark:border-gray-700"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm">Password</label>
            <input
              type="password"
              className="w-full mt-1 px-3 py-2 border rounded-lg bg-gray-50 dark:bg-gray-900 dark:border-gray-700"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-lg font-semibold"
          >
            Sign in
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          No account?{' '}
          <Link to="/signup" className="text-primary">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
