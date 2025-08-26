// pages/creator-dashboard.jsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useAuth from '@/hooks/useAuth';
import useTheme from '@/hooks/useTheme';

export default function CreatorDashboard() {
  const { user, isAuthenticated, getAuthHeader } = useAuth();
  const { darkMode } = useTheme();
  const router = useRouter();
  const [clips, setClips] = useState([]);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'creator') {
      router.replace('/login');
    }
  }, [isAuthenticated, user, router]);

  useEffect(() => {
    if (isAuthenticated && user.role === 'creator') {
      fetch('/api/creator/clips', { headers: getAuthHeader() })
        .then(r => r.json())
        .then(setClips);
    }
  }, [isAuthenticated, user, getAuthHeader]);

  if (!isAuthenticated || user?.role !== 'creator') return null;

  return (
    <div className={`min-h-screen p-8 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <h1 className="text-3xl font-bold mb-4">Creator Dashboard</h1>
      <p>Manage your content clips and track engagement.</p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {clips.map(c => (
          <div key={c.id} className="p-4 border rounded-lg">
            <h2 className="font-semibold">{c.title}</h2>
            <p className="text-sm text-gray-500">Views: {c.views}</p>
            {/* TODO: Edit, Delete actions */}
          </div>
        ))}
      </div>
    </div>
  );
}
