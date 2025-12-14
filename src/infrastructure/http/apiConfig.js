/**
 * Configuración centralizada de la API
 * Aquí defines URLs, timeouts, etc.
 */

// URL base de tu API (cuando tengas backend)
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Endpoints específicos
export const API_ENDPOINTS = {
  // Productos
  products: {
    getAll: '/products',
    getById: (id) => `/products/${id}`,
    getByCategory: (category) => `/products?category=${category}`,
    search: (query) => `/products/search?q=${query}`,
    popular: '/products/popular',
  },
  
  // Usuarios y Auth
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    me: '/auth/me',
  },
  
  // Categorías
  categories: {
    getAll: '/categories',
    getById: (id) => `/categories/${id}`,
  },
  
  // Pedidos
  orders: {
    create: '/orders',
    getAll: '/orders',
    getById: (id) => `/orders/${id}`,
  }
};

// Configuración de timeouts
export const HTTP_TIMEOUT = 10000; // 10 segundos

// Headers por defecto
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};