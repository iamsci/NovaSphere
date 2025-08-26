// components/NotificationBell.jsx

import { useState, useEffect } from 'react';

export default function NotificationBell() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Simulate polling or socket updates
    const interval = setInterval(() => {
      setCount((prev) => (prev < 5 ? prev + 1 : prev));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      <button className="text-xl">🔔</button>
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">
          {count}
        </span>
      )}
    </div>
  );
}
