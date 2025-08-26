// components/Navbar.jsx

import DarkModeToggle from './DarkModeToggle';
import NotificationBell from './NotificationBell';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 shadow">
      <h1 className="text-xl font-bold text-blue-600 dark:text-white">NovaSphere</h1>
      <div className="flex items-center gap-4">
        <NotificationBell />
        <DarkModeToggle />
      </div>
    </nav>
  );
}
