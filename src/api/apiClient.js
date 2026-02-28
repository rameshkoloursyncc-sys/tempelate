import { header } from "framer-motion/client";

const API_BASE_URL = 'https://landing-page-api.busyparrot.com/public/api';
const API_TIMEOUT = '10000';
const TOKEN_KEY = 'auth_token';

// Get token from localStorage
const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

// Save token to localStorage
export const saveToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

// Remove token from localStorage
export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!getToken();
};

const fetchContent = async (url, options = {}, timeout = API_TIMEOUT) => {
    const controller = new AbortController();

    try {
        const response = await fetch(url, {
            ...options,
        });
        return response;
    } catch (e) {
        console.log('error', e);
    }
}

// Get headers with auth token
const getHeaders = () => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
  
  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

export const apiClient = {
  get: async (endpoint) => {
    try {
      const url = `${API_BASE_URL}${endpoint}`;
      console.log(`🌐 Fetching from API: ${url}`);

      const response = await fetchContent(url, {
        method: 'GET',
        headers: getHeaders()
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('✅ API response received');
      return { success: true, data };
    } catch (error) {
      console.error('❌ API Error:', error.message);
      return { success: false, error: error.message };
    }
  },

  put: async (endpoint, body) => {
    try {
      const url = `${API_BASE_URL}${endpoint}`;
      console.log(`🌐 PUT request to: ${url}`);

      const response = await fetchContent(url, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('✅ PUT request successful');
      return { success: true, data };
    } catch (error) {
      console.error('❌ API Error:', error.message);
      return { success: false, error: error.message };
    }
  },

  post: async (endpoint, body) => {
    try {
      const url = `${API_BASE_URL}${endpoint}`;
      console.log(`🌐 POST request to: ${url}`);

      const response = await fetchContent(url, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('✅ POST request successful', data);
      return { success: true, data };
    } catch (error) {
      console.error('❌ API Error:', error.message);
      return { success: false, error: error.message };
    }
  },

  patch: async (endpoint, body) => {
    try {
      const url = `${API_BASE_URL}${endpoint}`;
      console.log(`🌐 PATCH request to: ${url}`);

      const response = await fetchContent(url, {
        method: 'PATCH',
        headers: getHeaders(),
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('✅ PATCH request successful', data);
      return { success: true, data };
    } catch (error) {
      console.error('❌ API Error:', error.message);
      return { success: false, error: error.message };
    }
  }
}

export default apiClient;