import Header from './Header.js';
import Board from './board.js';
import GameInit from './gameInit.js';
import { imageContainer } from './utils.js';

const $ = document;

export default function App({ $target }) {
  console.log(`hello game1`);

  this.state = {};

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  new Header({ $target });

  // if 버튼이 눌리면
  const board = new Board({ $target: imageContainer, initialState: {} });
  console.log(board.state);
  const gameInit = new GameInit({ $target: imageContainer, initialState: board.state });

  this.render = () => {};
}
