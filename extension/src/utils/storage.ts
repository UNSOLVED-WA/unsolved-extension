import { STORAGE_VALUE } from '../@types';

type getStorageByKey = <T extends STORAGE_VALUE, K extends keyof STORAGE_VALUE>(key: K, callback?: (result: T[K]) => void) => Promise<T[K]>;
type getStorageByKeyArray = <Keys extends (keyof STORAGE_VALUE)[]>(
  keys: Keys,
  callback?: (result: Partial<Pick<STORAGE_VALUE, Keys[number]>>) => void
) => Promise<Partial<Pick<STORAGE_VALUE, Keys[number]>>>;
type setStorageByKey = <K extends keyof STORAGE_VALUE>(
  key: K,
  value: STORAGE_VALUE[K],
  callback?: (result: STORAGE_VALUE[K]) => void
) => void;
type setStorageByKeyArray = (keys: STORAGE_VALUE, callback?: (result: STORAGE_VALUE) => void) => void;

interface StorageManager {
  get: getStorageByKey;
  gets: getStorageByKeyArray;
  set: setStorageByKey;
  sets: setStorageByKeyArray;
}

export const StorageManager: StorageManager = {
  get: (key, callback?) => {
    return new Promise((resolve) => {
      chrome.storage.local.get(key, (result) => {
        if (chrome.runtime.lastError) {
          throw new Error('storage.local.get error');
        }
        resolve(result[key]);
        if (callback) {
          callback(result[key]);
        }
      });
    });
  },
  gets: (keys, callback?) => {
    return new Promise((resolve) => {
      chrome.storage.local.get(keys, (result) => {
        if (chrome.runtime.lastError) {
          throw new Error('storage.local.get error');
        }

        const obj = {};
        for (const key of keys) {
          obj[key] = result[key];
        }
        resolve(obj);
        if (callback) {
          callback(obj);
        }
      });
    });
  },
  set: (keys, value, callback?) => {
    chrome.storage.local.set({ [keys]: value }, () => {
      if (chrome.runtime.lastError) {
        throw new Error('storage.local.set error');
      }
      if (callback) {
        callback(value);
      }
    });
  },
  sets: (keys, callback?) => {
    chrome.storage.local.set(keys, () => {
      if (chrome.runtime.lastError) {
        throw new Error('storage.local.set error');
      }
      if (callback) {
        callback(keys);
      }
    });
  },
};
