'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Step2() {
  const router = useRouter();
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('onboarding') || '{}');
    setBio(saved.bio || '');
    setAvatar(saved.avatar || '');
  }, []);

  const handleNext = () => {
    const prev = JSON.parse(localStorage.getItem('onboarding') || '{}');
    localStorage.setItem('onboarding', JSON.stringify({ ...prev, bio, avatar }));
    router.push('/onboarding/step3');
  };

  return (
    <div>
      <label className="block mb-2">Bio</label>
      <textarea value={bio} onChange={e => setBio(e.target.value)} className="input" />

      <label className="block mt-4 mb-2">Avatar URL</label>
      <input value={avatar} onChange={e => setAvatar(e.target.value)} className="input" />

      <button onClick={handleNext} className="btn mt-6">Next</button>
    </div>
  );
}
