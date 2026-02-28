import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import ThemeConfig from '../components/admin/ThemeConfig';
import ContentConfigComplete from '../components/admin/ContentConfigComplete';
import DomainSelector from '../components/admin/DomainSelector';
import ClientCreator from '../components/admin/ClientCreator';
import AdminLayout from '../components/admin/AdminLayout';
import { updateLandingPageContent, getLandingPageByDomain } from '../api/endpoints';
import { transformApiResponse } from '../api/dataTransformer';
import { isAuthenticated } from '../api/apiClient';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [selectedDomain, setSelectedDomain] = useState('');
  const [selectedUuid, setSelectedUuid] = useState(''); // Store UUID for API updates
  const [activeTab, setActiveTab] = useState('theme');
  const [hasChanges, setHasChanges] = useState(false);
  const [saving, setSaving] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [config, setConfig] = useState({
    domain: '',
    theme: {
      colors: {
        primary: '#7c3aed',
        secondary: '#ec4899',
        accent: '#ef4444',
        background: '#0f172a',
        surface: '#1a1f3a',
        text: '#ffffff',
      },
      fonts: {
        primary: "'Inter', sans-serif",
        secondary: "'Inter', sans-serif",
      },
    },
    content: {
      hero: {
        title: {
          line1: 'Build Custom Websites like',
          strong1: 'Apple',
          strong2: 'CRED',
          line2: 'without a single code using',
          strong3: 'Webflow for your Portfolio!',
        },
        tagline: 'Design and animate highly responsive custom websites',
        ctaText: 'Enroll for ₹1,999',
        videoUrl: 'https://vimeo.com/659871207/f4df3defe9',
        mentorName: 'Keshav Sharma',
        mentorSubtitle: 'Our Students have worked in',
      },
      stats: [
        { number: '5000+', label: 'Students Trained' },
        { number: '4+', label: 'Projects' },
        { number: '₹3999', label: 'Only' },
      ],
      audiences: [
        'Designers',
        'Developers',
        'Entrepreneurs',
        'Product Managers',
        'Freelancers',
        'Digital Marketers',
        'Small Businesses',
        'Students',
      ],
      pricing: {
        originalPrice: '₹3999',
        discountedPrice: '₹1800',
        discount: '55%',
      },
    },
  });

  // Check authentication on mount
  useEffect(() => {
    if (!isAuthenticated()) {
      toast.error('Please login to access admin panel');
      navigate('/login');
    }
  }, [navigate]);

  const handleSave = () => {
    const allConfigs = JSON.parse(localStorage.getItem('domainConfigs') || '{}');
    allConfigs[selectedDomain] = config;
    localStorage.setItem('domainConfigs', JSON.stringify(allConfigs));
    setHasChanges(false);
    toast.success(`Configuration saved for ${selectedDomain}!`);
  };

  const handleLoad = async (domain) => {
    // Try to load from API first
    try {
      const apiResponse = await getLandingPageByDomain(domain);
      if (apiResponse.success && apiResponse.data) {
        const transformedData = transformApiResponse(apiResponse.data);
        if (transformedData) {
          setConfig(transformedData);
          setSelectedDomain(domain);
          setSelectedUuid(apiResponse.data.uuid); // Store UUID for updates
          setHasChanges(false);
          toast.success(`Loaded from API: ${domain}`);
          return;
        }
      }
    } catch (error) {
      console.warn('Failed to load from API, trying localStorage');
    }

    // Fallback to localStorage
    const allConfigs = JSON.parse(localStorage.getItem('domainConfigs') || '{}');
    if (allConfigs[domain]) {
      setConfig(allConfigs[domain]);
      setSelectedDomain(domain);
      setSelectedUuid(''); // No UUID for local configs
      setHasChanges(false);
      toast.success(`Loaded from localStorage: ${domain}`);
    }
  };

  const handleSaveToApi = async () => {
    if (!selectedUuid) {
      toast.error('No UUID found. This domain is not in the API.');
      return;
    }

    setSaving(true);
    try {
      const response = await updateLandingPageContent(selectedUuid, config.content);
      if (response.success) {
        setHasChanges(false);
        toast.success('✅ Saved to API successfully!');
      } else {
        toast.error(`Failed to save: ${response.error}`);
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(config, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${selectedDomain}-config.json`;
    link.click();
    toast.success('Configuration exported!');
  };

  const handlePreview = () => {
    const allConfigs = JSON.parse(localStorage.getItem('domainConfigs') || '{}');
    allConfigs[selectedDomain] = config;
    localStorage.setItem('domainConfigs', JSON.stringify(allConfigs));
    window.open(`/?domain=${selectedDomain}`, '_blank');
    toast.success('Preview opened in new tab!');
  };

  const handleConfigChange = (newConfig) => {
    setConfig(newConfig);
    setHasChanges(true);
  };

  const handleClientCreated = (data) => {
    console.log('New client created:', data);
    // Trigger refresh of domain list
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <AdminLayout
      onSave={handleSave}
      onSaveToApi={handleSaveToApi}
      onExport={handleExport}
      onPreview={handlePreview}
      selectedDomain={selectedDomain}
      selectedUuid={selectedUuid}
      hasChanges={hasChanges}
      saving={saving}
    >
      {/* Client Creator */}
      <ClientCreator onClientCreated={handleClientCreated} />

      {/* Domain Selector */}
      <DomainSelector
        selectedDomain={selectedDomain}
        onDomainChange={setSelectedDomain}
        onLoad={handleLoad}
        refreshTrigger={refreshTrigger}
      />

      {selectedDomain && (
        <>
          {/* Tabs */}
          <div className="bg-white rounded-lg shadow mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab('theme')}
                  className={`px-6 py-3 border-b-2 font-medium text-sm ${
                    activeTab === 'theme'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Theme & Branding
                </button>
                <button
                  onClick={() => setActiveTab('content')}
                  className={`px-6 py-3 border-b-2 font-medium text-sm ${
                    activeTab === 'content'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Content
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'theme' && (
                <ThemeConfig
                  theme={config.theme}
                  onChange={(theme) => handleConfigChange({ ...config, theme })}
                />
              )}

              {activeTab === 'content' && (
                <ContentConfigComplete
                  content={config.content}
                  onChange={(content) => handleConfigChange({ ...config, content })}
                />
              )}
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
};

export default AdminPanel;
