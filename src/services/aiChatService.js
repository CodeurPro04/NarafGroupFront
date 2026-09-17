import api from "../api/axios";

// Identifiants des agents IA — à mapper côté backend Ollama
export const AI_AGENTS = [
  {
    id: "akapko",
    name: "Akapko Manawa",
    specialty: "Construction",
    description: "Expert en projets de construction sur mesure en Afrique",
    color: "amber",
    initials: "AK",
    model: "akapko-manawa", // nom du modèle Ollama sur le VPS
    welcomeMessage:
      "Bonjour ! Je suis Akapko Manawa, votre expert en construction. Je peux vous aider sur vos projets de construction sur mesure, les plans, les devis et les matériaux. Comment puis-je vous aider ?",
  },
  {
    id: "djuedjue",
    name: "Djuêdjuê",
    specialty: "Immobilier",
    description: "Spécialiste de l'immobilier résidentiel et commercial en Afrique",
    color: "blue",
    initials: "DJ",
    model: "djuedjue-immobilier",
    welcomeMessage:
      "Bonjour ! Je suis Djuêdjuê, votre expert immobilier. Je vous accompagne pour acheter, vendre ou louer un bien en Afrique. Quelle est votre situation ?",
  },
  {
    id: "koffi",
    name: "Koffi Gombo",
    specialty: "Investissement",
    description: "Conseiller en investissement immobilier et projets rentables",
    color: "emerald",
    initials: "KG",
    model: "koffi-gombo",
    welcomeMessage:
      "Bonjour ! Je suis Koffi Gombo, votre conseiller en investissement. Je vous aide à identifier les meilleures opportunités d'investissement immobilier en Afrique. Par où voulez-vous commencer ?",
  },
];

/**
 * Envoie un message à l'IA et retourne la réponse.
 * Prêt pour connexion au backend Ollama sur le VPS.
 *
 * @param {string} agentId   - id de l'agent (akapko | djuedjue | koffi)
 * @param {string} message   - message de l'utilisateur
 * @param {string|null} conversationId - id de session (optionnel)
 * @returns {Promise<{reply: string, conversationId: string}>}
 */
export const sendChatMessage = async (agentId, message, conversationId = null, history = []) => {
  // TODO: décommenter quand le backend Ollama sera prêt sur le VPS
  // const response = await api.post("/ai/chat", {
  //   agent: agentId,
  //   message,
  //   conversation_id: conversationId,
  //   history: history.slice(-10), // on envoie les 10 derniers messages max
  // });
  // return {
  //   reply: response.data.data.message,
  //   conversationId: response.data.data.conversation_id,
  // };

  // --- MODE DÉMO (à remplacer par l'appel API ci-dessus) ---
  await new Promise((r) => setTimeout(r, 900));

  const agent = AI_AGENTS.find((a) => a.id === agentId);
  const demoReplies = {
    akapko: [
      "Pour votre projet de construction, je vous recommande de commencer par définir votre budget et la superficie souhaitée. Avez-vous déjà un terrain ?",
      "Les matériaux locaux peuvent réduire significativement vos coûts de construction. Voulez-vous en savoir plus sur nos partenaires constructeurs ?",
      "Naraf Group dispose d'excellents modèles de maison adaptés au climat africain. Souhaitez-vous voir nos plans disponibles ?",
    ],
    djuedjue: [
      "Pour acheter un bien en Afrique, plusieurs critères sont essentiels : l'emplacement, le titre foncier et l'état du marché local. Dans quel pays cherchez-vous ?",
      "Le marché immobilier africain offre de belles opportunités, notamment dans les grandes métropoles. Avez-vous un budget défini ?",
      "Je peux vous orienter vers nos agents certifiés ABI dans votre pays cible. Souhaitez-vous être mis en contact ?",
    ],
    koffi: [
      "L'investissement immobilier en Afrique offre des rendements locatifs attractifs, souvent supérieurs à 8%. Quel est votre horizon d'investissement ?",
      "Nos projets d'investissement en cours sont disponibles sur la plateforme. Souhaitez-vous que je vous présente les opportunités les plus rentables ?",
      "La diversification géographique est clé pour un portefeuille immobilier solide en Afrique. Combien souhaitez-vous investir initialement ?",
    ],
  };

  const replies = demoReplies[agentId] || demoReplies.koffi;
  const reply = replies[Math.floor(Math.random() * replies.length)];

  return {
    reply,
    conversationId: conversationId || `demo-${Date.now()}`,
  };
};
