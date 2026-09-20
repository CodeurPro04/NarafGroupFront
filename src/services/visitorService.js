import api from "../api/axios";

const extractList = (response) => {
  const payload = response?.data;
  const data = payload?.data;

  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(payload)) return payload;
  return [];
};

const extractThread = (response) => {
  const payload = response?.data;
  if (Array.isArray(payload?.thread)) return payload.thread;
  return [];
};

// Chemin de base des endpoints de messagerie pour chaque role. "reply" est le
// chemin utilise pour repondre dans un fil existant (specifique pour l'agent
// qui utilise /respond), "list"/"send"/"show" sont communs a tous les roles
// cote backend (memes methodes de controller, juste montees sous des prefixes
// differents).
const MESSAGE_BASE_BY_ROLE = {
  agent: "/agent/messages",
  proprietaire: "/proprietaire/messages",
  investisseur: "/investisseur/messages",
  visiteur: "/visiteur/messages",
};

const messageBase = (role) => MESSAGE_BASE_BY_ROLE[role] || MESSAGE_BASE_BY_ROLE.visiteur;

export const visitorService = {
  extractList,
  extractThread,
  getProfile: () => api.get("/auth/profile"),
  updateProfile: (payload) => api.put("/auth/profile", payload),
  changePassword: (payload) => api.post("/auth/change-password", payload),
  getMessages: () => api.get("/visiteur/messages", { params: { per_page: 100 } }),
  getMessagesByRole: (role) => api.get(messageBase(role), { params: { per_page: 100 } }),
  replyMessage: (uuid, payload) => api.post(`/visiteur/messages/${uuid}/reply`, payload),
  replyMessageByRole: (role, uuid, payload) => {
    const path = role === "agent"
      ? `/agent/messages/${uuid}/respond`
      : `${messageBase(role)}/${uuid}/reply`;
    return api.post(path, payload);
  },
  // Fil de discussion complet (racine + toutes les reponses) pour une conversation.
  getThreadByRole: (role, uuid) => api.get(`${messageBase(role)}/${uuid}`),
  // Demarre une toute nouvelle conversation avec un destinataire (ex: un agent).
  startConversationByRole: (role, payload) => api.post(messageBase(role), payload),
  // Agents actifs avec qui n'importe quel role connecte peut demarrer une conversation.
  listMessageableAgents: () => api.get("/messages/agents"),
  getSearchRequests: () => api.get("/visiteur/search-requests"),
  createSearchRequest: (payload) => api.post("/visiteur/search-requests", payload),
  getConstructionRequests: () => api.get("/visiteur/construction/my-requests"),
  createConstructionRequest: (payload) => api.post("/visiteur/construction/request", payload),
  getPropertyRequests: () => api.get("/proprietaire/property-requests"),
  createPropertyRequest: (payload) => api.post("/proprietaire/property-requests", payload),
  getPropertyTypes: () => api.get("/property-types"),
};
