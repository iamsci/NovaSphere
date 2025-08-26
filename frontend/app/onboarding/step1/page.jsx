'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Step1() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('onboarding') || '{}');
    setName(saved.name || '');
    setEmail(saved.email || '');
  }, []);

  const handleNext = () => {
    localStorage.setItem('onboarding', JSON.stringify({ name, email }));
    router.push('/onboarding/step2');
  };

  return (
    <div>
      <label className="block mb-2">Name</label>
      <input value={name} onChange={e => setName(e.target.value)} className="input" />

      <label className="block mt-4 mb-2">Email</label>
      <input value={email} onChange={e => setEmail(e.target.value)} className="input" />

      <button onClick={handleNext} className="btn mt-6">Next</button>
    </div>
  );
}
