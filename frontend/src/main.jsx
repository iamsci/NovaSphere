// src/main.jsx

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/tailwind.css'

// Key for localStorage
const THEME_KEY = 'theme'

// Apply or remove the `dark` class on <html>
function applyTheme(theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
}

// Determine the initial theme from storage or system preference
function getInitialTheme() {
  const stored = localStorage.getItem(THEME_KEY)
  if (stored === 'light' || stored === 'dark') {
    return stored
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

// Immediately set the theme before React mounts
const initialTheme = getInitialTheme()
applyTheme(initialTheme)

// Expose a toggle function for your UI
export function toggleTheme() {
  const next = document.documentElement.classList.contains('dark')
    ? 'light'
    : 'dark'
  applyTheme(next)
  localStorage.setItem(THEME_KEY, next)
}

// Render the React app
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
