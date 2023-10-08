const $playboard = document.querySelector('.playboard > ul');
const $miniboard = document.querySelector('.miniboard > ul');

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
const BLOCKS = {
  //초기모습부터 반시계방향으로 90도 회전
  tree: [
    [
      [2, 1],
      [0, 1],
      [1, 1],
      [1, 0],
    ],
    [
      [2, 1],
      [1, 2],
      [1, 1],
      [1, 0],
    ],
    [
      [2, 1],
      [0, 1],
      [1, 1],
      [1, 2],
    ],
    [
      [1, 2],
      [0, 1],
      [1, 1],
      [1, 0],
    ],
  ],
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
      setTimeout(() => {
        renderBlocks();
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

// IIFE -> 보드판 그리기
(() => {
  function makeBoard($target, row, col) {
    for (let i = 0; i < row; i++) {
      const ul = document.createElement('ul');
      const li = document.createElement('li');
      for (let j = 0; j < col; j++) {
        const cell = document.createElement('li');
        ul.prepend(cell);
      }
      li.prepend(ul);
      $target.prepend(li);
    }
  }

  movingItemTmp = { ...movingItem };
  makeBoard($playboard, ROWS, COLS);
  makeBoard($miniboard, MINIROWSCOLS, MINIROWSCOLS);
  renderBlocks();
})();

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
  generateNewBlock();
}
function generateNewBlock() {
  movingItem.top = 0;
  movingItem.left = 3;
  movingItem.direction = 0;
  movingItemTmp = { ...movingItem };
  renderBlocks();
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

    default:
      break;
  }
});
