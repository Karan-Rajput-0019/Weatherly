import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import authService from '../services/authService';

const Profile = () => {
  const { user, dispatch } = useAuth();
  const [form, setForm] = useState({
    name: '',
    avatar: '',
    profileMode: 'standard',
    activities: []
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || '',
        avatar: user.avatar || '',
        profileMode: user.profile_mode || 'standard',
        activities: user.activities || []
      });
    }
  }, [user]);

  const submit = async e => {
    e.preventDefault();
    try {
      const res = await authService.updateProfile({
        name: form.name,
        avatar: form.avatar,
        profileMode: form.profileMode,
        activities: form.activities
      });
      dispatch({ type: 'UPDATE_USER', payload: res.data.user });
      setMessage('Profile updated');
    } catch {
      setMessage('Update failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 overflow-y-auto">
      <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-xl p-6 shadow mb-10">
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

          <div>
            <label className="text-sm">Mode</label>
            <select
              className="w-full mt-1 px-3 py-2 border rounded-lg bg-gray-50 dark:bg-gray-900 dark:border-gray-700"
              value={form.profileMode}
              onChange={e =>
                setForm({ ...form, profileMode: e.target.value })
              }
            >
              <option value="standard">Standard</option>
              <option value="fitness">Fitness</option>
              <option value="allergy">Allergy</option>
            </select>
          </div>

          <div>
            <label className="text-sm">Activities (comma separated)</label>
            <input
              className="w-full mt-1 px-3 py-2 border rounded-lg bg-gray-50 dark:bg-gray-900 dark:border-gray-700"
              value={form.activities.join(', ')}
              onChange={e =>
                setForm({
                  ...form,
                  activities: e.target.value
                    .split(',')
                    .map(x => x.trim())
                    .filter(Boolean)
                })
              }
            />
            <p className="mt-1 text-xs text-gray-500">
              Example: running, cycling, walking
            </p>
          </div>

         <div className="pt-2">
  <button
    type="submit"
    className="px-4 py-2 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700
               dark:bg-primary dark:hover:bg-primary/90"
  >
    Save
  </button>
</div>

        </form>
      </div>
    </div>
  );
};

export default Profile;
