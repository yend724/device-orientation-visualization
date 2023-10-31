export const setSessionStorage = (key: string, value: unknown) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};
export const getSessionStorage = (key: string) => {
  const value = sessionStorage.getItem(key);
  if (value === null) {
    return null;
  }
  return JSON.parse(value);
};
export const removeSessionStorage = (key: string) => {
  sessionStorage.removeItem(key);
};
export const clearSessionStorage = () => {
  sessionStorage.clear();
};
