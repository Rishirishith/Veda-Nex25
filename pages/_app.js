// pages/_app.js - Next.js App Configuration
import { useEffect } from 'react';

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Initialize theme on load
    const savedTheme = localStorage.getItem('vedanex-theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
  }, []);

  return <Component {...pageProps} />;
}