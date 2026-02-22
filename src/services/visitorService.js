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
  getMessagesByRole: (role) => {
    if (role === "agent") return api.get("/agent/messages");
    if (role === "proprietaire") return api.get("/proprietaire/messages");
    return api.get("/visiteur/messages");
  },
  replyMessage: (uuid, payload) => api.post(`/visiteur/messages/${uuid}/reply`, payload),
  replyMessageByRole: (role, uuid, payload) => {
    if (role === "agent") return api.post(`/agent/messages/${uuid}/respond`, payload);
    if (role === "proprietaire") return api.post(`/proprietaire/messages/${uuid}/reply`, payload);
    return api.post(`/visiteur/messages/${uuid}/reply`, payload);
  },
  getSearchRequests: () => api.get("/visiteur/search-requests"),
  createSearchRequest: (payload) => api.post("/visiteur/search-requests", payload),
  getConstructionRequests: () => api.get("/visiteur/construction/my-requests"),
  createConstructionRequest: (payload) => api.post("/visiteur/construction/request", payload),
  getPropertyRequests: () => api.get("/proprietaire/property-requests"),
  createPropertyRequest: (payload) => api.post("/proprietaire/property-requests", payload),
  getPropertyTypes: () => api.get("/property-types"),
};
