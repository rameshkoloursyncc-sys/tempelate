import apiClient from "./apiClient";    

/**
 * API Endpoints
 */

/**
 * Login user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} Login response with token and user
 */
export const login = async (email, password) => {
  if (!email || !password) {
    return { success: false, error: 'Email and password are required' };
  }

  const response = await apiClient.post('/login', { email, password });
  return response;
};

/**
 * Invite user
 * @param {string} email - User email to invite
 * @param {string} role - User role (default: 'editor')
 * @returns {Promise<Object>} Invitation response
 */
export const inviteUser = async (email, role = 'editor') => {
  if (!email) {
    return { success: false, error: 'Email is required' };
  }

  const response = await apiClient.post('/invite', { email, role });
  return response;
};

/**
 * Create new client and landing page
 * @param {Object} clientData - Client data (name, email, company, domain)
 * @returns {Promise<Object>} Created client and landing page
 */
export const createClient = async (clientData) => {
  if (!clientData.name || !clientData.email || !clientData.domain) {
    return { success: false, error: 'Name, email, and domain are required' };
  }

  const response = await apiClient.post('/clients', clientData);
  return response;
};

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
 * Update landing page content by UUID
 * @param {string} uuid - Landing page UUID
 * @param {Object} content - Content object to update
 * @returns {Promise<Object>} Update response
 */
export const updateLandingPageContent = async (uuid, content) => {
  if (!uuid) {
    return { success: false, error: 'UUID is required' };
  }

  const response = await apiClient.post(`/landing-page/${uuid}/content`, { content });
  return response;
};

/**
 * Update landing page details (domain, status, client)
 * @param {string} uuid - Landing page UUID
 * @param {Object} data - Data to update (domain, status, client_id)
 * @returns {Promise<Object>} Update response
 */
export const updateLandingPageDetails = async (uuid, data) => {
  if (!uuid) {
    return { success: false, error: 'UUID is required' };
  }

  const response = await apiClient.post(`/landing-page/${uuid}`, data);
  return response;
};

/**
 * Update landing page status
 * @param {string} uuid - Landing page UUID
 * @param {string} status - Status (draft, disabled, published)
 * @returns {Promise<Object>} Update response
 */
export const updateLandingPageStatus = async (uuid, status) => {
  if (!uuid) {
    return { success: false, error: 'UUID is required' };
  }

  if (!['draft', 'disabled', 'published'].includes(status)) {
    return { success: false, error: 'Invalid status. Must be draft, disabled, or published' };
  }

  const response = await apiClient.patch(`/landing-pages/${uuid}/status`, { status });
  return response;
};

/**
 * Export all endpoints
 */
export const endpoints = {
  login,
  inviteUser,
  createClient,
  getLandingPageByDomain,
  getAllLandingPages,
  updateLandingPageContent,
  updateLandingPageDetails,
  updateLandingPageStatus,
};

export default endpoints;
