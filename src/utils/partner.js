// Libelle affiche pour un partenaire rattache a un bien/projet, selon son
// company_type (immobilier | constructeur | investisseur | juridique).
// `fallback` est utilise quand aucun partenaire n'est rattache (ex. la card
// retombe sur Africa Build Investment mais garde un libelle propre au domaine).
export const getPartnerTypeLabel = (partner, fallback = "Partenaire") => {
  if (!partner) return fallback;
  const normalized = (partner.company_type || "").toLowerCase();

  if (normalized.includes("jurid")) {
    return partner.legal_specialty
      ? `Partenaire juridique · ${partner.legal_specialty}`
      : "Partenaire juridique";
  }
  if (normalized.includes("constructeur") || normalized.includes("construction")) {
    return "Partenaire constructeur";
  }
  if (normalized.includes("invest") || normalized.includes("financ")) {
    return "Partenaire financier";
  }
  if (normalized.includes("immob")) {
    return "Partenaire immobilier";
  }
  return "Partenaire";
};
