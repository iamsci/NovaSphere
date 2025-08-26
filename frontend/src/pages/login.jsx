// pages/login.jsx
import { useState } from 'react';
import { useRouter } from 'next/router';
import useAuth from '@/hooks/useAuth';
import useTheme from '@/hooks/useTheme';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const { darkMode } = useTheme();
  const router = useRouter();
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error('Invalid credentials');
      const { user, token } = await res.json();
      login(user, token);
      router.replace('/feed');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <form onSubmit={handleSubmit} className="w-full max-w-sm p-6 border rounded-lg space-y-4">
        <h1 className="text-2xl font-bold">Log In</h1>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border rounded"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white rounded">
          Log In
        </button>
        <p className="text-sm text-center">
          Don’t have an account? <a href="/register" className="text-blue-600">Register</a>
        </p>
      </form>
    </div>
  );
}
