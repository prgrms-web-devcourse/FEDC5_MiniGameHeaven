import App from './app.js';
import { highScore } from './utils.js';
import { getItem } from './storage.js';
const $ = document;
const $target = $.querySelector('.app');

new App({ $target });
