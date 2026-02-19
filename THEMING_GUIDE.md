# Dynamic Theming Guide

## Overview
This app supports dynamic theming with colors and fonts that can be configured from the backend.

## Backend API Format

Your backend should return a JSON object with this structure:

```json
{
  "colors": {
    "primary": "#7c3aed",
    "secondary": "#ec4899",
    "accent": "#ef4444",
    "background": "#0f172a",
    "surface": "#1a1f3a",
    "text": "#ffffff"
  },
  "gradients": {
    "primary": "linear-gradient(135deg, #7c3aed 0%, #ec4899 50%, #ef4444 100%)",
    "secondary": "linear-gradient(135deg, #ef4444 0%, #ec4899 50%, #00d4aa 100%)"
  },
  "fonts": {
    "primary": "'Inter', sans-serif",
    "secondary": "'Poppins', sans-serif"
  }
}
```

## Usage

### 1. Wrap your app with ThemeProvider

```jsx
import { ThemeProvider } from './contexts/ThemeContext';
import { useThemeFromBackend } from './hooks/useThemeFromBackend';

function App() {
  const { theme, loading } = useThemeFromBackend('https://api.example.com/theme');
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <ThemeProvider theme={theme}>
      {/* Your app */}
    </ThemeProvider>
  );
}
```

### 2. Use CSS Variables in Components

The theme automatically creates CSS variables you can use:

**In Tailwind classes (via arbitrary values):**
```jsx
<div className="bg-[var(--color-primary)]">
<div className="text-[var(--color-secondary)]">
<div style={{ background: 'var(--gradient-primary)' }}>
```

**In inline styles:**
```jsx
<div style={{ 
  background: 'var(--gradient-primary)',
  color: 'var(--color-text)'
}}>
```

**In CSS files:**
```css
.my-button {
  background: var(--gradient-primary);
  color: var(--color-text);
}
```

### 3. Update Existing Components

Replace hardcoded colors with CSS variables:

**Before:**
```jsx
<div className="bg-gradient-to-r from-[#7c3aed] via-[#ec4899] to-[#ef4444]">
```

**After:**
```jsx
<div style={{ background: 'var(--gradient-primary)' }}>
```

## Key CSS Variables

### Colors
- `--color-primary` - Main brand color
- `--color-secondary` - Secondary brand color
- `--color-accent` - Accent/highlight color
- `--color-background` - Page background
- `--color-surface` - Card/surface background
- `--color-text` - Text color

### Gradients
- `--gradient-primary` - Main gradient (buttons, borders)
- `--gradient-secondary` - Secondary gradient (accents)

### Fonts
- `--font-primary` - Body text font
- `--font-secondary` - Heading font

## Example: Converting a Component

**Original:**
```jsx
<button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white">
  Click me
</button>
```

**Dynamic:**
```jsx
<button 
  style={{ background: 'var(--gradient-primary)' }}
  className="text-white"
>
  Click me
</button>
```

## Testing Different Themes

Create theme presets for testing:

```jsx
// themes/presets.js
export const themes = {
  default: {
    colors: {
      primary: '#7c3aed',
      secondary: '#ec4899',
      // ...
    }
  },
  blue: {
    colors: {
      primary: '#3b82f6',
      secondary: '#06b6d4',
      // ...
    }
  },
  green: {
    colors: {
      primary: '#10b981',
      secondary: '#14b8a6',
      // ...
    }
  }
};
```

## Best Practices

1. **Always provide fallbacks** - The system uses defaultTheme if backend fails
2. **Test with different themes** - Ensure your UI works with various color combinations
3. **Use semantic names** - Stick to primary/secondary/accent for consistency
4. **Cache theme data** - Consider localStorage to avoid re-fetching
5. **Validate backend data** - Ensure colors are valid hex/rgb values

## Minimal Changes Required

To make the entire app themeable, update these key areas:

1. **Gradients** - Replace hardcoded gradients with `var(--gradient-primary)`
2. **Brand colors** - Replace purple/pink with `var(--color-primary/secondary)`
3. **Backgrounds** - Use `var(--color-background)` and `var(--color-surface)`
4. **Text colors** - Use `var(--color-text)` for main text

Most other styling (spacing, borders, shadows) can remain static.
