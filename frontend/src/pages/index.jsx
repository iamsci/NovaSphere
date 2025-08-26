// pages/index.jsx
import Link from 'next/link';
import useAuth from '@/hooks/useAuth';
import useTheme from '@/hooks/useTheme';

export default function Home() {
  const { isAuthenticated, user } = useAuth();
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div className={`flex flex-col items-center justify-center h-screen space-y-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <h1 className="text-4xl font-bold">Welcome to NovaSphere</h1>

      {isAuthenticated ? (
        <p>
          Hello, {user.name}! <Link href="/feed"><a className="text-blue-600">Go to your feed →</a></Link>
        </p>
      ) : (
        <div className="space-x-4">
          <Link href="/login"><a className="px-4 py-2 bg-blue-600 text-white rounded-md">Log in</a></Link>
          <Link href="/register"><a className="px-4 py-2 border rounded-md">Register</a></Link>
        </div>
      )}

      <button
        onClick={toggleTheme}
        className="mt-4 px-3 py-1 border rounded-full"
      >
        {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>
    </div>
  );
}
