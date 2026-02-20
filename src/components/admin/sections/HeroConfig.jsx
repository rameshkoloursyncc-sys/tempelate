import { Video, User, Type } from 'lucide-react';

const HeroConfig = ({ content, onChange }) => {
  const updateHero = (field, value) => {
    onChange({
      ...content,
      hero: { ...content.hero, [field]: value }
    });
  };

  const updateTitle = (field, value) => {
    onChange({
      ...content,
      hero: {
        ...content.hero,
        title: { ...content.hero.title, [field]: value }
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center space-x-3 pb-4 border-b border-gray-200">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Type className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Hero Section</h3>
          <p className="text-sm text-gray-500">The first thing visitors see</p>
        </div>
      </div>

      {/* Title Configuration */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title Line 1
          </label>
          <input
            type="text"
            value={content.hero?.title?.line1 || ''}
            onChange={(e) => updateTitle('line1', e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            placeholder="Build Custom Websites like"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Highlight 1 <span className="text-xs text-blue-600">(colored)</span>
            </label>
            <input
              type="text"
              value={content.hero?.title?.strong1 || ''}
              onChange={(e) => updateTitle('strong1', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Apple"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Highlight 2
            </label>
            <input
              type="text"
              value={content.hero?.title?.strong2 || ''}
              onChange={(e) => updateTitle('strong2', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="CRED"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Highlight 3
            </label>
            <input
              type="text"
              value={content.hero?.title?.strong3 || ''}
              onChange={(e) => updateTitle('strong3', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Webflow"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title Line 2
          </label>
          <input
            type="text"
            value={content.hero?.title?.line2 || ''}
            onChange={(e) => updateTitle('line2', e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="without a single code using"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tagline / Subtitle
          </label>
          <textarea
            value={content.hero?.tagline || ''}
            onChange={(e) => updateHero('tagline', e.target.value)}
            rows={3}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Design and animate highly responsive custom websites..."
          />
        </div>
      </div>

      {/* CTA & Video */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            CTA Button Text
          </label>
          <input
            type="text"
            value={content.hero?.ctaText || ''}
            onChange={(e) => updateHero('ctaText', e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enroll for ₹1,999"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            <Video className="w-4 h-4 mr-1" />
            Video URL
          </label>
          <input
            type="url"
            value={content.hero?.videoUrl || ''}
            onChange={(e) => updateHero('videoUrl', e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://vimeo.com/..."
          />
        </div>
      </div>

      {/* Mentor Info */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            <User className="w-4 h-4 mr-1" />
            Mentor Name
          </label>
          <input
            type="text"
            value={content.hero?.mentorName || ''}
            onChange={(e) => updateHero('mentorName', e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Keshav Sharma"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mentor Subtitle
          </label>
          <input
            type="text"
            value={content.hero?.mentorSubtitle || ''}
            onChange={(e) => updateHero('mentorSubtitle', e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Our Students have worked in"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroConfig;
