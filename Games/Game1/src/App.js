import Header from './header.js';
import Board from './board.js';
import GameInit from './gameInit.js';
import EventParser from './eventParser.js';
import {
  imageContainer,
  gameCompleteText,
  startButton,
  stopButton,
  playTime,
  activeCheat,
} from './utils.js';
import { getItem, setItem } from './storage.js';

const $ = document;

export default function App({ $target }) {
  console.log(`hello game1`);

  this.state = {
    isPlaying: false,
    isPaused: false, // 현재 멈춰있는지 확인하기 위해서
    isPausedChecker: false, // 게임을 한번이라도 멈췄다면 기록에 포함되지 않음
    boardInfo: [],
  };

  this.setState = nextState => {
    this.state = nextState;
  };

  const header = new Header({ $target });

  const checkStatus = () => {
    // const currentList = this.state.boardInfo; //state방식 -> setState의 문제로 잠시 보류
    const currentList = [...imageContainer.children]; //li를 긁어오는 방식
    console.log(currentList, this.state.boardInfo);

    const unMatchedList = currentList.filter((li, index) => {
      return Number(li.getAttribute('data-index')) !== index;
    });
    if (unMatchedList.length === 0) {
      //게임 종료 조건
      const storedRecord = getItem();
      if (storedRecord > time) {
        setItem(time);
        header.render();
      }
      gameCompleteText.style.display = 'block';
      this.setState({ ...this.state, isPlaying: false });
      console.log(this.state);
      clearInterval(timeinterval);
    }
    console.log(unMatchedList);
  };

  // if 버튼이 눌리면
  let timeinterval = null;
  let time = 0;

  // 항상 전체 배열 state는 app.js에서 가지고 있도록
  this.init = () => {
    const board = new Board({ $target: imageContainer, initialState: {} });
    // console.log(board.state);
    const gameInit = new GameInit({ $target: imageContainer, initialState: board.state });
    // 아 근데 얘를 없애면 board가 안바뀐다..
    this.setState({ isPlaying: true, boardInfo: gameInit.state });
    board.setState(this.state.boardInfo);

    // setTimeout(() => {
    timeinterval = setInterval(() => {
      console.log(time);
      console.log(this.state);
      if (time > 5) {
        checkStatus();
      }
      if (time === 5) {
        const eventParser = new EventParser({
          $target: imageContainer,
          isPlaying: this.state.isPlaying,
        });
      }
      if (time === 6) {
        activeCheat();
      }
      playTime.innerText = time;
      time++;
    }, 1000);

    console.log(board.state);
  };

  startButton.addEventListener('click', () => {
    time = 0;
    imageContainer.innerHTML = '';
    clearInterval(timeinterval);
    playTime.innerText = '시작!!';
    this.init();
  });

  // console.log(startButton, stopButton);
  // 일단 주석처리
  stopButton.addEventListener('click', () => {
    if (time > 5) {
      if (stopButton.innerText === 'Stop') {
        stopButton.innerText = 'Paused';
        clearInterval(timeinterval);
      } else {
        stopButton.innerText = 'Stop';
        timeinterval = setInterval(() => {
          console.log(this.state);
          checkStatus();
          playTime.innerText = time;
          time++;
        }, 1000);
      }
    }
  });

  // 체크 스테이터스는 상태가 변할때마다 체크해줘야한다.
  // 관건은 어디서 어떻게 가지고 오냐가 관건.
}
