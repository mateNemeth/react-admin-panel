export enum LocalStorageKeys {
  LOCAL_STORAGE_AUTH_KEY = '_token_',
}

export const setItemToStorage = (key: LocalStorageKeys, item: unknown) => {
  let stringifyed: string;
  if (typeof item === 'string') {
    stringifyed = item;
  } else {
    stringifyed = JSON.stringify(item);
  }
  window.localStorage.setItem(key, stringifyed);
};

export const getItemFromStorage = (key: string) => {
  const value = window.localStorage.getItem(key);

  return value === 'undefined' ? null : value;
};

export const removeItemFromStorage = (key: string) =>
  window.localStorage.removeItem(key);
