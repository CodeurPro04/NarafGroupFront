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
  withCredentials: true,
});

// Intercepteur pour ajouter le token aux requêtes
api.interceptors.request.use(
  (config) => {
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
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Fonction pour obtenir le cookie CSRF
export const getCsrfCookie = async () => {
  try {
    await axios.get(`${BASE_URL}/sanctum/csrf-cookie`, {
      withCredentials: true
    });
  } catch (error) {
    console.error('Erreur CSRF:', error);
  }
};

// Fonction d'inscription
export const register = async (userData) => {
  try {
    await getCsrfCookie();
    const response = await api.post('/auth/register', userData);
    
    if (response.data.success && response.data.data.token) {
      localStorage.setItem('auth_token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    
    return response.data;
  } catch (error) {
    console.error('Erreur inscription:', error);
    throw error;
  }
};

// Fonction de connexion
export const login = async (email, password) => {
  try {
    await getCsrfCookie();
    const response = await api.post('/auth/login', { email, password });
    
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

// Fonction de déconnexion
export const logout = async () => {
  try {
    await api.post('/auth/logout');
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  } catch (error) {
    console.error('Erreur de déconnexion:', error);
    throw error;
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

export default api;