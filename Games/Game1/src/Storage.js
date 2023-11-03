import { PUZZLE_HIGH_SCORE_KEY } from './utils.js';

const $ = document;
const storage = window.localStorage;

export const setItem = value => {
  try {
    storage.setItem(PUZZLE_HIGH_SCORE_KEY, Number(value));
  } catch (error) {
    console.error(error);
  }
};

export const getItem = () => {
  try {
    const storedValue = storage.getItem(PUZZLE_HIGH_SCORE_KEY);
    if (!storedValue) {
      return 9999;
    } else {
      return storedValue;
    }
  } catch (error) {
    console.error(error);
  }
};

export const removeItem = () => {
  storage.removeItem(PUZZLE_HIGH_SCORE_KEY);
};
