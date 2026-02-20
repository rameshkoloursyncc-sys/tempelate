import { useState, useEffect } from 'react';

const DomainSelector = ({ selectedDomain, onDomainChange, onLoad }) => {
  const [domains, setDomains] = useState([]);
  const [newDomain, setNewDomain] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    // Load existing domains from localStorage
    const allConfigs = JSON.parse(localStorage.getItem('domainConfigs') || '{}');
    setDomains(Object.keys(allConfigs));
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

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Select Domain</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
        >
          + Add New Domain
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
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}

        {domains.length === 0 && !showAddForm && (
          <div className="col-span-3 text-center py-8 text-gray-500">
            No domains configured. Click "Add New Domain" to get started.
          </div>
        )}
      </div>
    </div>
  );
};

export default DomainSelector;
