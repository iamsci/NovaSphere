'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const niches = ['Tech', 'Art', 'Gaming', 'Education', 'Lifestyle'];

export default function Step3() {
  const router = useRouter();
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('onboarding') || '{}');
    setSelected(saved.niche || []);
  }, []);

  const toggle = (niche) => {
    setSelected(prev =>
      prev.includes(niche) ? prev.filter(n => n !== niche) : [...prev, niche]
    );
  };

  const handleNext = () => {
    const prev = JSON.parse(localStorage.getItem('onboarding') || '{}');
    localStorage.setItem('onboarding', JSON.stringify({ ...prev, niche: selected }));
    router.push('/onboarding/complete');
  };

  return (
    <div>
      <p className="mb-4">Select your niche(s):</p>
      <div className="flex flex-wrap gap-2">
        {niches.map(niche => (
          <button
            key={niche}
            onClick={() => toggle(niche)}
            className={`px-3 py-1 rounded border ${selected.includes(niche) ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
          >
            {niche}
          </button>
        ))}
      </div>

      <button onClick={handleNext} className="btn mt-6">Finish</button>
    </div>
  );
}
