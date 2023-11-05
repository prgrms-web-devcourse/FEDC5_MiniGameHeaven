import { imageShuffle, imageContainer } from './utils.js';
const $ = document;

export default function GameInit({ $target, initialState }) {
  // 일단 state로 상태를 받아오도록 하자
  const currentList = [...imageContainer.children]; //li를 긁어오는 방식

  this.state = initialState;

  this.setState = nextState => {
    this.state = nextState;
  };

  this.render = () => {
    setTimeout(() => {
      $target.innerHTML = '';
      imageShuffle(currentList).forEach(tile => {
        $target.appendChild(tile);
      });
      // console.log(this.state);
    }, 6000);
  };
  this.render();
}
