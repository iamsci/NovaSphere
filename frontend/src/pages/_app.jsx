// src/pages/_app.jsx
import React from 'react';
import Head from 'next/head';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import '@/styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>NovaSphere</title>
        <meta name="description" content="Creator-powered social platform" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* favicon, OG tags, analytics scripts, etc. */}
      </Head>

      <AuthProvider>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </AuthProvider>
    </>
  );
}
