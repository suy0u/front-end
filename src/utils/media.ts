export function resolveMediaUrl(url?: string | null) {
  if (!url) return undefined;

  if (url.startsWith("http")) {
    return url;
  }

  return `${import.meta.env.VITE_API_URL}${url}`;
}
