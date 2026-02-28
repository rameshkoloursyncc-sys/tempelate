import { useState } from 'react';
import { Plus, Save, X, UserPlus } from 'lucide-react';
import { createClient } from '../../api/endpoints';
import toast from 'react-hot-toast';

const ClientCreator = ({ onClientCreated }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    domain: ''
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.domain) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSaving(true);
    try {
      const response = await createClient(formData);

      if (response.success) {
        toast.success(`✅ Client created: ${response.data.client.name}`);
        console.log('Created landing page UUID:', response.data.landing_page.uuid);
        
        // Reset form
        setFormData({ name: '', email: '', company: '', domain: '' });
        setShowForm(false);
        
        // Notify parent to refresh list
        if (onClientCreated) {
          onClientCreated(response.data);
        }
      } else {
        toast.error(`Failed: ${response.error}`);
      }
    } catch (error) {
      toast.error('Error creating client');
      console.error('Client creation error:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg shadow-sm mb-6">
      {/* Header Button */}
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="w-full p-4 flex items-center justify-center gap-3 hover:bg-gray-50 transition"
        >
          <div className="p-2 bg-green-600 rounded-lg">
            <Plus className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-gray-900">Add New Client & Domain</span>
        </button>
      ) : (
        <div className="p-6">
          {/* Form Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-600 rounded-lg">
                <UserPlus className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Create New Client</h3>
                <p className="text-xs text-gray-600">Add a new client and their landing page</p>
              </div>
            </div>
            <button
              onClick={() => setShowForm(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Client Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Client Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Acme Corp"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  disabled={saving}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="admin@acme.com"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  disabled={saving}
                />
              </div>

              {/* Company */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Acme Corporation"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  disabled={saving}
                />
              </div>

              {/* Domain */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Domain <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.domain}
                  onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                  placeholder="acme.yoursaas.com"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  disabled={saving}
                />
              </div>
            </div>

            {/* Info Box */}
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-xs text-green-800">
                ℹ️ This will create a new client and automatically generate a landing page with a unique UUID
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                disabled={saving}
                className="flex-1 px-4 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving || !formData.name || !formData.email || !formData.domain}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Create Client
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ClientCreator;
