// pages/onboarding.jsx
import { useState } from 'react';
import { useRouter } from 'next/router';
import useAuth from '@/hooks/useAuth';
import useTheme from '@/hooks/useTheme';

export default function Onboarding() {
  const { user, isAuthenticated, getAuthHeader } = useAuth();
  const { darkMode } = useTheme();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ bio: '', interests: [] });

  if (!isAuthenticated) {
    router.replace('/login');
    return null;
  }

  const next = async () => {
    if (step < 3) {
      setStep(s => s + 1);
    } else {
      // Save onboarding data
      await fetch('/api/user/onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(),
        },
        body: JSON.stringify(form),
      });
      router.replace('/feed');
    }
  };

  return (
    <div className={`p-8 max-w-xl mx-auto ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <h1 className="text-2xl font-bold mb-4">Onboarding — Step {step} of 3</h1>

      {step === 1 && (
        <div className="space-y-4">
          <label className="block">
            Bio
            <textarea
              rows="3"
              className="w-full px-4 py-2 border rounded"
              value={form.bio}
              onChange={e => setForm({ ...form, bio: e.target.value })}
            />
          </label>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-2">
          <label className="block">
            Interests (comma separated)
            <input
              className="w-full px-4 py-2 border rounded"
              value={form.interests.join(', ')}
              onChange={e =>
                setForm({ ...form, interests: e.target.value.split(',').map(i => i.trim()) })
              }
            />
          </label>
        </div>
      )}

      {step === 3 && (
        <div>
          <p className="mb-4">Review your info:</p>
          <pre className="p-4 bg-gray-100 rounded dark:bg-gray-800">
            {JSON.stringify(form, null, 2)}
          </pre>
        </div>
      )}

      <button
        onClick={next}
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {step < 3 ? 'Next' : 'Finish'}
      </button>
    </div>
  );
}
