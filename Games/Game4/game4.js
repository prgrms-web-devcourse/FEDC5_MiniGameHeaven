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

// 초기화
const init = () => {
  score = 0;
  // 배열 초기화
  board = Array.from(Array(4), () => Array(4).fill(0));
  // 초기 랜덤 숫자 위치 지정
  let num = 0;
  while (num < 2) {
    let randNum = parseInt(Math.random() * 16); // 0 ~ 15
    let x = randNum % 4; // 열
    let y = parseInt(randNum / 4); // 행
    // 해당 위치에 숫자 생성
    if (board[y][x] === 0) {
      board[y][x] = randNewNum();
      num++;
    }
  }

  boardUpdate(); // 보드 업데이트
};

// 화면 업데이트
const boardUpdate = () => {
  // 보드판 업데이트
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      let box = document.getElementById(boardId[i][j]);
      box.innerText = board[i][j] === 0 ? '' : board[i][j];
    }
  }
  // 점수 업데이트
  document.querySelector('.score').innerText = score;
};

// 숫자 생성 확률
const randNewNum = () => {
  let randNum = parseInt(Math.random() * 10); // 1/10 확률
  return randNum === 0 ? 4 : 2;
};

init();
