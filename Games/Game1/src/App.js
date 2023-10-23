import Header from './Header.js';
import Board from './board.js';

const $ = document;
const imageContainer = $.querySelector('.wrap__imageContainer');
const startButton = $.querySelector('.wrap__startButton');
const gameCompleteText = $.querySelector('.wrap__gameCompleteText');
const playTime = $.querySelector('.wrap__playTime');

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

  this.render = () => {};
}
