import './App.css'
import { ThemeProvider, defaultTheme } from './contexts/ThemeContext'
import { useThemeFromBackend } from './hooks/useThemeFromBackend'
import PageLayout from './components/layout/PageLayout'
import StickyHeader from './components/layout/StickyHeader'
// ... other imports

function App() {
  // Option 1: Fetch theme from backend
  // const { theme, loading } = useThemeFromBackend('https://api.example.com/theme');
  
  // Option 2: Use theme from props/config
  const theme = {
    colors: {
      primary: '#7c3aed',
      secondary: '#ec4899',
      accent: '#ef4444',
      background: '#0f172a',
      surface: '#1a1f3a',
      text: '#ffffff',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 50%, #ef4444 100%)',
      secondary: 'linear-gradient(135deg, #ef4444 0%, #ec4899 50%, #00d4aa 100%)',
    },
    fonts: {
      primary: "'Inter', sans-serif",
      secondary: "'Inter', sans-serif",
    },
  };

  // if (loading) return <div>Loading theme...</div>;

  return (
    <ThemeProvider theme={theme}>
      <div className="relative">
        <StickyHeader offerText="🔥Early Bird Offer" />
        <PageLayout showBottomWave={true}>
          {/* Your components */}
        </PageLayout>
      </div>
    </ThemeProvider>
  )
}

export default App
