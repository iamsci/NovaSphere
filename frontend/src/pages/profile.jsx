// pages/profile.jsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useAuth from '@/hooks/useAuth';
import useTheme from '@/hooks/useTheme';

export default function Profile() {
  const { user, isAuthenticated, getAuthHeader } = useAuth();
  const { darkMode } = useTheme();
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login');
    } else {
      setForm({ name: user.name, email: user.email });
    }
  }, [isAuthenticated, user, router]);

  const save = async () => {
    const res = await fetch('/api/user/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setMessage('Profile updated!');
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className={`p-8 max-w-md mx-auto ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
      {message && <p className="mb-4 text-green-500">{message}</p>}
      <label className="block mb-2">
        Name
        <input
          className="w-full px-4 py-2 border rounded"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
      </label>
      <label className="block mb-4">
        Email
        <input
          type="email"
          className="w-full px-4 py-2 border rounded"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
      </label>
      <button onClick={save} className="px-4 py-2 bg-blue-600 text-white rounded">
        Save Changes
      </button>
    </div>
  );
}
