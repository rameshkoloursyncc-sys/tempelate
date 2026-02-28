import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock } from 'lucide-react';
import { login } from '../api/endpoints';
import { saveToken } from '../api/apiClient';
import toast from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await login(formData.email, formData.password);
      
      if (response.success && response.data.token) {
        // Save token
        saveToken(response.data.token);
        
        // Show success message
        toast.success(`Welcome back, ${response.data.user.name}!`);
        
        // Redirect to admin panel
        navigate('/admin');
      } else {
        toast.error(response.error || 'Login failed');
      }
    } catch (error) {
      toast.error('An error occurred during login');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="p-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-white/20 rounded-full">
                <LogIn className="w-8 h-8" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-center">Welcome Back</h1>
            <p className="text-center text-blue-100 mt-2">Sign in to manage your landing pages</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Footer
          <div className="px-8 pb-8 text-center text-sm text-gray-600">
            <p>Don't have an account? Contact your administrator.</p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
