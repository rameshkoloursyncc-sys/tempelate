import { useState, useEffect } from 'react';
import { Plus, Trash2, Globe, RefreshCw, Search, Filter, X, Edit2, Save } from 'lucide-react';
import { getAllLandingPages, updateLandingPageDetails, updateLandingPageStatus } from '../../api/endpoints';
import toast from 'react-hot-toast';

const DomainSelector = ({ selectedDomain, onDomainChange, onLoad, refreshTrigger }) => {
  const [domains, setDomains] = useState([]);
  const [apiDomains, setApiDomains] = useState([]);
  const [filteredApiDomains, setFilteredApiDomains] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showApiDomains, setShowApiDomains] = useState(true);
  const [newDomain, setNewDomain] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Search and filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // all, published, draft, disabled
  const [showFilters, setShowFilters] = useState(false);
  
  // Edit inline states
  const [editingDomainUuid, setEditingDomainUuid] = useState(null);
  const [editForm, setEditForm] = useState({
    domain: '',
    status: 'draft',
    client_id: ''
  });
  const [saving, setSaving] = useState(false);

  // Fetch domains from API
  const fetchApiDomains = async () => {
    setLoading(true);
    try {
      const response = await getAllLandingPages();
      if (response.success && response.data) {
        setApiDomains(response.data);
        setFilteredApiDomains(response.data);
        console.log('✅ Fetched domains from API:', response.data.length);
        setShowApiDomains(true);
      } else {
        console.error('❌ Failed to fetch domains:', response.error);
      }
    } catch (error) {
      console.error('❌ Error fetching domains:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter domains based on search and status
  useEffect(() => {
    let filtered = [...apiDomains];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(item => 
        item.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.client.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(item => item.status === statusFilter);
    }

    setFilteredApiDomains(filtered);
  }, [searchQuery, statusFilter, apiDomains]);

  // Fetch on mount
  useEffect(() => {
    // Load existing domains from localStorage
    const allConfigs = JSON.parse(localStorage.getItem('domainConfigs') || '{}');
    setDomains(Object.keys(allConfigs));
    
    // Fetch API domains
    fetchApiDomains();
  }, []);

  // Refresh when trigger changes
  useEffect(() => {
    if (refreshTrigger > 0) {
      fetchApiDomains();
    }
  }, [refreshTrigger]);

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

  const handleEditClick = (e, item) => {
    e.stopPropagation(); // Prevent card selection
    if (editingDomainUuid === item.uuid) {
      // Close if already editing this domain
      setEditingDomainUuid(null);
    } else {
      // Open edit form for this domain
      setEditingDomainUuid(item.uuid);
      setEditForm({
        domain: item.domain,
        status: item.status,
        client_id: item.client_id
      });
    }
  };

  const handleSaveEdit = async (uuid) => {
    if (!editForm.domain || !editForm.client_id) {
      alert('Please fill all required fields');
      return;
    }

    setSaving(true);
    try {
      const response = await updateLandingPageDetails(uuid, {
        domain: editForm.domain,
        status: editForm.status,
        client_id: parseInt(editForm.client_id)
      });

      if (response.success) {
        console.log('✅ Domain details updated successfully');
        // Refresh the domain list
        await fetchApiDomains();
        setEditingDomainUuid(null);
        alert('Domain details updated successfully!');
      } else {
        console.error('❌ Failed to update domain:', response.error);
        alert(`Failed to update: ${response.error}`);
      }
    } catch (error) {
      console.error('❌ Error updating domain:', error);
      alert('Error updating domain details');
    } finally {
      setSaving(false);
    }
  };

  const handleCancelEdit = (e) => {
    e.stopPropagation();
    setEditingDomainUuid(null);
    setEditForm({ domain: '', status: 'draft', client_id: '' });
  };

  const handleStatusChange = async (e, uuid, newStatus) => {
    e.stopPropagation();
    
    setSaving(true);
    try {
      const response = await updateLandingPageStatus(uuid, newStatus);
      
      if (response.success) {
        toast.success(`Status updated to ${newStatus}`);
        // Refresh the domain list
        await fetchApiDomains();
      } else {
        toast.error(`Failed: ${response.error}`);
      }
    } catch (error) {
      toast.error('Error updating status');
      console.error('Status update error:', error);
    } finally {
      setSaving(false);
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
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

  const getStatusCount = (status) => {
    return apiDomains.filter(item => item.status === status).length;
  };

  return (
    <div className="bg-white border border-gray-200 shadow-lg mb-2">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Domain Management</h2>
              <p className="text-sm text-gray-600">Select or manage your landing page domains</p>
            </div>
          </div>
          <button
            onClick={fetchApiDomains}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition disabled:opacity-50 shadow-sm"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span className="text-sm font-medium">Refresh</span>
          </button>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by domain or client name..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2.5 border rounded-lg transition ${
              showFilters || statusFilter !== 'all'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">Filters</span>
            {statusFilter !== 'all' && (
              <span className="px-2 py-0.5 bg-white text-blue-600 rounded-full text-xs font-bold">
                1
              </span>
            )}
          </button>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-900">Filter by Status</h3>
              {statusFilter !== 'all' && (
                <button
                  onClick={clearFilters}
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear filters
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  statusFilter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All ({apiDomains.length})
              </button>
              <button
                onClick={() => setStatusFilter('published')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  statusFilter === 'published'
                    ? 'bg-green-600 text-white'
                    : 'bg-green-50 text-green-700 hover:bg-green-100'
                }`}
              >
                Published ({getStatusCount('published')})
              </button>
              <button
                onClick={() => setStatusFilter('draft')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  statusFilter === 'draft'
                    ? 'bg-yellow-600 text-white'
                    : 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100'
                }`}
              >
                Draft ({getStatusCount('draft')})
              </button>
              <button
                onClick={() => setStatusFilter('disabled')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  statusFilter === 'disabled'
                    ? 'bg-gray-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Disabled ({getStatusCount('disabled')})
              </button>
            </div>
          </div>
        )}
      </div>

      {/* API Domains Section */}
      <div className="p-6 mb-10">
        {/* <button
          onClick={() => setShowApiDomains(!showApiDomains)}
          className="w-full flex items-center justify-between px-5 py-4  border-2 border-black/60 rounded-xl hover:from-purple-100 hover:via-blue-100 hover:to-indigo-100 transition-all shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <span className="font-bold text-gray-900 text-lg">API Domains</span>
              <p className="text-xs text-gray-600 mt-0.5">
                {filteredApiDomains.length} of {apiDomains.length} domains
                {searchQuery && ` matching "${searchQuery}"`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {(searchQuery || statusFilter !== 'all') && (
              <span className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">
                Filtered
              </span>
            )}
            <span className="text-2xl text-purple-600 font-bold">
              {showApiDomains ? '−' : '+'}
            </span>
          </div>
        </button> */}

        {showApiDomains && (
          <div className="mt-4">
            {loading ? (
              <div className="text-center py-12">
                <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-3 text-blue-600" />
                <p className="text-gray-600 font-medium">Loading domains...</p>
              </div>
            ) : filteredApiDomains.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <Globe className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                <p className="text-gray-600 font-medium">
                  {searchQuery || statusFilter !== 'all' 
                    ? 'No domains match your filters' 
                    : 'No domains found in API'}
                </p>
                {(searchQuery || statusFilter !== 'all') && (
                  <button
                    onClick={clearFilters}
                    className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[600px] overflow-y-auto pr-2">
                {filteredApiDomains.map((item) => (
                  <div key={item.uuid} className="flex flex-col">
                    {/* Domain Card */}
                    <div
                      onClick={() => handleSelectApiDomain(item.domain)}
                      className={`group p-4 border-2 cursor-pointer transition-all hover:shadow-lg ${
                        editingDomainUuid === item.uuid
                          ? 'rounded-t-lg border-blue-500 bg-blue-50'
                          : 'rounded-lg hover:rounded-lg'
                      } ${
                        selectedDomain === item.domain
                          ? 'border-purple-500 bg-purple-50 shadow-md'
                          : 'border-gray-200 hover:border-purple-300 bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-900 truncate group-hover:text-purple-600 transition">
                            {item.domain}
                          </h3>
                          <p className="text-xs text-gray-500 mt-1 truncate">
                            {item.client.name}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => handleEditClick(e, item)}
                            className={`p-1.5 rounded-lg transition ${
                              editingDomainUuid === item.uuid
                                ? 'bg-blue-600 text-white'
                                : 'text-blue-600 hover:bg-blue-50'
                            }`}
                            title="Edit domain details"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <span
                            className={`px-2.5 py-1 text-xs font-bold rounded-full border whitespace-nowrap ${getStatusColor(
                              item.status
                            )}`}
                          >
                            {item.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>ID: {item.id}</span>
                        <span className="text-purple-600 font-medium group-hover:underline">
                          Click to load →
                        </span>
                      </div>
                      
                      {/* Quick Status Change Buttons */}
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-xs font-semibold text-gray-700 mb-2">Quick Status Change:</p>
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => handleStatusChange(e, item.uuid, 'published')}
                            disabled={item.status === 'published' || saving}
                            className={`flex-1 px-2 py-1 text-xs font-medium rounded transition ${
                              item.status === 'published'
                                ? 'bg-green-100 text-green-800 cursor-default'
                                : 'bg-white border border-green-300 text-green-700 hover:bg-green-50'
                            } disabled:opacity-50`}
                          >
                            Published
                          </button>
                          <button
                            onClick={(e) => handleStatusChange(e, item.uuid, 'draft')}
                            disabled={item.status === 'draft' || saving}
                            className={`flex-1 px-2 py-1 text-xs font-medium rounded transition ${
                              item.status === 'draft'
                                ? 'bg-yellow-100 text-yellow-800 cursor-default'
                                : 'bg-white border border-yellow-300 text-yellow-700 hover:bg-yellow-50'
                            } disabled:opacity-50`}
                          >
                            Draft
                          </button>
                          <button
                            onClick={(e) => handleStatusChange(e, item.uuid, 'disabled')}
                            disabled={item.status === 'disabled' || saving}
                            className={`flex-1 px-2 py-1 text-xs font-medium rounded transition ${
                              item.status === 'disabled'
                                ? 'bg-gray-100 text-gray-800 cursor-default'
                                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                            } disabled:opacity-50`}
                          >
                            Disabled
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Inline Edit Form */}
                    {editingDomainUuid === item.uuid && (
                      <div className="border-2 border-t-0 border-blue-500 bg-blue-50 rounded-b-lg p-4 space-y-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Edit2 className="w-4 h-4 text-blue-600" />
                          <h4 className="text-sm font-bold text-gray-900">Edit Domain Details</h4>
                        </div>

                        {/* Domain Name */}
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Domain Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={editForm.domain}
                            onChange={(e) => setEditForm({ ...editForm, domain: e.target.value })}
                            onClick={(e) => e.stopPropagation()}
                            placeholder="example.com"
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                          />
                        </div>

                        {/* Status */}
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Status <span className="text-red-500">*</span>
                          </label>
                          <select
                            value={editForm.status}
                            onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                          >
                            <option value="published">Published</option>
                            <option value="draft">Draft</option>
                            <option value="disabled">Disabled</option>
                          </select>
                        </div>

                        {/* Client ID */}
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Client ID <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="number"
                            value={editForm.client_id}
                            onChange={(e) => setEditForm({ ...editForm, client_id: e.target.value })}
                            onClick={(e) => e.stopPropagation()}
                            placeholder="10"
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                          />
                        </div>

                        {/* Info */}
                        <div className="p-2 bg-blue-100 border border-blue-200 rounded text-xs text-blue-800">
                          <p><span className="font-semibold">UUID:</span> {item.uuid}</p>
                          <p className="mt-0.5"><span className="font-semibold">Current Client:</span> {item.client.name}</p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 pt-2">
                          <button
                            onClick={handleCancelEdit}
                            disabled={saving}
                            className="flex-1 px-3 py-2 text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium disabled:opacity-50"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSaveEdit(item.uuid);
                            }}
                            disabled={saving || !editForm.domain || !editForm.client_id}
                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {saving ? (
                              <>
                                <RefreshCw className="w-3 h-3 animate-spin" />
                                Saving...
                              </>
                            ) : (
                              <>
                                <Save className="w-3 h-3" />
                                Save
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Local Domains Section */}
      {/* <div className="p-6 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-gray-900">Local Domains</h3>
            <p className="text-xs text-gray-600 mt-0.5">{domains.length} configured locally</p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Add Custom
          </button>
        </div>

        {showAddForm && (
          <div className="mb-4 p-4 bg-white rounded-lg border-2 border-blue-200 shadow-sm">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Custom Domain Name
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newDomain}
                onChange={(e) => setNewDomain(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddDomain()}
                placeholder="example.com"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleAddDomain}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
              >
                Add
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {domains.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {domains.map((domain) => (
              <div
                key={domain}
                className={`p-4 border-2 rounded-lg transition-all ${
                  selectedDomain === domain
                    ? 'border-blue-500 bg-blue-50 shadow-md'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div
                    onClick={() => {
                      onDomainChange(domain);
                      onLoad(domain);
                    }}
                    className="flex-1 cursor-pointer"
                  >
                    <h3 className="font-bold text-gray-900 truncate">{domain}</h3>
                    <p className="text-xs text-gray-500 mt-1">Click to edit</p>
                  </div>
                  <button
                    onClick={() => handleDeleteDomain(domain)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-white rounded-lg border-2 border-dashed border-gray-300">
            <p className="text-sm text-gray-500">
              No local domains. Use API domains above or add custom domain.
            </p>
          </div>
        )}
      </div> */}
    </div>
  );
};

export default DomainSelector;
