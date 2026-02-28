import { Toaster } from 'react-hot-toast';
import { Save, Download, Eye, Settings, Cloud, LogOut, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { removeToken } from '../../api/apiClient';
import toast from 'react-hot-toast';
import { useState } from 'react';
import UserInvite from './UserInvite';

const AdminLayout = ({ children, onSave, onSaveToApi, onExport, onPreview, selectedDomain, selectedUuid, hasChanges, saving }) => {
  const navigate = useNavigate();
  const [showInviteModal, setShowInviteModal] = useState(false);

  const handleLogout = () => {
    removeToken();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Toaster position="top-right" />
      
      {/* User Invite Modal */}
      <UserInvite isOpen={showInviteModal} onClose={() => setShowInviteModal(false)} />
      
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo & Title */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Settings className="w-8 h-8 text-blue-600" />
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
                  {selectedDomain && (
                    <p className="text-xs text-gray-500">
                      Editing: {selectedDomain}
                      {selectedUuid && <span className="ml-2 text-green-600">• API Connected</span>}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              {hasChanges && (
                <span className="text-xs text-orange-600 font-medium">
                  • Unsaved changes
                </span>
              )}
              
              <button
                onClick={() => setShowInviteModal(true)}
                className="inline-flex items-center px-4 py-2 border border-blue-300 rounded-lg text-sm font-medium text-blue-600 bg-white hover:bg-blue-50 transition"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Invite User
              </button>

              <button
                onClick={onPreview}
                disabled={!selectedDomain}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </button>

              <button
                onClick={onExport}
                disabled={!selectedDomain}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>

              {/* <button
                onClick={onSave}
                disabled={!selectedDomain}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Local
              </button> */}

              {selectedUuid && (
                <button
                  onClick={onSaveToApi}
                  disabled={!selectedDomain || saving}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition"
                >
                  <Cloud className={`w-4 h-4 mr-2 ${saving ? 'animate-pulse' : ''}`} />
                  {saving ? 'Saving...' : 'Save Data'}
                </button>
              )}

              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-red-300 rounded-lg text-sm font-medium text-red-600 bg-white hover:bg-red-50 transition"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
