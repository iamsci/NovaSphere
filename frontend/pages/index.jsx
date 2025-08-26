// pages/index.jsx

import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    bio: '',
    avatar: '',
    niche: []
  });

  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleNicheToggle = (value) => {
    setForm(prev => {
      const exists = prev.niche.includes(value);
      const updated = exists
        ? prev.niche.filter(n => n !== value)
        : [...prev.niche, value];
      return { ...prev, niche: updated };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');
    setErrors([]);

    try {
      const res = await axios.post('/api/onboarding/submit', form);
      setStatus(res.data.message);
    } catch (err) {
      if (err.response?.data?.messages) {
        setErrors(err.response.data.messages);
      } else {
        setErrors(['Unexpected error occurred']);
      }
      setStatus(null);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">🚀 NovaSphere Onboarding</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <textarea
            name="bio"
            placeholder="Short bio"
            value={form.bio}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <input
            type="url"
            name="avatar"
            placeholder="Avatar URL"
            value={form.avatar}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <div>
            <label className="block font-semibold mb-1">Select your niche(s):</label>
            {['Tech', 'Art', 'Gaming', 'Education', 'Lifestyle'].map(n => (
              <label key={n} className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  checked={form.niche.includes(n)}
                  onChange={() => handleNicheToggle(n)}
                  className="mr-1"
                />
                {n}
              </label>
            ))}
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </form>

        {status && <p className="mt-4 text-green-600">{status}</p>}
        {errors.length > 0 && (
          <ul className="mt-4 text-red-600 list-disc list-inside">
            {errors.map((err, i) => <li key={i}>{err}</li>)}
          </ul>
        )}
      </div>
    </main>
  );
}
