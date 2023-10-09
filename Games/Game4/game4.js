let board = Array.from(Array(4), () => Array(4).fill(0));
let boardId = Array.from([0, 1, 2, 3], n => Array(`${n}0`, `${n}1`, `${n}2`, `${n}3`));
let score;

// 키보드 입력
const keyDownEventHandler = e => {
  const keyCode = e.keyCode;
  // 상
  if (keyCode === 38) {
  }
  // 하
  else if (keyCode === 40) {
  }
  // 좌
  else if (keyCode === 37) {
  }
  // 우
  else if (keyCode === 39) {
  }
};
// 키보드 입력 핸들러
document.onkeydown = keyDownEventHandler;
