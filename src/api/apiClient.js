import { header } from "framer-motion/client";

const API_BASE_URL = 'https://landing-page-api.busyparrot.com/public/api';
const API_TIMEOUT = '10000';

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

export const apiClient = {


    get: async (endpoint) => {
        try {
            const url = `${API_BASE_URL}${endpoint}`;
            console.log(`🌐 Fetching from API: ${url}`);

            const response = await fetchContent(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });
 if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

   const data = await response.json();
      console.log('✅ API response received');
      return { success: true, data };





        } catch (e) {
            console.error('❌ API Error:', error.message);
            return { success: false, error: error.message };
        }

    }






}

export default apiClient;