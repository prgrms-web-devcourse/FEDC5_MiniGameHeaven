import { ROWS, COLS, MINIROWSCOLS } from './utils/rowsAndCols.js';
import BLOCKS from './utils/blocks.js';

export default function Tetris({ $target, initialState }) {
  // $target = .gamezone
  let tmp = 0;
  this.state = initialState;

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };
  const $playboard = document.createElement('div');
  $playboard.className = 'playboard';
  $target.appendChild($playboard);
  const $sideboard = document.createElement('div');
  $sideboard.className = 'sideboard';
  $target.appendChild($sideboard);

  this.render = () => {
    $playboard.innerHTML = `
      <ul></ul>
    `;
    $sideboard.innerHTML = `
      <div class="miniboard">
        <div class="textCenter" style="color: #fdfffb">NEXT</div>
        <ul></ul>
      </div>
      <div class="userlist"></div>
    `;
  };
  this.render();

  // 변수
  let score = 0;
  let duration = 500000;
  let downInterval;
  let movingItemTmp;
  const movingItem = {
    type: 'tree',
    direction: 0, //방향값 : 방향키 조작으로 도형을 회전시키는 경우 변경
    top: 0,
    left: 0,
  };
  // 다음 블럭
  const nextItem = {
    type: '',
    direction: 0,
    top: 0,
    left: 0,
  };
  const $scoreboardHigh = document.querySelector('.high_score');
  const $scoreboardNow = document.querySelector('.now_score');

  function showGameOver() {
    const $gameover = document.querySelector('.gameover');
    $gameover.style.display = 'flex';
    document.addEventListener('keydown', e => {
      if (e.code === 'Space' && $gameover.style.display == 'flex') {
        $playboardUl.innerHTML = '';
        $miniboardUl.innerHTML = '';
        $gameover.style.display = 'none';
        isInit = true;
        init();
        // return;
      }
    });
    if (!localStorage.getItem('Tetris최고점수') || localStorage.getItem('Tetris최고점수') < score) {
      localStorage.setItem('Tetris최고점수', score);
    }
  }

  // 한줄 완성 확인 후 점수++
  function checkMatch() {
    let tmp = 0;
    const childNodes = $playboardUl.childNodes;
    childNodes.forEach(child => {
      let matched = true;
      child.children[0].childNodes.forEach(li => {
        if (!li.classList.contains('seized')) {
          matched = false;
        }
      });
      if (matched) {
        child.remove(); //?
        tmp = 1;
        // makeNewLine($playboardUl, ROWS, COLS);
        score += 1;
        $scoreboardNow.textContent = score;
        tmp = 1;
      }
    });
    movingItem.type = nextItem.type;
    movingItem.direction = 0;
    movingItem.top = 0;
    movingItem.left = 4;
    generateNewBlock();
    if (tmp) {
      makeNewLine($playboardUl, ROWS, COLS);
    }
  }

  // 키 혹은 시간에 따라 블록 이동
  function moveBlock(moveType, amount) {
    movingItemTmp[moveType] += amount;
    renderBlocks(moveType);
  }

  // 블록 이동 중지
  function seizeBlock() {
    const movingBlocks = document.querySelectorAll('.moving');
    movingBlocks.forEach(movingBlock => {
      movingBlock.classList.add('seized');
      movingBlock.classList.remove('moving');
    });
    checkMatch();
  }

  // 최하단까지 하강
  function dropBlock() {
    clearInterval(downInterval);
    downInterval = setInterval(() => {
      moveBlock('top', 1);
    }, 10);
  }

  // 다음 블록 렌더링
  function renderNextBlocks() {
    const { type, direction, top, left } = nextItem;
    $miniboardUl.querySelectorAll('.nextblock').forEach(block => {
      block.classList = '';
    });
    BLOCKS[type][direction].some(block => {
      const i = top + block[0];
      const j = left + block[1];
      // 이동한다면 색칠될 칸
      const colored = $miniboardUl.childNodes[i]
        ? $miniboardUl.childNodes[i].childNodes[0].childNodes[j]
        : null;
      if (colored) {
        colored.classList.add(type, 'nextblock');
      }
    });
  }

  // 각 블록 렌더링
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
      const colored = $playboardUl.childNodes[i]
        ? $playboardUl.childNodes[i].childNodes[0].childNodes[j]
        : null;
      if (!colored || colored.classList.contains('seized')) {
        // 유효검사 - 무효하거나 쌓인거에 닿음
        movingItemTmp = { ...movingItem }; // 이전 movingItem 으로 원상복구
        // renderBlocks(); // 재귀로 바로 부르면 Maximum call stack size exceeded
        if (moveType === 'retry') {
          showGameOver();
          clearInterval(downInterval);
          return true; // 게임오버인 경우이니까 종료시켜야 한다.
        }
        setTimeout(() => {
          renderBlocks('retry');
          if (moveType === 'top') {
            seizeBlock();
          }
        }, 0);
        return true; // some 반복문을 중지시킬 수 있다.
      } else {
        /// 유효검사 - 유효한 경우
        colored.classList.add(type, 'moving');
      }
    });

    movingItem.left = left;
    movingItem.top = top;
    movingItem.direction = direction;
  }

  // 게임 재시작
  function generateNewBlock() {
    clearInterval(downInterval);
    downInterval = setInterval(() => {
      moveBlock('top', 1);
    }, duration);

    const BLOCKSlength = Object.entries(BLOCKS).length;

    if (isInit) {
      // 첫블록 그리는거면 블록그리고 넥스트블록그림
      const randomNext = Object.entries(BLOCKS)[Math.floor(Math.random() * BLOCKSlength)];
      movingItem.type = randomNext[0];
      movingItem.top = 0;
      movingItem.left = 4;
      movingItem.direction = 0;
      movingItemTmp = { ...movingItem };
      renderBlocks();

      const randomMiniNext = Object.entries(BLOCKS)[Math.floor(Math.random() * BLOCKSlength)];
      nextItem.type = randomMiniNext[0];
      nextItem.top = 1;
      nextItem.left = 1;
      nextItem.direction = 0;
      renderNextBlocks();

      isInit = false;
    } else {
      // 그다음 부턴 블록은 랜덤없이 그리고 넥스트블록은 랜덤으로 그림
      renderBlocks();
      const randomMiniNext = Object.entries(BLOCKS)[Math.floor(Math.random() * BLOCKSlength)];
      nextItem.type = randomMiniNext[0];
      nextItem.top = 1;
      nextItem.left = 1;
      nextItem.direction = 0;
      renderNextBlocks();
    }
  }

  //
  const $playboardUl = document.querySelector('.playboard > ul');
  const $miniboardUl = document.querySelector('.miniboard > ul');

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

  function init() {
    $scoreboardNow.textContent = 0;
    const $scoreboardHigh = document.querySelector('.high_score');

    if (localStorage.getItem('Tetris최고점수')) {
      $scoreboardHigh.innerHTML = localStorage.getItem('Tetris최고점수');
    }
    function makeBoard($target, row, col) {
      for (let i = 0; i < row; i++) {
        makeNewLine($target, row, col);
      }
    }

    movingItemTmp = { ...movingItem };
    makeBoard($playboardUl, ROWS, COLS);
    makeBoard($miniboardUl, MINIROWSCOLS, MINIROWSCOLS);
    generateNewBlock();
  }

  let isInit = true;
  init();

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

  // $retryButton.addEventListener('click', () => {
  //   $playboard.innerHTML = '';
  //   $miniboard.innerHTML = '';
  //   $gameover.style.display = 'none';
  //   isInit = true;
  //   init();
  // });
}

/* 
<div class="gamezone">
  <div class="playboard"> 
    <ul></ul>
  </div>
  <div class="sideboard"> 
    <div class="miniboard">
      <div class="textCenter" style="color: #fdfffb">NEXT</div>
      <ul></ul>
    </div>
    <div class="userlist"></div>
  </div>
</div>
 */
