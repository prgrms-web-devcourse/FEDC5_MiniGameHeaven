import Header from './Header.js';
import Board from './board.js';
import GameInit from './gameInit.js';
import { imageContainer, startButton, stopButton, playTime } from './utils.js';

const $ = document;

export default function App({ $target }) {
  console.log(`hello game1`);

  this.state = {};

  this.setState = nextState => {
    this.state = nextState;
  };

  new Header({ $target });

  // if 버튼이 눌리면
  let timeinterval = null;
  let time = 0;
  this.init = () => {
    const board = new Board({ $target: imageContainer, initialState: {} });
    console.log(board.state);
    const gameInit = new GameInit({ $target: imageContainer, initialState: board.state });
    this.setState = gameInit.state;
    board.setState = this.state;

    timeinterval = setInterval(() => {
      playTime.innerText = time;
      time++;
    }, 1000);

    console.log(board.state);
  };

  startButton.addEventListener('click', () => {
    this.init();
  });

  console.log(startButton, stopButton);
  stopButton.addEventListener('click', () => {
    if (stopButton.innerText === 'Stop') {
      stopButton.innerText = 'Paused';
      clearInterval(timeinterval);
    } else {
      stopButton.innerText = 'Stop';
      timeinterval = setInterval(() => {
        playTime.innerText = time;
        time++;
      }, 1000);
    }
  });

  // 체크 스테이터스는 상태가 변할때마다 체크해줘야한다.
  // 관건은 어디서 어떻게 가지고 오냐가 관건.
}
