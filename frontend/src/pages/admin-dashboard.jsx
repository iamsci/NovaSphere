// pages/admin-dashboard.jsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useAuth from '@/hooks/useAuth';
import useTheme from '@/hooks/useTheme';

export default function AdminDashboard() {
  const { user, isAuthenticated } = useAuth();
  const { darkMode } = useTheme();
  const router = useRouter();

  // Redirect non-admins
  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      router.replace('/login');
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || user?.role !== 'admin') {
    return null;
  }

  return (
    <div className={`min-h-screen p-8 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p>Welcome back, {user.name}. Here you can manage users, view stats, and configure the platform.</p>
      {/* TODO: Insert admin widgets, tables, charts */}
    </div>
  );
}
