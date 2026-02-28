import { useState } from 'react';
import { Send, X, Mail } from 'lucide-react';
import { inviteUser } from '../../api/endpoints';
import toast from 'react-hot-toast';

const UserInvite = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error('Please enter an email address');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setSending(true);
    try {
      const response = await inviteUser(email, 'editor');

      if (response.success) {
        toast.success(`✅ Invitation sent to ${email}`);
        console.log('Invitation response:', response.data);
        
        // Reset form
        setEmail('');
        onClose();
      } else {
        toast.error(`Failed: ${response.error}`);
      }
    } catch (error) {
      toast.error('Error sending invitation');
      console.error('Invitation error:', error);
    } finally {
      setSending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
        {/* Modal Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Invite User</h3>
                <p className="text-xs text-gray-600 mt-0.5">Send an invitation as Editor</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white rounded-lg transition"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              disabled={sending}
              autoFocus
            />
          </div>

          {/* Role Info */}
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-blue-800">
              <span className="font-semibold">Role:</span> Editor
            </p>
            <p className="text-xs text-blue-800 mt-1">
              ℹ️ User will receive an invitation email with setup instructions
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={sending}
              className="flex-1 px-4 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={sending || !email}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Invitation
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserInvite;
