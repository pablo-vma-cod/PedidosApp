import axios from 'axios';
import { API_BASE_URL, HTTP_TIMEOUT, DEFAULT_HEADERS } from './apiConfig';

/**
 * Cliente HTTP configurado con axios
 * Maneja: interceptores, tokens, errores globales
 */

// Crear instancia de axios
const httpClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: HTTP_TIMEOUT,
  headers: DEFAULT_HEADERS,
});

// Interceptor de REQUEST - Añadir token si existe
httpClient.interceptors.request.use(
  (config) => {
    // Obtener token del localStorage
    const token = localStorage.getItem('authToken');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log para debugging (quitar en producción)
    console.log(`📤 ${config.method.toUpperCase()} ${config.url}`);
    
    return config;
  },
  (error) => {
    console.error('❌ Error en request:', error);
    return Promise.reject(error);
  }
);

// Interceptor de RESPONSE - Manejar errores globalmente
httpClient.interceptors.response.use(
  (response) => {
    // Log para debugging (quitar en producción)
    console.log(`📥 ${response.config.method.toUpperCase()} ${response.config.url} - ${response.status}`);
    
    return response;
  },
  (error) => {
    // Manejar errores HTTP comunes
    if (error.response) {
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          // No autorizado - limpiar token y redirigir a login
          console.error('❌ 401 - No autorizado');
          localStorage.removeItem('authToken');
          // Opcionalmente puedes redirigir: window.location.href = '/login';
          break;
          
        case 403:
          console.error('❌ 403 - Prohibido');
          break;
          
        case 404:
          console.error('❌ 404 - No encontrado');
          break;
          
        case 500:
          console.error('❌ 500 - Error del servidor');
          break;
          
        default:
          console.error(`❌ ${status} - Error:`, data);
      }
      
      // Retornar el error con mensaje del servidor o genérico
      return Promise.reject({
        message: data?.message || 'Ocurrió un error en la petición',
        status,
        data
      });
    }
    
    // Error de red (sin respuesta del servidor)
    if (error.request) {
      console.error('❌ Error de red - Sin respuesta del servidor');
      return Promise.reject({
        message: 'No se pudo conectar con el servidor. Verifica tu conexión.',
        status: null
      });
    }
    
    // Error al configurar la petición
    console.error('❌ Error al configurar petición:', error.message);
    return Promise.reject({
      message: 'Error al realizar la petición',
      status: null
    });
  }
);

// Funciones helper para requests comunes
export const httpGet = (url, config = {}) => {
  return httpClient.get(url, config);
};

export const httpPost = (url, data, config = {}) => {
  return httpClient.post(url, data, config);
};

export const httpPut = (url, data, config = {}) => {
  return httpClient.put(url, data, config);
};

export const httpPatch = (url, data, config = {}) => {
  return httpClient.patch(url, data, config);
};

export const httpDelete = (url, config = {}) => {
  return httpClient.delete(url, config);
};

// Exportar instancia principal
export default httpClient;