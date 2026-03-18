import axios from 'axios';

// URL de base de ton API Laravel
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Instance axios pour l'API
const api = axios.create({
  baseURL: `${BASE_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: false, // Bearer token uniquement
});

// Intercepteur pour ajouter le token Bearer aux requetes
api.interceptors.request.use(
  (config) => {
    // Ajouter le token d'authentification
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les réponses et erreurs
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Si token expiré ou invalide (401)
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      
      // Ã‰viter les redirections infinies
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

// Fonction d'inscription
export const register = async (userData) => {
  try {
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
    console.error('Erreur de déconnexion:', error);
  } finally {
    // Nettoyer toujours le localStorage même en cas d'erreur
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
    console.error('Erreur récupération profil:', error);
    throw error;
  }
};

// Fonction pour vérifier si l'utilisateur est authentifié
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
    console.error('Erreur lors de la récupération de l\'utilisateur:', error);
    return null;
  }
};

// Demandes de partenariat
export const submitPartnershipApplication = (data) => api.post('/partnerships/apply', data, data instanceof FormData
  ? { headers: { 'Content-Type': 'multipart/form-data' } }
  : undefined);

export const applyPartnership = (data) => api.post('/partnership/apply', data, data instanceof FormData
  ? { headers: { 'Content-Type': 'multipart/form-data' } }
  : undefined);

export const updatePartnership = (data) => api.put('/partnership/update', data, data instanceof FormData
  ? { headers: { 'Content-Type': 'multipart/form-data' } }
  : undefined);

export const getMyPartnership = () => api.get('/partnership/my-application');

export const getApprovedPartners = () => api.get('/partnerships/approved');
export const getPartnerById = (uuid) => api.get(`/partnerships/${uuid}`);

// Modeles de maison (public)
export const getHouseModels = () => api.get('/house-models');
export const getHouseModelById = (identifier) => api.get(`/house-models/${identifier}`);

export default api;
