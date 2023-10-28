export const createPath = (path: string, params: Record<string, string | number> = {}) => {
  const url = new URL(path, window.location.origin);
  Object.keys(params).forEach((key) => url.searchParams.append(key, params[key].toString()));
  return url;
};
