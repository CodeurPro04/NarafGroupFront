export const AFRICAN_COUNTRIES = [
  { code: "ZA", name: "Afrique du Sud", flag: "🇿🇦" },
  { code: "DZ", name: "Algérie", flag: "🇩🇿" },
  { code: "AO", name: "Angola", flag: "🇦🇴" },
  { code: "BJ", name: "Bénin", flag: "🇧🇯" },
  { code: "BW", name: "Botswana", flag: "🇧🇼" },
  { code: "BF", name: "Burkina Faso", flag: "🇧🇫" },
  { code: "BI", name: "Burundi", flag: "🇧🇮" },
  { code: "CM", name: "Cameroun", flag: "🇨🇲" },
  { code: "CV", name: "Cap-Vert", flag: "🇨🇻" },
  { code: "KM", name: "Comores", flag: "🇰🇲" },
  { code: "CG", name: "Congo", flag: "🇨🇬" },
  { code: "CI", name: "Côte d'Ivoire", flag: "🇨🇮" },
  { code: "DJ", name: "Djibouti", flag: "🇩🇯" },
  { code: "EG", name: "Égypte", flag: "🇪🇬" },
  { code: "ER", name: "Érythrée", flag: "🇪🇷" },
  { code: "SZ", name: "Eswatini", flag: "🇸🇿" },
  { code: "ET", name: "Éthiopie", flag: "🇪🇹" },
  { code: "GA", name: "Gabon", flag: "🇬🇦" },
  { code: "GM", name: "Gambie", flag: "🇬🇲" },
  { code: "GH", name: "Ghana", flag: "🇬🇭" },
  { code: "GN", name: "Guinée", flag: "🇬🇳" },
  { code: "GW", name: "Guinée-Bissau", flag: "🇬🇼" },
  { code: "GQ", name: "Guinée équatoriale", flag: "🇬🇶" },
  { code: "KE", name: "Kenya", flag: "🇰🇪" },
  { code: "LS", name: "Lesotho", flag: "🇱🇸" },
  { code: "LR", name: "Libéria", flag: "🇱🇷" },
  { code: "LY", name: "Libye", flag: "🇱🇾" },
  { code: "MG", name: "Madagascar", flag: "🇲🇬" },
  { code: "MW", name: "Malawi", flag: "🇲🇼" },
  { code: "ML", name: "Mali", flag: "🇲🇱" },
  { code: "MA", name: "Maroc", flag: "🇲🇦" },
  { code: "MU", name: "Maurice", flag: "🇲🇺" },
  { code: "MR", name: "Mauritanie", flag: "🇲🇷" },
  { code: "MZ", name: "Mozambique", flag: "🇲🇿" },
  { code: "NA", name: "Namibie", flag: "🇳🇦" },
  { code: "NE", name: "Niger", flag: "🇳🇪" },
  { code: "NG", name: "Nigeria", flag: "🇳🇬" },
  { code: "UG", name: "Ouganda", flag: "🇺🇬" },
  { code: "CD", name: "RD Congo", flag: "🇨🇩" },
  { code: "CF", name: "Rép. centrafricaine", flag: "🇨🇫" },
  { code: "RW", name: "Rwanda", flag: "🇷🇼" },
  { code: "ST", name: "Sao Tomé-et-Principe", flag: "🇸🇹" },
  { code: "SN", name: "Sénégal", flag: "🇸🇳" },
  { code: "SC", name: "Seychelles", flag: "🇸🇨" },
  { code: "SL", name: "Sierra Leone", flag: "🇸🇱" },
  { code: "SO", name: "Somalie", flag: "🇸🇴" },
  { code: "SD", name: "Soudan", flag: "🇸🇩" },
  { code: "SS", name: "Soudan du Sud", flag: "🇸🇸" },
  { code: "TZ", name: "Tanzanie", flag: "🇹🇿" },
  { code: "TD", name: "Tchad", flag: "🇹🇩" },
  { code: "TG", name: "Togo", flag: "🇹🇬" },
  { code: "TN", name: "Tunisie", flag: "🇹🇳" },
  { code: "ZM", name: "Zambie", flag: "🇿🇲" },
  { code: "ZW", name: "Zimbabwe", flag: "🇿🇼" },
];

export const COUNTRY_STORAGE_KEY = "selected_country_code";

export const getSelectedCountryCode = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(COUNTRY_STORAGE_KEY);
};

export const setSelectedCountryCode = (code) => {
  if (typeof window === "undefined") return;
  if (code) {
    localStorage.setItem(COUNTRY_STORAGE_KEY, code);
  } else {
    localStorage.removeItem(COUNTRY_STORAGE_KEY);
  }
  window.dispatchEvent(new CustomEvent("country:changed", { detail: code || null }));
};

export const getCountryByCode = (code) =>
  AFRICAN_COUNTRIES.find((country) => country.code === code) || null;
