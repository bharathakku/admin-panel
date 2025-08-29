// API service functions for Settings page
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Helper function for API calls
async function apiCall(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`, // Adjust as needed
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`API call failed: ${endpoint}`, error);
    throw error;
  }
}

// General Settings API
export const generalSettings = {
  get: () => apiCall('/settings/general'),
  update: (data) => apiCall('/settings/general', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
};

// Account Settings API
export const accountSettings = {
  get: () => apiCall('/settings/account'),
  update: (data) => apiCall('/settings/account', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  changePassword: (data) => apiCall('/settings/account/password', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
};

// Pricing & Promotions API
export const pricingAPI = {
  getGlobalPricing: () => apiCall('/settings/pricing/global'),
  updateGlobalPricing: (data) => apiCall('/settings/pricing/global', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  
  getRegionalRules: () => apiCall('/settings/pricing/regional'),
  createRegionalRule: (data) => apiCall('/settings/pricing/regional', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  updateRegionalRule: (id, data) => apiCall(`/settings/pricing/regional/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  deleteRegionalRule: (id) => apiCall(`/settings/pricing/regional/${id}`, {
    method: 'DELETE',
  }),
  
  getPromotions: () => apiCall('/settings/promotions'),
  createPromotion: (data) => apiCall('/settings/promotions', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  updatePromotion: (id, data) => apiCall(`/settings/promotions/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  deletePromotion: (id) => apiCall(`/settings/promotions/${id}`, {
    method: 'DELETE',
  }),
};

// Roles & Permissions API
export const rolesAPI = {
  getRoles: () => apiCall('/settings/roles'),
  getPermissions: () => apiCall('/settings/permissions'),
  updateRolePermissions: (data) => apiCall('/settings/roles/permissions', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
};

// Zones & Coverage API
export const zonesAPI = {
  getZones: () => apiCall('/settings/zones'),
  createZone: (data) => apiCall('/settings/zones', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  updateZone: (id, data) => apiCall(`/settings/zones/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  deleteZone: (id) => apiCall(`/settings/zones/${id}`, {
    method: 'DELETE',
  }),
  mergeZones: (zoneIds) => apiCall('/settings/zones/merge', {
    method: 'POST',
    body: JSON.stringify({ zoneIds }),
  }),
  
  getZoneOverrides: () => apiCall('/settings/zones/overrides'),
  createZoneOverride: (data) => apiCall('/settings/zones/overrides', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  updateZoneOverride: (id, data) => apiCall(`/settings/zones/overrides/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  deleteZoneOverride: (id) => apiCall(`/settings/zones/overrides/${id}`, {
    method: 'DELETE',
  }),
};

// Notifications API
export const notificationsAPI = {
  getSettings: () => apiCall('/settings/notifications'),
  updateSettings: (data) => apiCall('/settings/notifications', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
};

// Vehicle Management API
export const vehiclesAPI = {
  getVehicleTypes: () => apiCall('/settings/vehicles'),
  createVehicleType: (data) => apiCall('/settings/vehicles', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  updateVehicleType: (id, data) => apiCall(`/settings/vehicles/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  deleteVehicleType: (id) => apiCall(`/settings/vehicles/${id}`, {
    method: 'DELETE',
  }),
  
  getDefaults: () => apiCall('/settings/vehicles/defaults'),
  updateDefaults: (data) => apiCall('/settings/vehicles/defaults', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
};

// Payment Settings API
export const paymentAPI = {
  getPaymentMethods: () => apiCall('/settings/payments/methods'),
  updatePaymentMethods: (data) => apiCall('/settings/payments/methods', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  
  getPaymentSettings: () => apiCall('/settings/payments/settings'),
  updatePaymentSettings: (data) => apiCall('/settings/payments/settings', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
};

// Reports API
export const reportsAPI = {
  getReports: () => apiCall('/settings/reports'),
  generateReport: (reportType) => apiCall('/settings/reports/generate', {
    method: 'POST',
    body: JSON.stringify({ reportType }),
  }),
  downloadReport: (reportId) => apiCall(`/settings/reports/${reportId}/download`),
  
  getAutomatedReports: () => apiCall('/settings/reports/automated'),
  updateAutomatedReports: (data) => apiCall('/settings/reports/automated', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
};

// Security Settings API
export const securityAPI = {
  getSettings: () => apiCall('/settings/security'),
  updatePassword: (data) => apiCall('/settings/security/password', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  toggle2FA: (enabled) => apiCall('/settings/security/2fa', {
    method: 'PUT',
    body: JSON.stringify({ enabled }),
  }),
};

// Delivery Settings API
export const deliveryAPI = {
  getSettings: () => apiCall('/settings/delivery'),
  updateSettings: (data) => apiCall('/settings/delivery', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
};
