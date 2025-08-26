// pages/feed.jsx
import { useEffect, useState } from 'react';
import useAuth from '@/hooks/useAuth';
import useTheme from '@/hooks/useTheme';
import { useRouter } from 'next/router';

export default function Feed() {
  const { isAuthenticated, getAuthHeader } = useAuth();
  const { darkMode } = useTheme();
  const router = useRouter();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login');
    } else {
      fetch('/api/posts', { headers: getAuthHeader() })
        .then(r => r.json())
        .then(setPosts);
    }
  }, [isAuthenticated, getAuthHeader, router]);

  if (!isAuthenticated) return null;

  return (
    <div className={`min-h-screen p-8 space-y-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <h1 className="text-3xl font-bold">Your Feed</h1>
      {posts.map(post => (
        <div key={post.id} className="p-4 border rounded-lg">
          <h2 className="font-semibold">{post.title}</h2>
          <p className="mt-2">{post.body}</p>
        </div>
      ))}
    </div>
  );
}
