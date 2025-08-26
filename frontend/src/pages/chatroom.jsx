// pages/chatroom.jsx
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import useAuth from '@/hooks/useAuth';
import useTheme from '@/hooks/useTheme';

export default function ChatRoom() {
  const { isAuthenticated, user, getAuthHeader } = useAuth();
  const { darkMode } = useTheme();
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const bottomRef = useRef();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    // TODO: replace with real WebSocket or SSE
    fetch('/api/chat', { headers: getAuthHeader() })
      .then(r => r.json())
      .then(setMessages);
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify({ text: input }),
    });
    const msg = await res.json();
    setMessages(prev => [...prev, msg]);
    setInput('');
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!isAuthenticated) return null;

  return (
    <div className={`flex flex-col h-screen p-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="flex-1 overflow-y-auto space-y-2 mb-4">
        {messages.map((m, i) => (
          <div key={i} className={`${m.sender === user.id ? 'text-right' : 'text-left'}`}>
            <span className="inline-block px-3 py-1 rounded-full bg-blue-500 text-white">
              {m.text}
            </span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="flex">
        <input
          className="flex-1 px-4 py-2 border rounded-l-md focus:outline-none"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message…"
        />
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}
