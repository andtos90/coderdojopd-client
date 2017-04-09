/* @flow 
 * Simple wrapper on the broswer localStorage
 */

/**
 * Extract a value from the storage.
 * @param {String} key - The key of the value to extract.
 * @return {Any} The value of the item in the storage.
 */
export const getFromStorage = (key: string) => {
  return window.localStorage.getItem(key);
};

/**
 * Save a value in the storage.
 * @param {String} key - The key of the value to extract.
 * @param {String} value - The value to save.
 */
export const setInStorage = (key: string, value: string) => {
  window.localStorage.setItem(key, value);
};

/**
 * Remove a value from the storage.
 * @param {String} key - The key of the value to remove.
 */
export const deleteFromStorage = (key: string) => {
  window.localStorage.removeItem(key);
};
