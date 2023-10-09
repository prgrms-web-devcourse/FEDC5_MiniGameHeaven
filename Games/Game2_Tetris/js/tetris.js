import BLOCKS from './blocks.js';
const $playboard = document.querySelector('.playboard > ul');
const $miniboard = document.querySelector('.miniboard > ul');
const $scoreboard = document.querySelector('.score');
const $retryButton = document.querySelector('.gameover > button');
const $gameover = document.querySelector('.gameover');

// 보드판 칸수 세팅값
const ROWS = 20;
const COLS = 10;
const MINIROWSCOLS = 5;

// 변수
let score = 0;
let duration = 500;
let downInterval;
let movingItemTmp;
const movingItem = {
  type: 'tree',
  direction: 0, //방향값 : 방향키 조작으로 도형을 회전시키는 경우 변경
  top: 0,
  left: 0,
};

//
function renderBlocks(moveType = '') {
  const { type, direction, top, left } = movingItemTmp;
  const movingBlocks = document.querySelectorAll('.moving');
  movingBlocks.forEach(movingBlock => {
    // 이전 블록 위치에 moving 클래스를 제거
    movingBlock.classList.remove(type, 'moving');
  });

  BLOCKS[type][direction].some(block => {
    const i = top + block[0];
    const j = left + block[1];
    // 이동한다면 색칠될 칸
    const colored = $playboard.childNodes[i]
      ? $playboard.childNodes[i].childNodes[0].childNodes[j]
      : null;
    // 유효검사
    if (!colored || colored.classList.contains('seized')) {
      // 무효하거나 쌓인거에 닿음
      movingItemTmp = { ...movingItem }; // 이전 movingItem 으로 원상복구
      // renderBlocks(); // 재귀로 바로 부르면 Maximum call stack size exceeded
      if (moveType === 'retry') {
        showGameOver();
        clearInterval(downInterval);
        return; // 게임오버인 경우이니까 종료시켜야 한다.
      }
      setTimeout(() => {
        renderBlocks('retry');
        if (moveType === 'top') {
          seizeBlock();
        }
      }, 0);
      return true; // 반복문을 중지시킬 수 있다.
    } else {
      /// 유효한 경우
      colored.classList.add(type, 'moving');
    }
  });
  movingItem.left = left;
  movingItem.top = top;
  movingItem.direction = direction;
}
function showGameOver() {
  $gameover.style.display = 'flex';
  console.log(score, parseInt(localStorage.getItem('Tetris최고점수')));
  if (!localStorage.getItem('Tetris최고점수') || localStorage.getItem('Tetris최고점수') < score) {
    localStorage.setItem('Tetris최고점수', score);
  }
}

function makeNewLine($target, row, col) {
  const ul = document.createElement('ul');
  const li = document.createElement('li');
  for (let j = 0; j < col; j++) {
    const cell = document.createElement('li');
    ul.prepend(cell);
  }
  li.prepend(ul);
  $target.prepend(li);
}

init();
function init() {
  if (!localStorage.getItem('Tetris최고점수')) {
    localStorage.getItem('Tetris최고점수', 0);
  }
  function makeBoard($target, row, col) {
    for (let i = 0; i < row; i++) {
      makeNewLine($target, row, col);
    }
  }

  movingItemTmp = { ...movingItem };
  makeBoard($playboard, ROWS, COLS);
  makeBoard($miniboard, MINIROWSCOLS, MINIROWSCOLS);
  // renderBlocks();
  generateNewBlock();
}

function moveBlock(moveType, amount) {
  movingItemTmp[moveType] += amount;
  renderBlocks(moveType);
}

function seizeBlock() {
  const movingBlocks = document.querySelectorAll('.moving');
  movingBlocks.forEach(movingBlock => {
    // 이전 블록 위치에 moving 클래스를 제거
    movingBlock.classList.remove('moving');
    movingBlock.classList.add('seized');
  });
  checkMatch();
}

function checkMatch() {
  const childNodes = $playboard.childNodes;
  childNodes.forEach(child => {
    let matched = true;
    child.children[0].childNodes.forEach(li => {
      if (!li.classList.contains('seized')) {
        matched = false;
      }
    });
    if (matched) {
      child.remove(); //?
      makeNewLine($playboard, ROWS, COLS);
      score += 1;
      $scoreboard.textContent = score;
    }
  });
  generateNewBlock();
}

function generateNewBlock() {
  clearInterval(downInterval);
  downInterval = setInterval(() => {
    moveBlock('top', 1);
  }, duration);

  const BLOCKSlength = Object.entries(BLOCKS).length;
  const randomNext = Object.entries(BLOCKS)[Math.floor(Math.random() * BLOCKSlength)];
  movingItem.type = randomNext[0];
  movingItem.top = 0;
  movingItem.left = 3;
  movingItem.direction = 0;
  movingItemTmp = { ...movingItem };
  renderBlocks();
}
function dropBlock() {
  clearInterval(downInterval);
  downInterval = setInterval(() => {
    moveBlock('top', 1);
  }, 10);
}

//이벤트 핸들링
document.addEventListener('keydown', e => {
  switch (e.code) {
    case 'ArrowUp': // 위로 키 -> 블록 회전
      movingItemTmp.direction = (movingItemTmp.direction + 1) % 4;
      renderBlocks();
      break;

    case 'ArrowDown':
      moveBlock('top', 1);
      break;

    case 'ArrowRight': // ->
      moveBlock('left', 1);
      break;

    case 'ArrowLeft': // <-
      moveBlock('left', -1);
      break;
    case 'Space':
      dropBlock();
      break;
    default:
      break;
  }
});

$retryButton.addEventListener('click', () => {
  $playboard.innerHTML = '';
  $gameover.style.display = 'none';
  init();
});
