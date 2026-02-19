import { createContext, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children, theme }) => {
  useEffect(() => {
    // Apply CSS variables to root
    const root = document.documentElement;
    
    // Colors
    root.style.setProperty('--color-primary', theme.colors.primary);
    root.style.setProperty('--color-secondary', theme.colors.secondary);
    root.style.setProperty('--color-accent', theme.colors.accent);
    root.style.setProperty('--color-background', theme.colors.background);
    root.style.setProperty('--color-surface', theme.colors.surface);
    root.style.setProperty('--color-text', theme.colors.text);
    
    // Gradients
    root.style.setProperty('--gradient-primary', theme.gradients.primary);
    root.style.setProperty('--gradient-secondary', theme.gradients.secondary);
    
    // Fonts
    root.style.setProperty('--font-primary', theme.fonts.primary);
    root.style.setProperty('--font-secondary', theme.fonts.secondary);
    
  }, [theme]);

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

// Default theme (fallback)
export const defaultTheme = {
  colors: {
    primary: '#7c3aed',      // Purple
    secondary: '#ec4899',    // Pink
    accent: '#ef4444',       // Red
    background: '#0f172a',   // Dark blue
    surface: '#1a1f3a',      // Card background
    text: '#ffffff',         // White
  },
  gradients: {
    primary: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 50%, #ef4444 100%)',
    secondary: 'linear-gradient(135deg, #ef4444 0%, #ec4899 50%, #00d4aa 100%)',
  },
  fonts: {
    primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    secondary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
};
