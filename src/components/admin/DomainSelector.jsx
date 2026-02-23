import { useState, useEffect } from 'react';
import { Plus, Trash2, Globe, RefreshCw } from 'lucide-react';
import { getAllLandingPages } from '../../api/endpoints';

const DomainSelector = ({ selectedDomain, onDomainChange, onLoad }) => {
  const [domains, setDomains] = useState([]);
  const [apiDomains, setApiDomains] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showApiDomains, setShowApiDomains] = useState(true);
  const [newDomain, setNewDomain] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  // Fetch domains from API
  const fetchApiDomains = async () => {
    setLoading(true);
    try {
      const response = await getAllLandingPages();
      if (response.success && response.data) {
        setApiDomains(response.data);
        console.log('✅ Fetched domains from API:', response.data.length);
      } else {
        console.error('❌ Failed to fetch domains:', response.error);
      }
    } catch (error) {
      console.error('❌ Error fetching domains:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Load existing domains from localStorage
    const allConfigs = JSON.parse(localStorage.getItem('domainConfigs') || '{}');
    setDomains(Object.keys(allConfigs));
    
    // Fetch API domains
    fetchApiDomains();
  }, []);

  const handleAddDomain = () => {
    if (newDomain && !domains.includes(newDomain)) {
      const updatedDomains = [...domains, newDomain];
      setDomains(updatedDomains);
      onDomainChange(newDomain);
      setNewDomain('');
      setShowAddForm(false);
    }
  };

  const handleDeleteDomain = (domain) => {
    if (confirm(`Delete configuration for ${domain}?`)) {
      const allConfigs = JSON.parse(localStorage.getItem('domainConfigs') || '{}');
      delete allConfigs[domain];
      localStorage.setItem('domainConfigs', JSON.stringify(allConfigs));
      setDomains(domains.filter(d => d !== domain));
      if (selectedDomain === domain) {
        onDomainChange('');
      }
    }
  };

  const handleSelectApiDomain = (domain) => {
    onDomainChange(domain);
    onLoad(domain);
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'disabled':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Globe className="w-5 h-5" />
          Domain Selection
        </h2>
        <button
          onClick={fetchApiDomains}
          disabled={loading}
          className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* API Domains Section */}
      <div className="mb-6">
        <button
          onClick={() => setShowApiDomains(!showApiDomains)}
          className="w-full flex items-center justify-between px-4 py-3 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg hover:from-purple-100 hover:to-blue-100 transition"
        >
          <span className="font-medium text-purple-900">
            📡 API Domains ({apiDomains.length})
          </span>
          <span className="text-purple-600">
            {showApiDomains ? '▼' : '▶'}
          </span>
        </button>

        {showApiDomains && (
          <div className="mt-3 space-y-2 max-h-96 overflow-y-auto">
            {loading ? (
              <div className="text-center py-8 text-gray-500">
                <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2" />
                Loading domains...
              </div>
            ) : apiDomains.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No domains found in API
              </div>
            ) : (
              apiDomains.map((item) => (
                <div
                  key={item.uuid}
                  onClick={() => handleSelectApiDomain(item.domain)}
                  className={`p-3 border rounded-lg cursor-pointer transition hover:shadow-md ${
                    selectedDomain === item.domain
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{item.domain}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {item.client.name}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Manual Domain Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-gray-700">Local Domains ({domains.length})</h3>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            Add Custom
          </button>
        </div>

        {showAddForm && (
          <div className="mb-4 p-4 bg-gray-50 rounded-lg">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Domain Name
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newDomain}
                onChange={(e) => setNewDomain(e.target.value)}
                placeholder="example.com"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleAddDomain}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Add
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {domains.map((domain) => (
            <div
              key={domain}
              className={`p-4 border-2 rounded-lg cursor-pointer transition ${
                selectedDomain === domain
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div
                  onClick={() => {
                    onDomainChange(domain);
                    onLoad(domain);
                  }}
                  className="flex-1"
                >
                  <h3 className="font-semibold text-gray-900">{domain}</h3>
                  <p className="text-sm text-gray-500">Click to edit</p>
                </div>
                <button
                  onClick={() => handleDeleteDomain(domain)}
                  className="text-red-600 hover:text-red-800 ml-2"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}

          {domains.length === 0 && !showAddForm && (
            <div className="col-span-3 text-center py-4 text-gray-500 text-sm">
              No local domains. Use API domains above or add custom domain.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DomainSelector;
