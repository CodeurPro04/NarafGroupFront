import api from "../api/axios";

const extractList = (response) => {
  const payload = response?.data;
  const data = payload?.data;

  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(payload)) return payload;
  return [];
};

export const visitorService = {
  extractList,
  getProfile: () => api.get("/auth/profile"),
  updateProfile: (payload) => api.put("/auth/profile", payload),
  changePassword: (payload) => api.post("/auth/change-password", payload),
  getMessages: () => api.get("/visiteur/messages"),
  replyMessage: (uuid, payload) => api.post(`/visiteur/messages/${uuid}/reply`, payload),
  getSearchRequests: () => api.get("/visiteur/search-requests"),
  createSearchRequest: (payload) => api.post("/visiteur/search-requests", payload),
  getConstructionRequests: () => api.get("/visiteur/construction/my-requests"),
  createConstructionRequest: (payload) => api.post("/visiteur/construction/request", payload),
  getPropertyTypes: () => api.get("/property-types"),
};
