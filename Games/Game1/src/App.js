import Header from './header.js';
import Board from './board.js';
import GameInit from './gameInit.js';
import EventParser from './eventParser.js';
import { imageContainer, startButton, stopButton, playTime } from './utils.js';

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

    const eventParser = new EventParser({
      $target: imageContainer,
      isPlaying: this.state.isPlaying,
    });

    timeinterval = setInterval(() => {
      console.log(this.state);
      playTime.innerText = time;
      time++;
    }, 1000);

    console.log(board.state);
  };

  startButton.addEventListener('click', () => {
    this.init();
  });

  // console.log(startButton, stopButton);
  stopButton.addEventListener('click', () => {
    if (stopButton.innerText === 'Stop') {
      stopButton.innerText = 'Paused';
      clearInterval(timeinterval);
    } else {
      stopButton.innerText = 'Stop';
      timeinterval = setInterval(() => {
        console.log(this.state);
        playTime.innerText = time;
        time++;
      }, 1000);
    }
  });

  // 체크 스테이터스는 상태가 변할때마다 체크해줘야한다.
  // 관건은 어디서 어떻게 가지고 오냐가 관건.
}
