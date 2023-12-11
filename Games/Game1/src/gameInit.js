import { imageShuffle, imageContainer } from './utils.js';
const $ = document;

export default function GameInit({ $target, initialState }) {
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
    }, 6000); // 5초에 렌더링이 되도록
  };
  this.render();
}
