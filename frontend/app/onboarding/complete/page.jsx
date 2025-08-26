'use client';
import { useEffect, useState } from 'react';

export default function Complete() {
  const [status, setStatus] = useState('Submitting...');

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('onboarding') || '{}');

    fetch('/api/onboarding', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(res => res.ok ? setStatus('🎉 Onboarding complete!') : setStatus('❌ Submission failed'))
      .catch(() => setStatus('❌ Network error'));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Finalizing...</h2>
      <p>{status}</p>
    </div>
  );
}
