'use client';
import { useState, useEffect } from 'react';

export default function OnboardingForm({ onComplete }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    bio: '',
    avatar: '',
    niche: []
  });

  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const niches = ['Tech', 'Art', 'Gaming', 'Education', 'Lifestyle'];

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('onboarding') || '{}');
    setForm(prev => ({ ...prev, ...saved }));
  }, []);

  const updateField = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    localStorage.setItem('onboarding', JSON.stringify({ ...form, [field]: value }));
  };

  const toggleNiche = (niche) => {
    const updated = form.niche.includes(niche)
      ? form.niche.filter(n => n !== niche)
      : [...form.niche, niche];
    updateField('niche', updated);
  };

  const handleSubmit = async () => {
    setStatus('submitting');
    setError('');

    try {
      const res = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (!res.ok) throw new Error('Submission failed');
      setStatus('success');
      localStorage.removeItem('onboarding');
      if (onComplete) onComplete();
    } catch (err) {
      setStatus('error');
      setError(err.message || 'Unknown error');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block mb-1 font-medium">Name</label>
        <input
          value={form.name}
          onChange={e => updateField('name', e.target.value)}
          className="input"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Email</label>
        <input
          type="email"
          value={form.email}
          onChange={e => updateField('email', e.target.value)}
          className="input"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Bio</label>
        <textarea
          value={form.bio}
          onChange={e => updateField('bio', e.target.value)}
          className="input"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Avatar URL</label>
        <input
          value={form.avatar}
          onChange={e => updateField('avatar', e.target.value)}
          className="input"
        />
      </div>

      <div>
        <p className="mb-2 font-medium">Select your niche(s):</p>
        <div className="flex flex-wrap gap-2">
          {niches.map(niche => (
            <button
              key={niche}
              type="button"
              onClick={() => toggleNiche(niche)}
              className={`px-3 py-1 rounded border ${
                form.niche.includes(niche)
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100'
              }`}
            >
              {niche}
            </button>
          ))}
        </div>
      </div>

      <div>
        <button
          onClick={handleSubmit}
          disabled={status === 'submitting'}
          className="btn mt-4"
        >
          {status === 'submitting' ? 'Submitting...' : 'Submit'}
        </button>
        {status === 'error' && (
          <p className="text-red-500 mt-2">Error: {error}</p>
        )}
        {status === 'success' && (
          <p className="text-green-600 mt-2">🎉 Submission complete!</p>
        )}
      </div>
    </div>
  );
}
