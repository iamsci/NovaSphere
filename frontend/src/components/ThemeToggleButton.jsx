// src/components/ThemeToggle.jsx

import React from 'react'
import { toggleTheme } from '../main'

export default function ThemeToggle() {
  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 bg-primary text-white rounded"
    >
      Toggle Dark Mode
    </button>
  )
}
