// pages/subscribe.jsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useAuth from '@/hooks/useAuth';
import useTheme from '@/hooks/useTheme';

export default function Subscribe() {
  const { isAuthenticated, getAuthHeader } = useAuth();
  const { darkMode } = useTheme();
  const router = useRouter();
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login');
    } else {
      fetch('/api/subscriptions/plans', { headers: getAuthHeader() })
        .then(r => r.json())
        .then(setPlans);
    }
  }, [isAuthenticated, getAuthHeader, router]);

  const subscribe = async planId => {
    const res = await fetch('/api/subscriptions/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify({ planId }),
    });
    const { url } = await res.json();
    window.location.href = url; // redirect to payment
  };

  if (!isAuthenticated) return null;

  return (
    <div className={`p-8 space-y-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <h1 className="text-3xl font-bold">Choose a Plan</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map(plan => (
          <div key={plan.id} className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold">{plan.name}</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">{plan.price}/mo</p>
            <button
              onClick={() => subscribe(plan.id)}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
            >
              Subscribe
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
