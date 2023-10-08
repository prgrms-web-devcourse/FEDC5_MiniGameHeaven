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
  top: 3,
  left: 0,
};
const BLOCKS = {
  tree: [
    [
      [2, 1],
      [0, 1],
      [1, 1],
      [1, 0],
    ],
    [],
    [],
    [],
  ],
};
//
function renderBlocks() {
  const { type, direction, top, left } = movingItemTmp;

  for (const block of BLOCKS[type][direction]) {
    const i = top + block[0];
    const j = left + block[1];
    const colored = $playboard.childNodes[i].childNodes[0].childNodes[j];
    colored.classList.add('tree');
  }
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
