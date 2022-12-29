import { STORAGE_VALUE } from '../@types';

type getStorageByKey = <T extends STORAGE_VALUE, K extends keyof T>(key: K, callback?: (result: T[K]) => void) => Promise<T[K]>;
type getStorageByKeyArray = <T extends STORAGE_VALUE, K extends keyof T, Keys extends K[]>(
  keys: Keys,
  callback?: (result: Pick<T, Keys[number]>) => void
) => Promise<Pick<T, Keys[number]>>;

interface STORAGE {
  get: getStorageByKey & getStorageByKeyArray;
  set: <T extends keyof STORAGE_VALUE>(
    keys: T | object | T[],
    value: any,
    callback?: (result: STORAGE_VALUE[T] | STORAGE_VALUE[T][] | object) => void
  ) => void;
}

export const Storage: STORAGE = {
  get: (keys, callback?) => {
    return new Promise((resolve) => {
      chrome.storage.local.get(keys, (result) => {
        if (chrome.runtime.lastError) {
          throw new Error('storage.local.get error');
        }
        if (typeof keys === 'string') {
          resolve(result[keys]);
          if (callback) {
            callback(result[keys]);
          }
          return;
        }
        if (Array.isArray(keys)) {
          const obj = {};
          keys.forEach((k) => {
            obj[k] = result[k];
          });
          resolve(obj);
          if (callback) {
            callback(obj);
          }
          return;
        }
      });
    });
  },
  set: (keys, value, callback?) => {
    if (typeof keys === 'string') {
      chrome.storage.local.set({ [keys]: value }, () => {
        if (chrome.runtime.lastError) {
          throw new Error('storage.local.set error');
        }
        if (callback) {
          callback(value);
        }
      });
      return;
    }
    if (typeof keys === 'object' && !Array.isArray(keys)) {
      chrome.storage.local.set(keys, () => {
        if (chrome.runtime.lastError) {
          throw new Error('storage.local.set error');
        }
        // if (callback) {
        //   callback(key.);
        // }
      });
      return;
    }
    if (Array.isArray(keys)) {
      const obj = {};
      keys.forEach((k) => {
        obj[k] = value;
      });
      chrome.storage.local.set(obj, () => {
        if (chrome.runtime.lastError) {
          throw new Error('storage.local.set error');
        }
        // if (callback) {
        //   callback();
        // }
      });
      return;
    }
  },
};
