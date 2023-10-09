let board = Array.from(Array(4), () => Array(4).fill(0));
let boardId = Array.from([0, 1, 2, 3], n => Array(`${n}0`, `${n}1`, `${n}2`, `${n}3`));
let score;

// 키보드 입력
const keyDownEventHandler = e => {
  const keyCode = e.keyCode;
  console.log(keyCode);
  // 상
  if (keyCode === 38) {
    moveTop();
  }
  // 하
  else if (keyCode === 40) {
    moveBottom();
  }
  // 좌
  else if (keyCode === 37) {
  }
  // 우
  else if (keyCode === 39) {
  }

  boardUpdate();
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

// 보드판 숫자 이동
// 상
const moveTop = () => {
  let isMoved = false; // 이동 여부 확인
  let isPlused = Array.from(Array(4), () => Array(4).fill(0)); // 중복 누적 방지
  for (let i = 1; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] === 0) continue; // 숫자가 없으면 패스
      let topY = i - 1; // 위로 이동할 좌표
      // 이동할 칸이 빈값이 아닐 때까지 이동
      while (topY > 0 && board[topY][j] === 0) topY--;
      // 이동할 칸이 빈값이면
      if (board[topY][j] === 0) {
        // 현재값 밀어올리고 현재값 비우기
        board[topY][j] = board[i][j];
        board[i][j] = 0;
        isMoved = true;
      } // 이동할 칸이 현재값과 다를 경우
      else if (board[topY][j] !== board[i][j]) {
        if (topY + 1 === i) continue; // 바로 윗칸이면 패스
        // 아니라면 바로 아래까지 밀어올리기
        board[topY + 1][j] = board[i][j];
        board[i][j] = 0;
        isMoved = true;
      } // 이동할 칸이 현재값과 같다면
      else {
        // 최초 이동한 칸이라면 더하기
        if (isPlused[topY][j] === 0) {
          board[topY][j] *= 2;
          score += board[topY][j];
          board[i][j] = 0;
          isPlused[topY][j] = 1;
          isMoved = true;
        } // 중복 누적이라면 바로 아래칸으로 밀어올리기
        else {
          board[topY + 1][j] = board[i][j];
          board[i][j] = 0;
          isMoved = true;
        }
      }
    }
  }
  if (isMoved) makeNewNum(); // 이동했으면 새로운 숫자 생성
  else isGameOver(); // 아니라면 게임오버 확인
};
// 하
const moveBottom = () => {
  let isMoved = false; // 이동 여부 확인
  let isPlused = Array.from(Array(4), () => Array(4).fill(0)); // 중복 누적 방지
  for (let i = 2; i > -1; i--) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] === 0) continue; // 숫자가 없으면 패스
      let bottomY = i + 1; // 아래로 이동할 좌표
      // 이동할 칸이 빈값이 아닐 때까지 이동
      while (bottomY < 3 && board[bottomY][j] === 0) bottomY++;
      // 이동할 칸이 빈값이면
      if (board[bottomY][j] === 0) {
        // 현재값 밀어내리고 현재값 비우기
        board[bottomY][j] = board[i][j];
        board[i][j] = 0;
        isMoved = true;
      } // 이동할 칸이 현재값과 다를 경우
      else if (board[bottomY][j] !== board[i][j]) {
        if (bottomY - 1 === i) continue; // 바로 아래칸이면 패스
        // 아니라면 바로 위까지 밀어내리기
        board[bottomY - 1][j] = board[i][j];
        board[i][j] = 0;
        isMoved = true;
      } // 이동할 칸이 현재값과 같다면
      else {
        // 최초 이동한 칸이라면 더하기
        if (isPlused[bottomY][j] === 0) {
          board[bottomY][j] *= 2;
          score += board[bottomY][j];
          board[i][j] = 0;
          isPlused[bottomY][j] = 1;
          isMoved = true;
        } // 중복 누적이라면 바로 윗칸으로 밀어내리기
        else {
          board[bottomY - 1][j] = board[i][j];
          board[i][j] = 0;
          isMoved = true;
        }
      }
    }
  }
  if (isMoved) makeNewNum(); // 이동했으면 새로운 숫자 생성
  else isGameOver(); // 아니라면 게임오버 확인
};
// 좌
// 우

// 새로운 숫자 생성
const makeNewNum = () => {
  const zeroNum = isZero();
  while (true) {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (board[i][j] === 0) {
          let randNum = parseInt(Math.random() * zeroNum);
          if (randNum === 0) {
            board[i][j] = randNewNum();
            return;
          }
        }
      }
    }
  }
};

// 빈칸 갯수 세기
const isZero = () => {
  let isZero = 0;

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] === 0) isZero++;
    }
  }
  return isZero;
};

// 숫자 생성 확률
const randNewNum = () => {
  let randNum = parseInt(Math.random() * 10); // 1/10 확률
  return randNum === 0 ? 4 : 2;
};

// 최대 숫자 갱신
const getMaxNum = () => {
  let maxNum = 0;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      maxNum = board[i][j] > maxNum ? board[i][j] : maxNum;
    }
  }

  return maxNum;
};

// 게임오버 확인
const isGameOver = () => {
  // 행 체크
  for (let i = 0; i < 4; i++) {
    let tempCol = board[i][0];
    if (tempCol === 0) return; // 빈 칸이 존재하면 게임 가능
    for (let j = 1; j < 4; j++) {
      // 빈 칸이거나 왼쪽 칸과 동일하면 게임 가능
      if (board[i][j] === tempCol || board[i][j] === 0) return;
      // 값이 있으면 갱신
      else tempCol = board[i][j];
    }
  }
  // 열 체크
  for (let i = 0; i < 4; i++) {
    let tempRow = board[0][i];
    if (tempRow === 0) return; // 빈 칸이 존재하면 게임 가능
    for (let j = 1; j < 4; j++) {
      // 빈 칸이거나 왼쪽 칸과 동일하면 게임 가능
      if (board[j][i] === tempRow || board[j][i] === 0) return;
      // 값이 있으면 갱신
      else tempRow = board[j][i];
    }
  }

  // 게임 불가능하면 최고 점수 반환 및 alert
  alert(`게임 오버입니다. 최대 숫자 : ${getMaxNum()} , 최고 점수 : ${score}`);
  init();
};

init();
