import api from '../api/axios';

export const propertyService = {
  // Récupérer toutes les propriétés
  getAll: async (params = {}) => {
    try {
      const response = await api.get('/properties', { params });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des propriétés:', error);
      throw error;
    }
  },

  // Récupérer les propriétés par type
  getByType: async (type) => {
    try {
      const response = await api.get(`/properties/type/${type}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération par type:', error);
      throw error;
    }
  },

  // Récupérer les propriétés par ville
  getByCity: async (city) => {
    try {
      const response = await api.get(`/properties/city/${city}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération par ville:', error);
      throw error;
    }
  },

  // Récupérer les propriétés en vedette
  getFeatured: async () => {
    try {
      const response = await api.get('/properties/featured');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des vedettes:', error);
      throw error;
    }
  },

  // Récupérer une propriété par ID/UUID
  getById: async (id) => {
    try {
      const response = await api.get(`/properties/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération de la propriété:', error);
      throw error;
    }
  },

  // Récupérer les types de propriétés
  getPropertyTypes: async () => {
    try {
      const response = await api.get('/property-types');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des types:', error);
      throw error;
    }
  },

  // Récupérer les caractéristiques
  getPropertyFeatures: async () => {
    try {
      const response = await api.get('/property-features');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des caractéristiques:', error);
      throw error;
    }
  }
};