const ThemeConfig = ({ theme, onChange }) => {
  const handleColorChange = (key, value) => {
    onChange({
      ...theme,
      colors: { ...theme.colors, [key]: value },
    });
  };

  const handleFontChange = (key, value) => {
    onChange({
      ...theme,
      fonts: { ...theme.fonts, [key]: value },
    });
  };

  const generateGradient = () => {
    const { primary, secondary, accent } = theme.colors;
    return {
      primary: `linear-gradient(135deg, ${primary} 0%, ${secondary} 50%, ${accent} 100%)`,
      secondary: `linear-gradient(135deg, ${accent} 0%, ${secondary} 50%, #00d4aa 100%)`,
    };
  };

  const handleGenerateGradients = () => {
    onChange({
      ...theme,
      gradients: generateGradient(),
    });
  };

  return (
    <div className="space-y-8">
      {/* Colors */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Brand Colors</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(theme.colors).map(([key, value]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={value}
                  onChange={(e) => handleColorChange(key, e.target.value)}
                  className="w-16 h-10 rounded border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={value}
                  onChange={(e) => handleColorChange(key, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="#000000"
                />
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={handleGenerateGradients}
          className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 text-sm"
        >
          Auto-Generate Gradients from Colors
        </button>
      </div>

      {/* Fonts */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Typography</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Primary Font (Body Text)
            </label>
            <input
              type="text"
              value={theme.fonts.primary}
              onChange={(e) => handleFontChange('primary', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="'Inter', sans-serif"
            />
            <p className="text-xs text-gray-500 mt-1">
              Example: 'Poppins', sans-serif
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Secondary Font (Headings)
            </label>
            <input
              type="text"
              value={theme.fonts.secondary}
              onChange={(e) => handleFontChange('secondary', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="'Inter', sans-serif"
            />
            <p className="text-xs text-gray-500 mt-1">
              Example: 'Montserrat', sans-serif
            </p>
          </div>
        </div>

        {/* Font Presets */}
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Quick Presets:</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onChange({
                ...theme,
                fonts: { primary: "'Inter', sans-serif", secondary: "'Inter', sans-serif" }
              })}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
            >
              Inter
            </button>
            <button
              onClick={() => onChange({
                ...theme,
                fonts: { primary: "'Poppins', sans-serif", secondary: "'Montserrat', sans-serif" }
              })}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
            >
              Poppins + Montserrat
            </button>
            <button
              onClick={() => onChange({
                ...theme,
                fonts: { primary: "'Roboto', sans-serif", secondary: "'Playfair Display', serif" }
              })}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
            >
              Roboto + Playfair
            </button>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Theme Preview</h3>
        <div className="border border-gray-300 rounded-lg p-6 space-y-4">
          <div
            className="h-20 rounded-lg flex items-center justify-center text-white font-bold"
            style={{ background: theme.gradients?.primary || generateGradient().primary }}
          >
            Primary Gradient
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div
              className="h-16 rounded-lg"
              style={{ backgroundColor: theme.colors.primary }}
            />
            <div
              className="h-16 rounded-lg"
              style={{ backgroundColor: theme.colors.secondary }}
            />
            <div
              className="h-16 rounded-lg"
              style={{ backgroundColor: theme.colors.accent }}
            />
          </div>
          <div style={{ fontFamily: theme.fonts.primary }}>
            <p className="text-gray-700">Body text with primary font</p>
          </div>
          <div style={{ fontFamily: theme.fonts.secondary }}>
            <h2 className="text-2xl font-bold text-gray-900">Heading with secondary font</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeConfig;
