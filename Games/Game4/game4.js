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
      changeBoxColor(box); // 색깔 변경
    }
  }
  // 점수 업데이트
  document.querySelector('.score').innerText = score;
};

// 박스 색깔 변경
const changeBoxColor = box => {
  let boxNum = parseInt(box.innerText);
  switch (boxNum) {
    case 0:
    case 2:
      box.style.color = '#684A23';
      box.style.background = '#FBEDDC';
      break;
    case 4:
      box.style.color = '#684A23';
      box.style.background = '#F9E2C7';
      break;
    case 8:
      box.style.color = '#684A23';
      box.style.background = '#F6D5AB';
      break;
    case 16:
      box.style.color = '#684A23';
      box.style.background = '#F2C185';
      break;
    case 32:
      box.style.color = '#684A23';
      box.style.background = '#EFB46D';
      break;
    case 64:
      box.style.color = '#FFFFFF';
      box.style.background = '#EBA24A';
      break;
    case 128:
      box.style.color = '#FFFFFF';
      box.style.background = '#E78F24';
      break;
    case 256:
      box.style.color = '#FFFFFF';
      box.style.background = '#E87032';
      break;
    case 512:
      box.style.color = '#FFFFFF';
      box.style.background = '#E85532';
      break;
    case 1024:
      box.style.color = '#FFFFFF';
      box.style.background = '#E84532';
      break;
    case 2048:
      box.style.color = '#FFFFFF';
      box.style.background = '#E83232';
      break;
    default:
      if (boxNum > 2048) {
        box.style.color = '#FFFFFF';
        box.style.background = '#E51A1A';
      } else {
        box.style.color = '#684A23';
        box.style.background = '#FBEDDC';
      }
      break;
  }
};

// 숫자 생성 확률
const randNewNum = () => {
  let randNum = parseInt(Math.random() * 10); // 1/10 확률
  return randNum === 0 ? 4 : 2;
};

init();
