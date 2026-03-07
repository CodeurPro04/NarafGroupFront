import api from "../api/axios";

const DEFAULT_API_ROOT = "https://api.africabuildinvest.com";

export const getApiRoot = () => {
  const rawBase =
    import.meta.env.VITE_API_URL ||
    api?.defaults?.baseURL ||
    `${DEFAULT_API_ROOT}/api/v1`;

  return String(rawBase)
    .trim()
    .replace(/\/api\/v1\/?$/i, "")
    .replace(/\/api\/?$/i, "")
    .replace(/\/$/, "");
};

export const toMediaUrl = (path) => {
  if (!path) return "";

  const raw = String(path).trim();
  if (!raw) return "";

  if (
    /^(https?:)?\/\//i.test(raw) ||
    raw.startsWith("data:") ||
    raw.startsWith("blob:")
  ) {
    return raw;
  }

  const root = getApiRoot();

  if (raw.startsWith("/storage/")) return `${root}${raw}`;
  if (raw.startsWith("storage/")) return `${root}/${raw}`;
  if (raw.startsWith("/")) return `${root}${raw}`;

  const cleaned = raw.replace(/^public\//i, "").replace(/^\/+/, "");
  return `${root}/storage/${cleaned}`;
};

