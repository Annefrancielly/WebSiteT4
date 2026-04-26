const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH?.trim() ?? "";

export function withBasePath(path: string): string {
  if (!path) return BASE_PATH || "";

  if (/^(https?:)?\/\//.test(path)) {
    return path;
  }

  const normalized = path.startsWith("/") ? path : `/${path}`;

  return `${BASE_PATH}${normalized}`;
}