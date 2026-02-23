import apiClient from "./apiClient";    

/**
 * API Endpoints
 */

/**
 * Get landing page configuration by domain
 * @param {string} domain - Domain name (e.g., "murray.net")
 * @returns {Promise<Object>} Landing page configuration
 */
export const getLandingPageByDomain = async (domain) => {
  if (!domain) {
    return { success: false, error: 'Domain is required' };
  }

  const response = await apiClient.get(`/landing-page/${domain}`);
  return response;
};

/**
 * Get all landing pages (domain list)
 * @returns {Promise<Object>} List of all landing pages
 */
export const getAllLandingPages = async () => {
  const response = await apiClient.get('/landing-pages');
  return response;
};

/**
 * Export all endpoints
 */
export const endpoints = {
  getLandingPageByDomain,
  getAllLandingPages,
};

export default endpoints;
