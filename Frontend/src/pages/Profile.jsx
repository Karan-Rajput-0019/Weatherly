import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import authService from '../services/authService';

const Profile = () => {
  const { user, dispatch } = useAuth();
  const [form, setForm] = useState({ name: '', avatar: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) setForm({ name: user.name || '', avatar: user.avatar || '' });
  }, [user]);

  const submit = async e => {
    e.preventDefault();
    try {
      const res = await authService.updateProfile(form);
      dispatch({ type: 'UPDATE_USER', payload: res.data.user });
      setMessage('Profile updated');
    } catch {
      setMessage('Update failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
        <h1 className="text-xl font-semibold mb-4">Profile</h1>
        {message && <p className="mb-2 text-sm">{message}</p>}
        <form className="space-y-4" onSubmit={submit}>
          <div>
            <label className="text-sm">Name</label>
            <input
              className="w-full mt-1 px-3 py-2 border rounded-lg bg-gray-50 dark:bg-gray-900 dark:border-gray-700"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm">Avatar URL</label>
            <input
              className="w-full mt-1 px-3 py-2 border rounded-lg bg-gray-50 dark:bg-gray-900 dark:border-gray-700"
              value={form.avatar}
              onChange={e => setForm({ ...form, avatar: e.target.value })}
            />
          </div>
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded-lg"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
