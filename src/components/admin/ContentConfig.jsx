import { useState } from 'react';

const ContentConfig = ({ content, onChange }) => {
  const [activeSection, setActiveSection] = useState('hero');

  const handleHeroChange = (field, value) => {
    onChange({
      ...content,
      hero: { ...content.hero, [field]: value },
    });
  };

  const handleTitleChange = (field, value) => {
    onChange({
      ...content,
      hero: {
        ...content.hero,
        title: { ...content.hero.title, [field]: value },
      },
    });
  };

  const handleStatsChange = (index, field, value) => {
    const newStats = [...content.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    onChange({ ...content, stats: newStats });
  };

  const handleAudiencesChange = (index, value) => {
    const newAudiences = [...content.audiences];
    newAudiences[index] = value;
    onChange({ ...content, audiences: newAudiences });
  };

  const addAudience = () => {
    onChange({
      ...content,
      audiences: [...content.audiences, 'New Audience'],
    });
  };

  const removeAudience = (index) => {
    const newAudiences = content.audiences.filter((_, i) => i !== index);
    onChange({ ...content, audiences: newAudiences });
  };

  return (
    <div className="space-y-6">
      {/* Section Selector */}
      <div className="flex gap-2 flex-wrap">
        {['hero', 'stats', 'audiences', 'pricing'].map((section) => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
            className={`px-4 py-2 rounded-lg capitalize ${
              activeSection === section
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {section}
          </button>
        ))}
      </div>

      {/* Hero Section */}
      {activeSection === 'hero' && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Hero Section</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title Line 1
            </label>
            <input
              type="text"
              value={content.hero.title.line1}
              onChange={(e) => handleTitleChange('line1', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Strong Text 1
              </label>
              <input
                type="text"
                value={content.hero.title.strong1}
                onChange={(e) => handleTitleChange('strong1', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Strong Text 2
              </label>
              <input
                type="text"
                value={content.hero.title.strong2}
                onChange={(e) => handleTitleChange('strong2', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Strong Text 3
              </label>
              <input
                type="text"
                value={content.hero.title.strong3}
                onChange={(e) => handleTitleChange('strong3', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title Line 2
            </label>
            <input
              type="text"
              value={content.hero.title.line2}
              onChange={(e) => handleTitleChange('line2', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tagline
            </label>
            <textarea
              value={content.hero.tagline}
              onChange={(e) => handleHeroChange('tagline', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CTA Button Text
              </label>
              <input
                type="text"
                value={content.hero.ctaText}
                onChange={(e) => handleHeroChange('ctaText', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Video URL
              </label>
              <input
                type="text"
                value={content.hero.videoUrl}
                onChange={(e) => handleHeroChange('videoUrl', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mentor Name
              </label>
              <input
                type="text"
                value={content.hero.mentorName}
                onChange={(e) => handleHeroChange('mentorName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mentor Subtitle
              </label>
              <input
                type="text"
                value={content.hero.mentorSubtitle}
                onChange={(e) => handleHeroChange('mentorSubtitle', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* Stats Section */}
      {activeSection === 'stats' && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Statistics</h3>
          {content.stats.map((stat, index) => (
            <div key={index} className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number
                </label>
                <input
                  type="text"
                  value={stat.number}
                  onChange={(e) => handleStatsChange(index, 'number', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Label
                </label>
                <input
                  type="text"
                  value={stat.label}
                  onChange={(e) => handleStatsChange(index, 'label', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Audiences Section */}
      {activeSection === 'audiences' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Target Audiences</h3>
            <button
              onClick={addAudience}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm"
            >
              + Add Audience
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {content.audiences.map((audience, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={audience}
                  onChange={(e) => handleAudiencesChange(index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => removeAudience(index)}
                  className="text-red-600 hover:text-red-800 px-2"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pricing Section */}
      {activeSection === 'pricing' && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Pricing</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Original Price
              </label>
              <input
                type="text"
                value={content.pricing.originalPrice}
                onChange={(e) =>
                  onChange({
                    ...content,
                    pricing: { ...content.pricing, originalPrice: e.target.value },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Discounted Price
              </label>
              <input
                type="text"
                value={content.pricing.discountedPrice}
                onChange={(e) =>
                  onChange({
                    ...content,
                    pricing: { ...content.pricing, discountedPrice: e.target.value },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Discount %
              </label>
              <input
                type="text"
                value={content.pricing.discount}
                onChange={(e) =>
                  onChange({
                    ...content,
                    pricing: { ...content.pricing, discount: e.target.value },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentConfig;
