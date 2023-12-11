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
import globalState from '../../../index.js';

const $ = document;

export default function App({ $target }) {
  console.log(globalState);
  console.log(`hello game1`);

  this.state = {
    isPlaying: false,
    boardInfo: [],
  };

  this.setState = nextState => {
    this.state = nextState;
  };

  const header = new Header({ $target });

  const checkStatus = () => {
    const currentList = [...imageContainer.children]; //li를 긁어오는 방식
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
      clearInterval(timeinterval);
    }
  };

  let timeinterval = null;
  let time = 0;

  this.init = () => {
    const board = new Board({ $target: imageContainer, initialState: {} });
    const gameInit = new GameInit({ $target: imageContainer, initialState: board.state });
    this.setState({ isPlaying: true, boardInfo: gameInit.state });
    board.setState(this.state.boardInfo);

    timeinterval = setInterval(() => {
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
  };

  startButton.addEventListener('click', () => {
    time = 0;
    imageContainer.innerHTML = '';
    clearInterval(timeinterval);
    playTime.innerText = '시작!!';
    this.init();
  });

  stopButton.addEventListener('click', () => {
    if (time > 5) {
      if (stopButton.innerText === 'Stop') {
        stopButton.innerText = 'Paused';
        clearInterval(timeinterval);
      } else {
        stopButton.innerText = 'Stop';
        timeinterval = setInterval(() => {
          checkStatus();
          playTime.innerText = time;
          time++;
        }, 1000);
      }
    }
  });
}
