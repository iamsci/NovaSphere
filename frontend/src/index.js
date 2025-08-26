// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import './styles/globals.css'; // or ./index.css if that’s your convention

/**
 * Bootstraps the React app:
 * - Wraps in StrictMode for dev warnings
 * - Provision Auth + Theme contexts for global usage
 * - Mounts onto <div id="root">
 */

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);
