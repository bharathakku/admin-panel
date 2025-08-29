// Backend integration helpers for easy API connection

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';

// API response wrapper
class ApiResponse {
  constructor(data, success = true, message = '', errors = []) {
    this.data = data;
    this.success = success;
    this.message = message;
    this.errors = errors;
    this.timestamp = new Date().toISOString();
  }

  static success(data, message = 'Success') {
    return new ApiResponse(data, true, message);
  }

  static error(message = 'Error', errors = [], data = null) {
    return new ApiResponse(data, false, message, errors);
  }
}

// HTTP client with error handling
class HttpClient {
  constructor(baseURL = API_BASE_URL) {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  setAuthToken(token) {
    this.defaultHeaders.Authorization = `Bearer ${token}`;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: { ...this.defaultHeaders, ...options.headers },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  async get(endpoint, params = {}) {
    const queryString = Object.keys(params).length 
      ? '?' + new URLSearchParams(params).toString()
      : '';
    
    return this.request(endpoint + queryString, {
      method: 'GET',
    });
  }

  async post(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async patch(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE',
    });
  }
}

// Create default client instance
export const apiClient = new HttpClient();

// Generic CRUD operations
export class CrudService {
  constructor(resource) {
    this.resource = resource;
    this.client = apiClient;
  }

  // Get all items with optional filtering and pagination
  async getAll(params = {}) {
    try {
      const response = await this.client.get(`/${this.resource}`, params);
      return ApiResponse.success(response.data, 'Data retrieved successfully');
    } catch (error) {
      return ApiResponse.error(`Failed to fetch ${this.resource}`, [error.message]);
    }
  }

  // Get single item by ID
  async getById(id) {
    try {
      const response = await this.client.get(`/${this.resource}/${id}`);
      return ApiResponse.success(response.data, 'Item retrieved successfully');
    } catch (error) {
      return ApiResponse.error(`Failed to fetch ${this.resource} with ID ${id}`, [error.message]);
    }
  }

  // Create new item
  async create(data) {
    try {
      const response = await this.client.post(`/${this.resource}`, data);
      return ApiResponse.success(response.data, 'Item created successfully');
    } catch (error) {
      return ApiResponse.error(`Failed to create ${this.resource}`, [error.message]);
    }
  }

  // Update existing item
  async update(id, data) {
    try {
      const response = await this.client.put(`/${this.resource}/${id}`, data);
      return ApiResponse.success(response.data, 'Item updated successfully');
    } catch (error) {
      return ApiResponse.error(`Failed to update ${this.resource} with ID ${id}`, [error.message]);
    }
  }

  // Partially update item
  async patch(id, data) {
    try {
      const response = await this.client.patch(`/${this.resource}/${id}`, data);
      return ApiResponse.success(response.data, 'Item updated successfully');
    } catch (error) {
      return ApiResponse.error(`Failed to update ${this.resource} with ID ${id}`, [error.message]);
    }
  }

  // Delete item
  async delete(id) {
    try {
      await this.client.delete(`/${this.resource}/${id}`);
      return ApiResponse.success(null, 'Item deleted successfully');
    } catch (error) {
      return ApiResponse.error(`Failed to delete ${this.resource} with ID ${id}`, [error.message]);
    }
  }
}

// Service instances for each resource
export const ordersService = new CrudService('orders');
export const customersService = new CrudService('customers');
export const driversService = new CrudService('drivers');
export const partnersService = new CrudService('partners');
export const paymentsService = new CrudService('payments');
export const zonesService = new CrudService('zones');
export const vehiclesService = new CrudService('vehicles');
export const reviewsService = new CrudService('reviews');
export const supportService = new CrudService('support');

// Specialized services with custom methods
export class OrdersService extends CrudService {
  constructor() {
    super('orders');
  }

  async updateStatus(orderId, status) {
    return this.patch(orderId, { status });
  }

  async assignDriver(orderId, driverId) {
    try {
      const response = await this.client.post(`/orders/${orderId}/assign`, { driverId });
      return ApiResponse.success(response.data, 'Driver assigned successfully');
    } catch (error) {
      return ApiResponse.error('Failed to assign driver', [error.message]);
    }
  }

  async getOrderTracking(orderId) {
    try {
      const response = await this.client.get(`/orders/${orderId}/tracking`);
      return ApiResponse.success(response.data, 'Tracking data retrieved');
    } catch (error) {
      return ApiResponse.error('Failed to get tracking data', [error.message]);
    }
  }

  async cancelOrder(orderId, reason) {
    try {
      const response = await this.client.post(`/orders/${orderId}/cancel`, { reason });
      return ApiResponse.success(response.data, 'Order cancelled successfully');
    } catch (error) {
      return ApiResponse.error('Failed to cancel order', [error.message]);
    }
  }
}

export class DriversService extends CrudService {
  constructor() {
    super('drivers');
  }

  async updateLocation(driverId, location) {
    return this.patch(driverId, { location });
  }

  async toggleOnlineStatus(driverId) {
    try {
      const response = await this.client.post(`/drivers/${driverId}/toggle-status`);
      return ApiResponse.success(response.data, 'Status updated successfully');
    } catch (error) {
      return ApiResponse.error('Failed to update status', [error.message]);
    }
  }

  async getEarnings(driverId, params = {}) {
    try {
      const response = await this.client.get(`/drivers/${driverId}/earnings`, params);
      return ApiResponse.success(response.data, 'Earnings retrieved successfully');
    } catch (error) {
      return ApiResponse.error('Failed to get earnings', [error.message]);
    }
  }
}

export class AnalyticsService {
  constructor() {
    this.client = apiClient;
  }

  async getDashboardStats(params = {}) {
    try {
      const response = await this.client.get('/analytics/dashboard', params);
      return ApiResponse.success(response.data, 'Analytics retrieved successfully');
    } catch (error) {
      return ApiResponse.error('Failed to get analytics', [error.message]);
    }
  }

  async getRevenueReport(params = {}) {
    try {
      const response = await this.client.get('/analytics/revenue', params);
      return ApiResponse.success(response.data, 'Revenue report retrieved');
    } catch (error) {
      return ApiResponse.error('Failed to get revenue report', [error.message]);
    }
  }

  async getPerformanceMetrics(params = {}) {
    try {
      const response = await this.client.get('/analytics/performance', params);
      return ApiResponse.success(response.data, 'Performance metrics retrieved');
    } catch (error) {
      return ApiResponse.error('Failed to get performance metrics', [error.message]);
    }
  }
}

export class SettingsService {
  constructor() {
    this.client = apiClient;
  }

  async getSettings(category = 'all') {
    try {
      const response = await this.client.get(`/settings/${category}`);
      return ApiResponse.success(response.data, 'Settings retrieved successfully');
    } catch (error) {
      return ApiResponse.error('Failed to get settings', [error.message]);
    }
  }

  async updateSettings(category, settings) {
    try {
      const response = await this.client.put(`/settings/${category}`, settings);
      return ApiResponse.success(response.data, 'Settings updated successfully');
    } catch (error) {
      return ApiResponse.error('Failed to update settings', [error.message]);
    }
  }

  async updateNotificationSettings(settings) {
    return this.updateSettings('notifications', settings);
  }

  async updateRolePermissions(permissions) {
    return this.updateSettings('permissions', permissions);
  }

  async testNotification(type, recipient) {
    try {
      const response = await this.client.post('/settings/test-notification', { type, recipient });
      return ApiResponse.success(response.data, 'Test notification sent');
    } catch (error) {
      return ApiResponse.error('Failed to send test notification', [error.message]);
    }
  }
}

// Service instances
export const ordersServiceAPI = new OrdersService();
export const driversServiceAPI = new DriversService();
export const analyticsService = new AnalyticsService();
export const settingsService = new SettingsService();

// React hooks for API calls
export const useApi = () => {
  return {
    // Generic CRUD services
    orders: ordersServiceAPI,
    customers: customersService,
    drivers: driversServiceAPI,
    partners: partnersService,
    payments: paymentsService,
    zones: zonesService,
    vehicles: vehiclesService,
    reviews: reviewsService,
    support: supportService,
    
    // Specialized services
    analytics: analyticsService,
    settings: settingsService,
  };
};

// Error handling utilities
export const handleApiError = (error, fallbackMessage = 'An error occurred') => {
  if (error?.errors?.length > 0) {
    return error.errors.join(', ');
  }
  return error?.message || fallbackMessage;
};

// Data transformation utilities
export const transformListResponse = (response, defaultValue = []) => {
  if (!response?.success) return defaultValue;
  return Array.isArray(response.data) ? response.data : defaultValue;
};

export const transformItemResponse = (response, defaultValue = null) => {
  if (!response?.success) return defaultValue;
  return response.data || defaultValue;
};

// Pagination utilities
export const createPaginationParams = (page = 1, limit = 10, search = '', filters = {}) => {
  return {
    page,
    limit,
    search,
    ...filters
  };
};

// Mock service for development (when backend is not available)
export class MockService {
  constructor(mockData) {
    this.mockData = mockData;
  }

  async getAll(params = {}) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    let data = [...this.mockData];
    
    // Apply search
    if (params.search) {
      data = data.filter(item => 
        Object.values(item).some(value => 
          String(value).toLowerCase().includes(params.search.toLowerCase())
        )
      );
    }
    
    // Apply pagination
    const page = parseInt(params.page) || 1;
    const limit = parseInt(params.limit) || 10;
    const start = (page - 1) * limit;
    const end = start + limit;
    
    const paginatedData = data.slice(start, end);
    
    return ApiResponse.success({
      items: paginatedData,
      total: data.length,
      page,
      limit,
      pages: Math.ceil(data.length / limit)
    });
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const item = this.mockData.find(item => item.id == id);
    
    if (!item) {
      return ApiResponse.error('Item not found');
    }
    
    return ApiResponse.success(item);
  }

  async create(data) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newItem = {
      id: Math.max(...this.mockData.map(i => parseInt(i.id) || 0)) + 1,
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    this.mockData.push(newItem);
    return ApiResponse.success(newItem);
  }

  async update(id, data) {
    await new Promise(resolve => setTimeout(resolve, 350));
    const index = this.mockData.findIndex(item => item.id == id);
    
    if (index === -1) {
      return ApiResponse.error('Item not found');
    }
    
    this.mockData[index] = {
      ...this.mockData[index],
      ...data,
      updatedAt: new Date().toISOString()
    };
    
    return ApiResponse.success(this.mockData[index]);
  }

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 250));
    const index = this.mockData.findIndex(item => item.id == id);
    
    if (index === -1) {
      return ApiResponse.error('Item not found');
    }
    
    this.mockData.splice(index, 1);
    return ApiResponse.success(null);
  }
}

// Feature flags for development
export const isDevelopment = process.env.NODE_ENV === 'development';
export const useMockAPI = process.env.NEXT_PUBLIC_USE_MOCK_API === 'true' || isDevelopment;

// Export everything for easy access
export default {
  ApiResponse,
  HttpClient,
  CrudService,
  apiClient,
  useApi,
  handleApiError,
  transformListResponse,
  transformItemResponse,
  createPaginationParams,
  MockService,
  isDevelopment,
  useMockAPI
};
