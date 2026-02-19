# Font Setup Guide

## How It Works

Fonts are applied **globally** from the backend. You don't need to set font-family on individual components!

## Backend API Response

```json
{
  "fonts": {
    "primary": "'Poppins', sans-serif",
    "secondary": "'Montserrat', sans-serif"
  }
}
```

## What Gets Applied Automatically

### Primary Font (--font-primary)
Applied to ALL text by default:
- Body text
- Paragraphs
- Buttons
- Links
- Form inputs
- All other elements

### Secondary Font (--font-secondary)
Applied to headings:
- h1, h2, h3, h4, h5, h6

## Example Backend Responses

### Example 1: Google Fonts
```json
{
  "fonts": {
    "primary": "'Roboto', sans-serif",
    "secondary": "'Playfair Display', serif"
  }
}
```

### Example 2: System Fonts
```json
{
  "fonts": {
    "primary": "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    "secondary": "Georgia, serif"
  }
}
```

### Example 3: Custom Fonts
```json
{
  "fonts": {
    "primary": "'MyCustomFont', sans-serif",
    "secondary": "'MyCustomFont', sans-serif"
  }
}
```

## Loading Custom Fonts

If using Google Fonts or custom fonts, add them to your HTML:

### In `index.html`:
```html
<head>
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Montserrat:wght@700;800&display=swap" rel="stylesheet">
</head>
```

### Or dynamically load fonts:
```jsx
// In ThemeContext.jsx
useEffect(() => {
  // Load Google Fonts dynamically
  if (theme.fonts.googleFontsUrl) {
    const link = document.createElement('link');
    link.href = theme.fonts.googleFontsUrl;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }
}, [theme]);
```

## Testing Different Fonts

```jsx
// Test with different fonts
const testThemes = {
  modern: {
    fonts: {
      primary: "'Inter', sans-serif",
      secondary: "'Inter', sans-serif"
    }
  },
  elegant: {
    fonts: {
      primary: "'Lora', serif",
      secondary: "'Playfair Display', serif"
    }
  },
  playful: {
    fonts: {
      primary: "'Quicksand', sans-serif",
      secondary: "'Fredoka', sans-serif"
    }
  }
};
```

## How CSS Variables Work

When backend sends:
```json
{
  "fonts": {
    "primary": "'Poppins', sans-serif"
  }
}
```

ThemeContext automatically updates:
```css
:root {
  --font-primary: 'Poppins', sans-serif;
}
```

And ALL text uses it:
```css
* {
  font-family: var(--font-primary);
}
```

## No Component Changes Needed!

You don't need to:
- ❌ Add font-family to each component
- ❌ Pass font props
- ❌ Import font variables

Everything is handled globally through CSS variables!

## Fallback Fonts

Always include fallback fonts:
```json
{
  "fonts": {
    "primary": "'CustomFont', -apple-system, BlinkMacSystemFont, sans-serif"
  }
}
```

This ensures text displays even if the custom font fails to load.
