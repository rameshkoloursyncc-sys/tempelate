import { useState } from 'react';

const ContentConfigEnhanced = ({ content, onChange }) => {
  const [activeSection, setActiveSection] = useState('hero');

  const sections = [
    { id: 'hero', label: 'Hero Section', icon: '🎯' },
    { id: 'intro', label: 'Intro Section', icon: '👋' },
    { id: 'description', label: 'Description', icon: '📝' },
    { id: 'stats', label: 'Statistics', icon: '📊' },
    { id: 'audiences', label: 'Target Audiences', icon: '👥' },
    { id: 'curriculum', label: 'Curriculum', icon: '📚' },
    { id: 'bonuses', label: 'Bonuses', icon: '🎁' },
    { id: 'urgency', label: 'Urgency Timer', icon: '⏰' },
    { id: 'opportunities', label: 'Opportunities', icon: '💼' },
    { id: 'checklist', label: 'Checklist', icon: '✅' },
    { id: 'instructor', label: 'Instructor', icon: '👨‍🏫' },
    { id: 'faqs', label: 'FAQs', icon: '❓' },
    { id: 'pricing', label: 'Pricing', icon: '💰' },
  ];

  // Hero Section
  const renderHeroSection = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <p className="text-sm text-blue-700">
          <strong>Hero Section</strong> - The first thing visitors see. Make it compelling!
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Title Line 1
          </label>
          <input
            type="text"
            value={content.hero?.title?.line1 || ''}
            onChange={(e) => onChange({
              ...content,
              hero: {
                ...content.hero,
                title: { ...content.hero.title, line1: e.target.value }
              }
            })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Build Custom Websites like"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Highlight 1 <span className="text-xs text-gray-500">(will be colored)</span>
            </label>
            <input
              type="text"
              value={content.hero?.title?.strong1 || ''}
              onChange={(e) => onChange({
                ...content,
                hero: {
                  ...content.hero,
                  title: { ...content.hero.title, strong1: e.target.value }
                }
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Apple"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Highlight 2
            </label>
            <input
              type="text"
              value={content.hero?.title?.strong2 || ''}
              onChange={(e) => onChange({
                ...content,
                hero: {
                  ...content.hero,
                  title: { ...content.hero.title, strong2: e.target.value }
                }
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="CRED"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Highlight 3
            </label>
            <input
              type="text"
              value={content.hero?.title?.strong3 || ''}
              onChange={(e) => onChange({
                ...content,
                hero: {
                  ...content.hero,
                  title: { ...content.hero.title, strong3: e.target.value }
                }
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Webflow"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Title Line 2
          </label>
          <input
            type="text"
            value={content.hero?.title?.line2 || ''}
            onChange={(e) => onChange({
              ...content,
              hero: {
                ...content.hero,
                title: { ...content.hero.title, line2: e.target.value }
              }
            })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="without a single code using"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Tagline / Subtitle
          </label>
          <textarea
            value={content.hero?.tagline || ''}
            onChange={(e) => onChange({
              ...content,
              hero: { ...content.hero, tagline: e.target.value }
            })}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Design and animate highly responsive custom websites..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              CTA Button Text
            </label>
            <input
              type="text"
              value={content.hero?.ctaText || ''}
              onChange={(e) => onChange({
                ...content,
                hero: { ...content.hero, ctaText: e.target.value }
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enroll for ₹1,999"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Video URL
            </label>
            <input
              type="url"
              value={content.hero?.videoUrl || ''}
              onChange={(e) => onChange({
                ...content,
                hero: { ...content.hero, videoUrl: e.target.value }
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="https://vimeo.com/..."
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Mentor / Instructor Name
            </label>
            <input
              type="text"
              value={content.hero?.mentorName || ''}
              onChange={(e) => onChange({
                ...content,
                hero: { ...content.hero, mentorName: e.target.value }
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Keshav Sharma"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Mentor Subtitle
            </label>
            <input
              type="text"
              value={content.hero?.mentorSubtitle || ''}
              onChange={(e) => onChange({
                ...content,
                hero: { ...content.hero, mentorSubtitle: e.target.value }
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Our Students have worked in"
            />
          </div>
        </div>
      </div>
    </div>
  );

  // Intro Section
  const renderIntroSection = () => (
    <div className="space-y-6">
      <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-6">
        <p className="text-sm text-purple-700">
          <strong>Intro Section</strong> - Appears after hero, encourages action
        </p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Title
        </label>
        <input
          type="text"
          value={content.intro?.title || ''}
          onChange={(e) => onChange({
            ...content,
            intro: { ...content.intro, title: e.target.value }
          })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          placeholder="You can even build this website yourself"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Emoji (optional)
        </label>
        <input
          type="text"
          value={content.intro?.emoji || ''}
          onChange={(e) => onChange({
            ...content,
            intro: { ...content.intro, emoji: e.target.value }
          })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          placeholder="👇"
          maxLength={2}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          CTA Button Text
        </label>
        <input
          type="text"
          value={content.intro?.ctaText || ''}
          onChange={(e) => onChange({
            ...content,
            intro: { ...content.intro, ctaText: e.target.value }
          })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          placeholder="Enroll Now"
        />
      </div>
    </div>
  );

  // Description Section
  const renderDescriptionSection = () => (
    <div className="space-y-6">
      <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
        <p className="text-sm text-green-700">
          <strong>Description Section</strong> - Explain what your product/service is
        </p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Section Title
        </label>
        <input
          type="text"
          value={content.description?.title || ''}
          onChange={(e) => onChange({
            ...content,
            description: { ...content.description, title: e.target.value }
          })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          placeholder="What is Webflow, and why should you care?"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Description Text
        </label>
        <textarea
          value={content.description?.text || ''}
          onChange={(e) => onChange({
            ...content,
            description: { ...content.description, text: e.target.value }
          })}
          rows={5}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          placeholder="Webflow is a magical tool that helps normal people..."
        />
      </div>
    </div>
  );

  // Stats Section  
  const renderStatsSection = () => (
    <div className="space-y-6">
      <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 mb-6">
        <p className="text-sm text-indigo-700">
          <strong>Statistics</strong> - Show impressive numbers (students, projects, etc.)
        </p>
      </div>

      {(content.stats || []).map((stat, index) => (
        <div key={index} className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Number
            </label>
            <input
              type="text"
              value={stat.number}
              onChange={(e) => {
                const newStats = [...content.stats];
                newStats[index] = { ...newStats[index], number: e.target.value };
                onChange({ ...content, stats: newStats });
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="5000+"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Label
            </label>
            <input
              type="text"
              value={stat.label}
              onChange={(e) => {
                const newStats = [...content.stats];
                newStats[index] = { ...newStats[index], label: e.target.value };
                onChange({ ...content, stats: newStats });
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="Students Trained"
            />
          </div>
        </div>
      ))}

      <button
        onClick={() => {
          const newStats = [...(content.stats || []), { number: '0', label: 'New Stat' }];
          onChange({ ...content, stats: newStats });
        }}
        className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-indigo-500 hover:text-indigo-500 transition"
      >
        + Add Statistic
      </button>
    </div>
  );

  // Render active section
  const renderSection = () => {
    switch (activeSection) {
      case 'hero': return renderHeroSection();
      case 'intro': return renderIntroSection();
      case 'description': return renderDescriptionSection();
      case 'stats': return renderStatsSection();
      // Add more sections...
      default: return <div className="text-center py-12 text-gray-500">Section coming soon...</div>;
    }
  };

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Sidebar Navigation */}
      <div className="col-span-3 space-y-1">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`w-full text-left px-4 py-3 rounded-lg transition flex items-center gap-3 ${
              activeSection === section.id
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            <span className="text-xl">{section.icon}</span>
            <span className="font-medium text-sm">{section.label}</span>
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="col-span-9">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          {renderSection()}
        </div>
      </div>
    </div>
  );
};

export default ContentConfigEnhanced;
