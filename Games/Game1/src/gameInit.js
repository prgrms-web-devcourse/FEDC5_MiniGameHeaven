import { imageShuffle } from './utils.js';
const $ = document;

export default function GameInit({ $target, initialState }) {
  // 일단 state로 상태를 받아오도록 하자
  this.state = initialState;

  this.setState = nextState => {
    this.state = nextState;
  };

  this.render = () => {
    setTimeout(() => {
      $target.innerHTML = '';
      imageShuffle(this.state).forEach(tile => {
        $target.appendChild(tile);
      });
    }, 6000);
  };
  this.render();
}
