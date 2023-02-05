type STORAGE_TYPE = 'localStorage' | 'sessionStorage';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function readConfig<T = any>(
  key: string,
  type: STORAGE_TYPE = 'localStorage'
): T | null {
  const storage =
    type === 'localStorage' ? window.localStorage : window.sessionStorage;
  const config = storage.getItem(key);
  if (config === null) return null;
  return JSON.parse(config);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function writeConfig<T = any>(
  key: string,
  config: T,
  type: STORAGE_TYPE = 'localStorage'
): void {
  const storage =
    type === 'localStorage' ? window.localStorage : window.sessionStorage;
  storage.setItem(key, JSON.stringify(config));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function removeConfigs(
  keys: string[],
  type: STORAGE_TYPE = 'localStorage'
): void {
  const storage =
    type === 'localStorage' ? window.localStorage : window.sessionStorage;

  for (const key of keys) {
    storage.removeItem(key);
  }
}
