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
    boardInfo: [],
  };

  this.setState = nextState => {
    this.state = nextState;
  };

  new Header({ $target });

  const checkStatus = () => {
    // const currentList = this.state.boardInfo[0];//state방식
    const currentList = [...imageContainer.children];
    const unMatchedList = currentList.filter((li, index) => {
      return Number(li.getAttribute('data-index')) !== index;
    });
    if (unMatchedList.length === 0) {
      //게임 종료 조건
      if (Number(getItem()) > time) {
        setItem(time);
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
    this.setState({ isPlaying: true, boardInfo: [gameInit.state] });
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
      if (time === 60) {
        activeCheat();
      }
      playTime.innerText = time;
      time++;
    }, 1000);
    // }, 5000);

    console.log(board.state);
  };

  startButton.addEventListener('click', () => {
    playTime.innerText = '시작!!';
    this.init();
  });

  // console.log(startButton, stopButton);
  // 일단 주석처리
  // stopButton.addEventListener('click', () => {
  //   if (stopButton.innerText === 'Stop') {
  //     stopButton.innerText = 'Paused';
  //     clearInterval(timeinterval);
  //   } else {
  //     stopButton.innerText = 'Stop';
  //     timeinterval = setInterval(() => {
  //       console.log(this.state);
  //       checkStatus();
  //       playTime.innerText = time;
  //       time++;
  //     }, 1000);
  //   }
  // });

  // 체크 스테이터스는 상태가 변할때마다 체크해줘야한다.
  // 관건은 어디서 어떻게 가지고 오냐가 관건.
}
