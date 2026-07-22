// URL base del backend 
export const API_BASE_URL = "http://localhost:5000/api";

/**
 * Función helper para peticiones HTTP
 */
export const fetchAPI = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`[API Error] en ${endpoint}:`, error.message);
    throw error;
  }
};