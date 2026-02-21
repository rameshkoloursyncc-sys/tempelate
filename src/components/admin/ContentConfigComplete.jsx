import { useState } from 'react';
import {
  Target, FileText, Users, BookOpen, Gift, Clock,
  Briefcase, CheckSquare, User, HelpCircle, DollarSign,
  Sparkles, Plus, Trash2, LassoIcon
} from 'lucide-react';
import { title } from 'framer-motion/client';

// Move components outside to prevent recreation on each render
const SectionCard = ({ children, title, description }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
    </div>
    {children}
  </div>
);

const InputField = ({ label, value, onChange, placeholder, type = 'text', rows }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    {rows ? (
      <textarea
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        placeholder={placeholder}
      />
    ) : (
      <input
        type={type}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        placeholder={placeholder}
      />
    )}
  </div>
);

const ContentConfigComplete = ({ content, onChange }) => {
  const [activeSection, setActiveSection] = useState('hero');

  const sections = [
    { id: 'hero', label: 'Hero', icon: Target, color: 'purple' },
    { id: 'intro', label: 'Intro', icon: Sparkles, color: 'purple' },
    { id: 'description', label: 'Description', icon: FileText, color: 'purple' },
    { id: 'stats', label: 'Statistics', icon: Target, color: 'purple' },
    { id: 'audiences', label: 'Audiences', icon: Users, color: 'purple' },
    { id: 'curriculum', label: 'Curriculum', icon: BookOpen, color: 'purple' },
    { id: 'bonuses', label: 'Bonuses', icon: Gift, color: 'purple' },
    { id: 'urgency', label: 'Urgency', icon: Clock, color: 'purple' },
    { id: 'opportunities', label: 'Opportunities', icon: Briefcase, color: 'purple' },
    { id: 'checklist', label: 'Checklist', icon: CheckSquare, color: 'purple' },
    { id: 'instructor', label: 'Instructor', icon: User, color: 'purple' },
    { id: 'faqs', label: 'FAQs', icon: HelpCircle, color: 'purple' },
    { id: 'pricing', label: 'Pricing', icon: DollarSign, color: 'purple' },
    { id: 'footer', label: 'Footer', icon: LassoIcon, color: 'purple' },
  ];

  // Initialize missing sections - memoized to prevent re-renders
  const getSection = (section, defaultValue) => {
    return content[section] || defaultValue;
  };

  // Hero Section
  const renderHero = () => {
    const hero = getSection('hero', {
      title: { line1: '', strong1: '', strong2: '', line2: '', strong3: '' },
      tagline: '',
      ctaText: '',
      ctaLink: '',
      videoUrl: '',
      mentorName: '',
      mentorSubtitle: '',
      logo: '',
      ctaIcon: '',
      videoThumbnail: '',
      videoPlayIcon: '',
      mentorImage: '',
    });

    return (
      <SectionCard title="Hero Section" description="The first thing visitors see">
        <div className="space-y-4">
          <InputField
            label="Title Line 1"
            value={hero.title.line1}
            onChange={(v) => onChange({
              ...content,
              hero: { ...hero, title: { ...hero.title, line1: v } }
            })}
            placeholder="Build Custom Websites like"
          />
            <InputField
            label="Logo"
            value={hero.logo}
            onChange={(v) => onChange({
              ...content,
              hero: { ...hero, logo: v }
            })}
            placeholder="Build Custom Websites like"
          />

          <div className="grid grid-cols-3 gap-4">
            <InputField
              label="Highlight 1"
              value={hero.title.strong1}
              onChange={(v) => onChange({
                ...content,
                hero: { ...hero, title: { ...hero.title, strong1: v } }
              })}
              placeholder="Apple"
            />
            <InputField
              label="Highlight 2"
              value={hero.title.strong2}
              onChange={(v) => onChange({
                ...content,
                hero: { ...hero, title: { ...hero.title, strong2: v } }
              })}
              placeholder="CRED"
            />
            <InputField
              label="Highlight 3"
              value={hero.title.strong3}
              onChange={(v) => onChange({
                ...content,
                hero: { ...hero, title: { ...hero.title, strong3: v } }
              })}
              placeholder="Webflow"
            />
          </div>

          <InputField
            label="Title Line 2"
            value={hero.title.line2}
            onChange={(v) => onChange({
              ...content,
              hero: { ...hero, title: { ...hero.title, line2: v } }
            })}
            placeholder="without a single code using"
          />

          <InputField
            label="Tagline"
            value={hero.tagline}
            onChange={(v) => onChange({ ...content, hero: { ...hero, tagline: v } })}
            placeholder="Design and animate highly responsive..."
            rows={3}
          />

          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="CTA Button Text"
              value={hero.ctaText}
              onChange={(v) => onChange({ ...content, hero: { ...hero, ctaText: v } })}
              placeholder="Enroll for ₹1,999"
            />
            <InputField
              label="CTA Button Link"
              value={hero.ctaLink}
              onChange={(v) => onChange({ ...content, hero: { ...hero, ctaLink: v } })}
              placeholder="#enroll or https://payment.com/checkout"
              type="url"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Video URL"
              value={hero.videoUrl}
              onChange={(v) => onChange({ ...content, hero: { ...hero, videoUrl: v } })}
              placeholder="https://vimeo.com/..."
              type="url"
            />
            <InputField
              label="Logo URL"
              value={hero.logo}
              onChange={(v) => onChange({ ...content, hero: { ...hero, logo: v } })}
              placeholder="https://..."
              type="url"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Mentor Name"
              value={hero.mentorName}
              onChange={(v) => onChange({ ...content, hero: { ...hero, mentorName: v } })}
              placeholder="Keshav Sharma"
            />
            <InputField
              label="Mentor Subtitle"
              value={hero.mentorSubtitle}
              onChange={(v) => onChange({ ...content, hero: { ...hero, mentorSubtitle: v } })}
              placeholder="Our Students have worked in"
            />
          </div>

          {/* Image URLs Section */}
          <div className="p-4 bg-purple-50 rounded-lg space-y-4 border-2 border-purple-200">
            <h4 className="font-semibold text-gray-800 flex items-center gap-2">
              <span>🖼️</span> Images & Icons
            </h4>
            
            <InputField
              label="CTA Button Icon URL"
              value={hero.ctaIcon}
              onChange={(v) => onChange({ ...content, hero: { ...hero, ctaIcon: v } })}
              placeholder="/src/assets/wf-buton-arrow.svg or https://..."
              type="url"
            />
            
            <InputField
              label="Video Thumbnail URL"
              value={hero.videoThumbnail}
              onChange={(v) => onChange({ ...content, hero: { ...hero, videoThumbnail: v } })}
              placeholder="/src/assets/thumbnil.jpeg or https://..."
              type="url"
            />
            
            <InputField
              label="Video Play Icon URL"
              value={hero.videoPlayIcon}
              onChange={(v) => onChange({ ...content, hero: { ...hero, videoPlayIcon: v } })}
              placeholder="/src/assets/Playbutton.svg or https://..."
              type="url"
            />
            
            <InputField
              label="Mentor Image URL"
              value={hero.mentorImage}
              onChange={(v) => onChange({ ...content, hero: { ...hero, mentorImage: v } })}
              placeholder="/src/assets/Keshav.png or https://..."
              type="url"
            />
          </div>
        </div>
      </SectionCard>
    );
  };

  // Intro Section
  const renderIntro = () => {
    const intro = getSection('intro', { title: '', emoji: '👇', ctaText: '', ctaLink: '', image: '' });

    return (
      <SectionCard title="Intro Section" description="Appears after hero section">
        <div className="space-y-4">
          <InputField
            label="Title"
            value={intro.title}
            onChange={(v) => onChange({ ...content, intro: { ...intro, title: v } })}
            placeholder="You can even build this website yourself"
          />
          <div className="grid grid-cols-3 gap-4">
            <InputField
              label="Emoji"
              value={intro.emoji}
              onChange={(v) => onChange({ ...content, intro: { ...intro, emoji: v } })}
              placeholder="👇"
            />
            <InputField
              label="CTA Text"
              value={intro.ctaText}
              onChange={(v) => onChange({ ...content, intro: { ...intro, ctaText: v } })}
              placeholder="Enroll Now"
            />
            <InputField
              label="CTA Link"
              value={intro.ctaLink}
              onChange={(v) => onChange({ ...content, intro: { ...intro, ctaLink: v } })}
              placeholder="#enroll or https://..."
              type="url"
            />
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
            <InputField
              label="Background Image URL"
              value={intro.image}
              onChange={(v) => onChange({ ...content, intro: { ...intro, image: v } })}
              placeholder="/src/assets/5f2db973311dff83f9829e34_webflow-home-hero-1.png or https://..."
              type="url"
            />
          </div>
        </div>
      </SectionCard>
    );
  };

  // Description Section
  const renderDescription = () => {
    const description = getSection('description', { title: '', text: '' });

    return (
      <SectionCard title="Description Section" description="Explain what your product is">
        <div className="space-y-4">
          <InputField
            label="Title"
            value={description.title}
            onChange={(v) => onChange({ ...content, description: { ...description, title: v } })}
            placeholder="What is Webflow, and why should you care?"
          />
          <InputField
            label="Description"
            value={description.text}
            onChange={(v) => onChange({ ...content, description: { ...description, text: v } })}
            placeholder="Webflow is a magical tool..."
            rows={5}
          />
        </div>
      </SectionCard>
    );
  };

  // Stats Section
  const renderStats = () => {
    const stats = getSection('stats', []);

    return (
      <SectionCard title="Statistics" description="Show impressive numbers">
        <div className="space-y-4">
          {stats.map((stat, index) => (
            <div key={index} className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
              <InputField
                label="Number"
                value={stat.number}
                onChange={(v) => {
                  const newStats = [...stats];
                  newStats[index] = { ...newStats[index], number: v };
                  onChange({ ...content, stats: newStats });
                }}
                placeholder="5000+"
              />
              <InputField
                label="Label"
                value={stat.label}
                onChange={(v) => {
                  const newStats = [...stats];
                  newStats[index] = { ...newStats[index], label: v };
                  onChange({ ...content, stats: newStats });
                }}
                placeholder="Students Trained"
              />
            </div>
          ))}
          <button
            onClick={() => onChange({ ...content, stats: [...stats, { number: '', label: '' }] })}
            className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-500 transition flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Statistic
          </button>
        </div>
      </SectionCard>
    );
  };

  // Audiences Section
  const renderAudiences = () => {
    const audiences = getSection('audiences', { 
      title: '', 
      list: [], 
      ctaText: '', 
      ctaLink: '', 
      disclaimer: '' 
    });
    
    // Handle backward compatibility - if audiences is an array, convert it
    const audiencesList = Array.isArray(audiences) ? audiences : (audiences.list || []);
    const isOldFormat = Array.isArray(audiences);

    return (
      <SectionCard title="Target Audiences" description="Who is this for?">
        <div className="space-y-4">
          <InputField
            label="Section Title"
            value={isOldFormat ? 'Who is this program for?' : audiences.title}
            onChange={(v) => onChange({ 
              ...content, 
              audiences: { ...audiences, title: v } 
            })}
            placeholder="Who is this program for?"
          />
          
          <div className="space-y-3">
            {audiencesList.map((audience, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={audience}
                  onChange={(e) => {
                    const newList = [...audiencesList];
                    newList[index] = e.target.value;
                    onChange({ 
                      ...content, 
                      audiences: isOldFormat ? newList : { ...audiences, list: newList } 
                    });
                  }}
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Designers"
                />
                <button
                  onClick={() => {
                    const newList = audiencesList.filter((_, i) => i !== index);
                    onChange({ 
                      ...content, 
                      audiences: isOldFormat ? newList : { ...audiences, list: newList } 
                    });
                  }}
                  className="p-2.5 text-red-600 hover:bg-red-50 rounded-lg transition"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
            <button
              onClick={() => onChange({ 
                ...content, 
                audiences: isOldFormat ? [...audiencesList, ''] : { ...audiences, list: [...audiencesList, ''] } 
              })}
              className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-pink-500 hover:text-pink-500 transition flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Audience
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <InputField
              label="CTA Button Text"
              value={isOldFormat ? '' : audiences.ctaText}
              onChange={(v) => onChange({ 
                ...content, 
                audiences: { ...audiences, ctaText: v } 
              })}
              placeholder="Enroll for ₹1,999"
            />
            <InputField
              label="CTA Button Link"
              value={isOldFormat ? '' : audiences.ctaLink}
              onChange={(v) => onChange({ 
                ...content, 
                audiences: { ...audiences, ctaLink: v } 
              })}
              placeholder="#enroll or https://..."
              type="url"
            />
          </div>
          
          <InputField
            label="Disclaimer Text"
            value={isOldFormat ? '' : audiences.disclaimer}
            onChange={(v) => onChange({ 
              ...content, 
              audiences: { ...audiences, disclaimer: v } 
            })}
            placeholder="Register before midnight to unlock these bonuses."
          />
        </div>
      </SectionCard>
    );
  };

  // Pricing Section
  const renderPricing = () => {
    const pricing = getSection('pricing', { originalPrice: '', discountedPrice: '', discount: '' });

    return (
      <SectionCard title="Pricing" description="Set your pricing details">
        <div className="grid grid-cols-3 gap-4">
          <InputField
            label="Original Price"
            value={pricing.originalPrice}
            onChange={(v) => onChange({ ...content, pricing: { ...pricing, originalPrice: v } })}
            placeholder="₹3999"
          />
          <InputField
            label="Discounted Price"
            value={pricing.discountedPrice}
            onChange={(v) => onChange({ ...content, pricing: { ...pricing, discountedPrice: v } })}
            placeholder="₹1800"
          />
          <InputField
            label="Discount %"
            value={pricing.discount}
            onChange={(v) => onChange({ ...content, pricing: { ...pricing, discount: v } })}
            placeholder="55%"
          />
        </div>
      </SectionCard>
    );
  };

  // Curriculum Section
  const renderCurriculum = () => {
    const curriculum = getSection('curriculum', { title: '', modules: [], certificateImage: '', ctaText: '', ctaLink: '' });

    return (
      <SectionCard title="Curriculum" description="Course modules and lessons">
        <div className="space-y-4">
          <InputField
            label="Section Title"
            value={curriculum.title}
            onChange={(v) => onChange({ ...content, curriculum: { ...curriculum, title: v } })}
            placeholder="What will you learn in the program?"
          />

          {curriculum.modules.map((module, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg space-y-3">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-700">Module {index + 1}</span>
                <button
                  onClick={() => {
                    const newModules = content.curriculum.modules.filter((_, i) => i !== index);
                    onChange({ ...content, curriculum: { ...curriculum, modules: newModules } });
                  }}
                  className="text-red-600 hover:bg-red-50 p-2 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <InputField
                  label="Number"
                  value={module.number}
                  onChange={(v) => {
                    const newModules = [...curriculum.modules];
                    newModules[index] = { ...newModules[index], number: v };
                    onChange({ ...content, curriculum: { ...curriculum, modules: newModules } });
                  }}
                  placeholder="01"
                />
                <InputField
                  label="Title"
                  value={module.title}
                  onChange={(v) => {
                    const newModules = [...curriculum.modules];
                    newModules[index] = { ...newModules[index], title: v };
                    onChange({ ...content, curriculum: { ...curriculum, modules: newModules } });
                  }}
                  placeholder="Introduction to Webflow"
                />
              </div>
              <InputField
                label="Description"
                value={module.description}
                onChange={(v) => {
                  const newModules = [...curriculum.modules];
                  newModules[index] = { ...newModules[index], description: v };
                  onChange({ ...content, curriculum: { ...curriculum, modules: newModules } });
                }}
                placeholder="What students will learn..."
                rows={3}
              />
              
              <InputField
                label="Module Image URL"
                value={module.image}
                onChange={(v) => {
                  const newModules = [...curriculum.modules];
                  newModules[index] = { ...newModules[index], image: v };
                  onChange({ ...content, curriculum: { ...curriculum, modules: newModules } });
                }}
                placeholder="/src/assets/module-image.webp or https://..."
                type="url"
              />
            </div>
          ))}

          <button
            onClick={() => onChange({
              ...content,
              curriculum: {
                ...curriculum,
                modules: [...curriculum.modules, { number: '', title: '', description: '', image: '' }]
              }
            })}
            className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-yellow-500 hover:text-yellow-500 transition flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Module
          </button>
          
          {/* Certificate Image */}
          <div className="p-4 bg-yellow-50 rounded-lg border-2 border-yellow-200 mt-6">
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span>🏆</span> Certificate Image
            </h4>
            <InputField
              label="Certificate Image URL"
              value={curriculum.certificateImage}
              onChange={(v) => onChange({ ...content, curriculum: { ...curriculum, certificateImage: v } })}
              placeholder="/src/assets/certificates.png or https://..."
              type="url"
            />
          </div>
          
          {/* Bottom CTA */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <InputField
              label="Bottom CTA Text"
              value={curriculum.ctaText}
              onChange={(v) => onChange({ ...content, curriculum: { ...curriculum, ctaText: v } })}
              placeholder="Enroll for ₹1,999"
            />
            <InputField
              label="Bottom CTA Link"
              value={curriculum.ctaLink}
              onChange={(v) => onChange({ ...content, curriculum: { ...curriculum, ctaLink: v } })}
              placeholder="#enroll or https://..."
              type="url"
            />
          </div>
        </div>
      </SectionCard>
    );
  };

  // Bonuses Section
  const renderBonuses = () => {
    const bonuses = getSection('bonuses', { title: '', items: [] });

    return (
      <SectionCard title="Bonuses" description="Extra value items">
        <div className="space-y-4">
          <InputField
            label="Section Title"
            value={bonuses.title}
            onChange={(v) => onChange({ ...content, bonuses: { ...bonuses, title: v } })}
            placeholder="Unlock Bonuses Worth ₹20,000"
          />

          {bonuses.items.map((bonus, index) => (
            <div key={index} className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
              <InputField
                label="Bonus Title"
                value={bonus.title}
                onChange={(v) => {
                  const newItems = [...bonuses.items];
                  newItems[index] = { ...newItems[index], title: v };
                  onChange({ ...content, bonuses: { ...bonuses, items: newItems } });
                }}
                placeholder="Launch Checklist"
              />
              <div className="flex gap-2">
                <InputField
                  label="Value"
                  value={bonus.value}
                  onChange={(v) => {
                    const newItems = [...bonuses.items];
                    newItems[index] = { ...newItems[index], value: v };
                    onChange({ ...content, bonuses: { ...bonuses, items: newItems } });
                  }}
                  placeholder="₹2,500"
                />
                <button
                  onClick={() => {
                    const newItems = content.bonuses.items.filter((_, i) => i !== index);
                    onChange({ ...content, bonuses: { ...bonuses, items: newItems } });
                  }}
                  className="mt-7 p-2.5 text-red-600 hover:bg-red-50 rounded-lg transition"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={() => onChange({
              ...content,
              bonuses: {
                ...content.bonuses,
                items: [...bonuses.items, { title: '', value: '' }]
              }
            })}
            className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-red-500 hover:text-red-500 transition flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Bonus
          </button>
        </div>
      </SectionCard>
    );
  };

  // Urgency Section
  const renderUrgency = () => {
    const urgency = getSection('urgency', { title: '', description: '', targetDate: '', cta: { text: '', link: '#' } });

    return (
      <SectionCard title="Urgency Timer" description="Create urgency with countdown">
        <div className="space-y-4">
          <InputField
            label="Title"
            value={urgency.title}
            onChange={(v) => onChange({ ...content, urgency: { ...urgency, title: v } })}
            placeholder="Time is running!"
          />
          <InputField
            label="Description"
            value={urgency.description}
            onChange={(v) => onChange({ ...content, urgency: { ...urgency, description: v } })}
            placeholder="Grab your spot fast..."
            rows={3}
          />
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Target Date"
              value={urgency.targetDate}
              onChange={(v) => onChange({ ...content, urgency: { ...urgency, targetDate: v } })}
              placeholder="2024-12-31"
              type="date"
            />
            <InputField
              label="CTA Text"
              value={urgency.cta.text}
              onChange={(v) => onChange({
                ...content,
                urgency: { ...urgency, cta: { ...urgency.cta, text: v } }
              })}
              placeholder="Enroll Now"
            />
          </div>
        </div>
      </SectionCard>
    );
  };

  // Opportunities Section
  const renderOpportunities = () => {
    const opportunities = getSection('opportunities', { title: '', items: [] });

    return (
      <SectionCard title="Opportunities" description="Career and business opportunities">
        <div className="space-y-4">
          <InputField
            label="Section Title"
            value={opportunities.title}
            onChange={(v) => onChange({ ...content, opportunities: { ...opportunities, title: v } })}
            placeholder="Create an Outstanding Portfolio..."
          />

          {opportunities.items.map((item, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">Opportunity {index + 1}</span>
                <button
                  onClick={() => {
                    const newItems = content.opportunities.items.filter((_, i) => i !== index);
                    onChange({ ...content, opportunities: { ...opportunities, items: newItems } });
                  }}
                  className="text-red-600 hover:bg-red-50 p-2 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <InputField
                label="Statistic"
                value={item.stat}
                onChange={(v) => {
                  const newItems = [...opportunities.items];
                  newItems[index] = { ...newItems[index], stat: v };
                  onChange({ ...content, opportunities: { ...opportunities, items: newItems } });
                }}
                placeholder="4$ Billion"
              />
              <InputField
                label="Description"
                value={item.description}
                onChange={(v) => {
                  const newItems = [...opportunities.items];
                  newItems[index] = { ...newItems[index], description: v };
                  onChange({ ...content, opportunities: { ...opportunities, items: newItems } });
                }}
                placeholder="Market size, job opportunities..."
                rows={3}
              />
            </div>
          ))}

          <button
            onClick={() => onChange({
              ...content,
              opportunities: {
                ...content.opportunities,
                items: [...opportunities.items, { stat: '', description: '' }]
              }
            })}
            className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-teal-500 hover:text-teal-500 transition flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Opportunity
          </button>
        </div>
      </SectionCard>
    );
  };

  // Checklist Section
  const renderChecklist = () => {
    const checklist = getSection('checklist', { title: '', subtitle: '', items: [], ctaText: '', ctaLink: '' });

    return (
      <SectionCard title="Checklist" description="Interactive checklist for visitors">
        <div className="space-y-4">
          <InputField
            label="Title"
            value={checklist.title}
            onChange={(v) => onChange({ ...content, checklist: { ...checklist, title: v } })}
            placeholder="Still wondering if the program is for you?"
          />
          <InputField
            label="Subtitle"
            value={checklist.subtitle}
            onChange={(v) => onChange({ ...content, checklist: { ...checklist, subtitle: v } })}
            placeholder="Please Check All Boxes..."
            rows={2}
          />

          {checklist.items.map((item, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={item}
                onChange={(e) => {
                  const newItems = [...checklist.items];
                  newItems[index] = e.target.value;
                  onChange({ ...content, checklist: { ...checklist, items: newItems } });
                }}
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Checklist item..."
              />
              <button
                onClick={() => {
                  const newItems = content.checklist.items.filter((_, i) => i !== index);
                  onChange({ ...content, checklist: { ...checklist, items: newItems } });
                }}
                className="p-2.5 text-red-600 hover:bg-red-50 rounded-lg transition"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}

          <button
            onClick={() => onChange({
              ...content,
              checklist: {
                ...checklist,
                items: [...checklist.items, '']
              }
            })}
            className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-cyan-500 hover:text-cyan-500 transition flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Checklist Item
          </button>
          
          {/* CTA Fields */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <InputField
              label="CTA Button Text"
              value={checklist.ctaText}
              onChange={(v) => onChange({ ...content, checklist: { ...checklist, ctaText: v } })}
              placeholder="Enroll for ₹1,999"
            />
            <InputField
              label="CTA Button Link"
              value={checklist.ctaLink}
              onChange={(v) => onChange({ ...content, checklist: { ...checklist, ctaLink: v } })}
              placeholder="#enroll or https://..."
              type="url"
            />
          </div>
        </div>
      </SectionCard>
    );
  };

  // Instructor Section
  const renderInstructor = () => {
    const instructor = getSection('instructor', { name: '', title: '', bio: '', image: '' });

    return (
      <SectionCard title="Instructor" description="About the course instructor">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Name"
              value={instructor.name}
              onChange={(v) => onChange({ ...content, instructor: { ...instructor, name: v } })}
              placeholder="Keshav Sharma"
            />
            <InputField
              label="Title"
              value={instructor.title}
              onChange={(v) => onChange({ ...content, instructor: { ...instructor, title: v } })}
              placeholder="Founder at EPYC & Magik"
            />
          </div>
          
          <div className="p-4 bg-violet-50 rounded-lg border-2 border-violet-200">
            <InputField
              label="Instructor Image URL"
              value={instructor.image}
              onChange={(v) => onChange({ ...content, instructor: { ...instructor, image: v } })}
              placeholder="/src/assets/Keshav.png or https://..."
              type="url"
            />
          </div>
          
          <InputField
            label="Bio"
            value={instructor.bio}
            onChange={(v) => onChange({ ...content, instructor: { ...instructor, bio: v } })}
            placeholder="Tell us about the instructor..."
            rows={6}
          />
        </div>
      </SectionCard>
    );
  };

  // FAQs Section
  const renderFaqs = () => {
    const faqs = getSection('faqs', { title: '', items: [] });

    return (
      <SectionCard title="FAQs" description="Frequently asked questions">
        <div className="space-y-4">
          <InputField
            label="Section Title"
            value={faqs.title}
            onChange={(v) => onChange({ ...content, faqs: { ...faqs, title: v } })}
            placeholder="FAQs: Here's everything you may ask..."
          />

          {faqs.items.map((faq, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">FAQ {index + 1}</span>
                <button
                  onClick={() => {
                    const newItems = content.faqs.items.filter((_, i) => i !== index);
                    onChange({ ...content, faqs: { ...faqs, items: newItems } });
                  }}
                  className="text-red-600 hover:bg-red-50 p-2 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <InputField
                label="Question"
                value={faq.question}
                onChange={(v) => {
                  const newItems = [...faqs.items];
                  newItems[index] = { ...newItems[index], question: v };
                  onChange({ ...content, faqs: { ...faqs, items: newItems } });
                }}
                placeholder="How does the program work?"
              />
              <InputField
                label="Answer"
                value={faq.answer}
                onChange={(v) => {
                  const newItems = [...faqs.items];
                  newItems[index] = { ...newItems[index], answer: v };
                  onChange({ ...content, faqs: { ...faqs, items: newItems } });
                }}
                placeholder="The answer to the question..."
                rows={3}
              />
            </div>
          ))}

          <button
            onClick={() => onChange({
              ...content,
              faqs: {
                ...content.faqs,
                items: [...faqs.items, { question: '', answer: '' }]
              }
            })}
            className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-lime-500 hover:text-lime-500 transition flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add FAQ
          </button>
        </div>
      </SectionCard>
    );
  };

  const renderFooter = () => {
    const footer = getSection('footer', {
      contents: {
        title: "",
        email: "",
        description: "",
        copyrightText: "",
      },
      brandList: [] ,
      domain : {
        icon : "",
        name : "",
        name2:""
      }
    });

    return (
      <SectionCard title="Footer" description="Footer Section">
        <div className="space-y-4">
             <InputField
            label="Footer icon"
            value={footer.domain?.icon}
            onChange={(v) => onChange({
              ...content, footer: {
                ...footer,
                domain: { ...footer.domain, icon: v }
              }
            })}
            placeholder="FAQs: Here's everything you may ask..."
          />
              <InputField
            label="Footer name"
            value={footer.domain?.name}
            onChange={(v) => onChange({
              ...content, footer: {
                ...footer,
                domain: { ...footer.domain, name: v }
              }
            })}
            placeholder="FAQs: Here's everything you may ask..."
          />
              <InputField
            label="Footer name2"
            value={footer.domain?.name2}
            onChange={(v) => onChange({
              ...content, footer: {
                ...footer,
                domain: { ...footer.domain, name2: v }
              }
            })}
            placeholder="FAQs: Here's everything you may ask..."
          />
          <InputField
            label="Footer Title"
            value={footer.contents.title}
            onChange={(v) => onChange({
              ...content, footer: {
                ...footer,
                contents: { ...footer.contents, title: v }
              }
            })}
            placeholder="FAQs: Here's everything you may ask..."
          />
          <InputField
            label="Footer email"
            value={footer.contents.email}
            onChange={(v) => onChange({
              ...content, footer: {
                ...footer,
                contents: { ...footer.contents, email: v }
              }
            })}
            placeholder="FAQs: Here's everything you may ask..."
          />
          <InputField
            label="Footer CopyrightText"
            value={footer.contents.copyrightText}
            onChange={(v) => onChange({
              ...content, footer: {
                ...footer,
                contents: { ...footer.contents, copyrightText: v }
              }
            })}
            placeholder="FAQs: Here's everything you may ask..."
          />
          <InputField
            label="Footer Decsription"
            value={footer.contents.decsription}
            onChange={(v) => onChange({
              ...content, footer: {
                ...footer,
                contents: { ...footer.contents, decsription: v }
              }
            })}
            placeholder="FAQs: Here's everything you may ask..."
          />

          {footer.brandList.map((brand, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">Social {index + 1}</span>
                 <button
                  onClick={() => {
                    const newBrandList = footer.brandList.filter((_, i) => i !== index);
                    onChange({ 
                      ...content, 
                      footer: { ...footer, brandList: newBrandList } 
                    });
                  }}  
                  className="text-red-600 hover:bg-red-50 p-2 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <InputField
                label="URL"
                value={brand.logo}
                onChange={(v) => {
                       const newbrandList = [...footer.brandList];
                    newbrandList[index] = {...newbrandList[index], logo : v};
                    onChange({ ...content, footer: { ...footer, brandList: newbrandList } });
                }}
                 placeholder="https://example.com/logo.png"
                type="url"

              />
              <InputField
                label="Title"
                value={brand.title}
                onChange={(v) => {
                  const newbrandList = [...footer.brandList];
                    newbrandList[index] = {...newbrandList[index], title : v};
                    onChange({ ...content, footer: { ...footer, brandList: newbrandList } });
                }}
                placeholder="The answer to the title2..."
              />
               <InputField
                label="Description"
                value={brand.title2}
                onChange={(v) => {
                  const newbrandList = [...footer.brandList];
                    newbrandList[index] = {...newbrandList[index], title2 : v};
                    onChange({ ...content, footer: { ...footer, brandList: newbrandList } });
                }}
                placeholder="The answer to the title2..."
              />
            </div>
          ))}

          <button
            onClick={() => onChange({
              ...content,
              footer: {
                ...footer,
                brandList: [...footer.brandList, { logo: '', title: '' ,  title1: '' }]
              }
            })}
            className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-lime-500 hover:text-lime-500 transition flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add FAQ
          </button>
        </div>
      </SectionCard>
    );


  }

  const renderSection = () => {
    switch (activeSection) {
      case 'hero': return renderHero();
      case 'intro': return renderIntro();
      case 'description': return renderDescription();
      case 'stats': return renderStats();
      case 'audiences': return renderAudiences();
      case 'curriculum': return renderCurriculum();
      case 'bonuses': return renderBonuses();
      case 'urgency': return renderUrgency();
      case 'opportunities': return renderOpportunities();
      case 'checklist': return renderChecklist();
      case 'instructor': return renderInstructor();
      case 'faqs': return renderFaqs();
      case 'pricing': return renderPricing();
      case "footer": return renderFooter();
      default: return (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">This section is coming soon!</p>
          <p className="text-sm mt-2">We're working on adding more configuration options.</p>
        </div>
      );
    }
  };


  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Sidebar */}
      <div className="col-span-3 space-y-2">
        {sections.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;

          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${isActive
                ? `bg-${section.color}-600 text-white shadow-lg transform scale-105`
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300'
                }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium text-sm">{section.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="col-span-9">
        {renderSection()}
      </div>
    </div>
  );
};

export default ContentConfigComplete;
