// pages/register.jsx
import { useState } from 'react';
import { useRouter } from 'next/router';
import useTheme from '@/hooks/useTheme';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { darkMode } = useTheme();
  const router = useRouter();
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      if (!res.ok) throw new Error('Registration failed');
      router.replace('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <form onSubmit={handleSubmit} className="w-full max-w-sm p-6 border rounded-lg space-y-4">
        <h1 className="text-2xl font-bold">Register</h1>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="text"
          placeholder="Name"
          className="w-full px-4 py-2 border rounded"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
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
          Register
        </button>
      </form>
    </div>
  );
}
