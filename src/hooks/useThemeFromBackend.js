import { useState, useEffect } from 'react';
import { defaultTheme } from '../contexts/ThemeContext';

/**
 * Hook to fetch theme configuration from backend
 * @param {string} apiUrl - Backend API endpoint
 * @returns {object} theme - Theme configuration object
 */
export const useThemeFromBackend = (apiUrl) => {
  const [theme, setTheme] = useState(defaultTheme);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        // Merge with default theme to ensure all properties exist
        setTheme({
          colors: { ...defaultTheme.colors, ...data.colors },
          gradients: { ...defaultTheme.gradients, ...data.gradients },
          fonts: { ...defaultTheme.fonts, ...data.fonts },
        });
      } catch (error) {
        console.error('Failed to fetch theme:', error);
        // Use default theme on error
        setTheme(defaultTheme);
      } finally {
        setLoading(false);
      }
    };

    if (apiUrl) {
      fetchTheme();
    } else {
      setLoading(false);
    }
  }, [apiUrl]);

  return { theme, loading };
};
