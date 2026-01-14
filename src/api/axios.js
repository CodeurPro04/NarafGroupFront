import axios from 'axios';

// URL de base de ton API Laravel
const BASE_URL = 'http://localhost:8000';

// Instance axios pour l'API
const api = axios.create({
  baseURL: `${BASE_URL}/api/v1`, 
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true, // Important pour les cookies CSRF
});

// Intercepteur pour ajouter le token et le CSRF aux requÃªtes
api.interceptors.request.use(
  (config) => {
    // Ajouter le token d'authentification
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Ajouter le token CSRF depuis les cookies
    const csrfToken = getCsrfTokenFromCookie();
    if (csrfToken) {
      config.headers['X-XSRF-TOKEN'] = csrfToken;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gÃ©rer les rÃ©ponses et erreurs
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Si token expirÃ© ou invalide (401)
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      
      // Ã‰viter les redirections infinies
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    
    // Si erreur CSRF (419)
    if (error.response?.status === 419) {
      console.error('Token CSRF expirÃ©, tentative de rÃ©cupÃ©ration...');
      // On pourrait automatiquement retenter aprÃ¨s avoir rÃ©cupÃ©rÃ© le CSRF
    }
    
    return Promise.reject(error);
  }
);

// Fonction pour extraire le token CSRF depuis les cookies
const getCsrfTokenFromCookie = () => {
  const name = 'XSRF-TOKEN';
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  
  if (parts.length === 2) {
    const token = parts.pop().split(';').shift();
    return decodeURIComponent(token);
  }
  
  return null;
};

// Fonction pour obtenir le cookie CSRF
export const getCsrfCookie = async () => {
  try {
    await axios.get(`${BASE_URL}/sanctum/csrf-cookie`, {
      withCredentials: true
    });
    console.log('Cookie CSRF rÃ©cupÃ©rÃ© avec succÃ¨s');
  } catch (error) {
    console.error('Erreur lors de la rÃ©cupÃ©ration du cookie CSRF:', error);
    throw error;
  }
};

// Fonction d'inscription
export const register = async (userData) => {
  try {
    // RÃ©cupÃ©rer le cookie CSRF avant l'inscription
    await getCsrfCookie();
    
    // Effectuer l'inscription
    const response = await api.post('/auth/register', userData);
    
    // Sauvegarder les donnÃ©es d'authentification
    if (response.data.success && response.data.data.token) {
      localStorage.setItem('auth_token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    throw error;
  }
};

// Fonction de connexion
export const login = async (email, password) => {
  try {
    // RÃ©cupÃ©rer le cookie CSRF avant la connexion
    await getCsrfCookie();
    
    // Effectuer la connexion
    const response = await api.post('/auth/login', { email, password });
    
    // Sauvegarder les donnÃ©es d'authentification
    if (response.data.success && response.data.data.token) {
      localStorage.setItem('auth_token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    
    return response.data;
  } catch (error) {
    console.error('Erreur de connexion:', error);
    throw error;
  }
};

// Fonction de dÃ©connexion
export const logout = async () => {
  try {
    await api.post('/auth/logout');
  } catch (error) {
    console.error('Erreur de dÃ©connexion:', error);
  } finally {
    // Nettoyer toujours le localStorage mÃªme en cas d'erreur
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  }
};

// Fonction pour obtenir le profil utilisateur
export const getProfile = async () => {
  try {
    const response = await api.get('/auth/profile');
    return response.data;
  } catch (error) {
    console.error('Erreur rÃ©cupÃ©ration profil:', error);
    throw error;
  }
};

// Fonction pour vÃ©rifier si l'utilisateur est authentifiÃ©
export const isAuthenticated = () => {
  const token = localStorage.getItem('auth_token');
  const user = localStorage.getItem('user');
  return !!(token && user);
};

// Fonction pour obtenir l'utilisateur actuel
export const getCurrentUser = () => {
  try {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Erreur lors de la rÃ©cupÃ©ration de l\'utilisateur:', error);
    return null;
  }
};

// Demandes de partenariat
export const applyPartnership = (data) => api.post('/partnership/apply', data, data instanceof FormData
  ? { headers: { 'Content-Type': 'multipart/form-data' } }
  : undefined);

export const updatePartnership = (data) => api.put('/partnership/update', data, data instanceof FormData
  ? { headers: { 'Content-Type': 'multipart/form-data' } }
  : undefined);




export const getMyPartnership = () => api.get('/partnership/my-application');

export const getApprovedPartners = () => api.get('/partnerships/approved');

export default api;
