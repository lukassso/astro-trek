import { useState, useEffect } from 'react';

export const useAstroTheme = () => {
  const [theme, setTheme] = useState('dark'); 
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const root = document.documentElement;

    const initialTheme = root.getAttribute('data-theme') || 'dark';
    setTheme(initialTheme);
    setMounted(true);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          const newTheme = root.getAttribute('data-theme') || 'dark';
          setTheme(newTheme);
        }
      });
    });

    observer.observe(root, {
      attributes: true,
    });

    return () => {
      observer.disconnect();
    };
  }, []); 

  return {
    isDarkMode: theme === 'light',
    mounted,
  };
};