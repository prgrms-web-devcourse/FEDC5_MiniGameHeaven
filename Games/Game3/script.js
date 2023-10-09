import { setupDino, updateDino } from './dino.js';
import { updateCactus, setupCactus } from './cactus.js';
import { setupGround, updateGround } from './ground.js';

const WORLD_WIDTH = 100;
const WORLD_HEIGHT = 30;
const SPEED_SCALE_INCREASE = 0.00001;

const $world = document.querySelector('[data-world]');
const $score = document.querySelector('[data-score]');
const $startScreen = document.querySelector('[data-start-screen]');

setPixelToWorldScale();
window.addEventListener('resize', setPixelToWorldScale);
document.addEventListener('keydown', handleStart, { once: true });

let lastTime;
let speedScale;
let score;

function update(time) {
  if (lastTime == null) {
    lastTime = time;
    window.requestAnimationFrame(update);
    return;
  }

  const delta = time - lastTime;

  updateGround(delta, speedScale);
  updateDino(delta, speedScale);
  updateCactus(delta, speedScale);
  updateSpeedScale(delta);
  updateScore(delta);

  lastTime = time;
  window.requestAnimationFrame(update);
}

function updateSpeedScale(delta) {
  speedScale += delta * SPEED_SCALE_INCREASE;
}

function updateScore(delta) {
  score += delta * 0.01;
  $score.textContent = Math.floor(score);
}

function handleStart() {
  lastTime = null;
  speedScale = 1;
  score = 0;
  setupGround();
  setupDino();
  setupCactus();
  $startScreen.classList.add('hide');
  window.requestAnimationFrame(update);
}

function setPixelToWorldScale() {
  let worldToPixelScale;

  // window의 크기비율에 따라 world의 사이즈 조정
  if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
    worldToPixelScale = window.innerWidth / WORLD_WIDTH;
  } else {
    worldToPixelScale = window.innerHeight / WORLD_HEIGHT;
  }

  $world.style.width = `${WORLD_WIDTH * worldToPixelScale}px`;
  $world.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`;
}
