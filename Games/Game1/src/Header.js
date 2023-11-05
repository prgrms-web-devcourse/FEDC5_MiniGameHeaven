import { getItem } from './storage.js';
const $ = document;

export default function Header({ $target }) {
  const $highScore = $.createElement('div');
  $highScore.className = 'highScore';
  //appendChild()로 하면 하단에 삽입되기에 상단에 삽입되도록 prepend() 사용
  $target.prepend($highScore);

  this.render = () => {
    const storedHighScore = getItem();
    if (storedHighScore === 9999) {
      $highScore.innerText = `최단 기록 X`;
    } else if (storedHighScore > 0 && storedHighScore < 9999) {
      $highScore.innerText = `최단 기록 ${String(storedHighScore)}초`;
    } else {
      $highScore.innerText = `최단 기록 X`;
    }
  };
  this.render();
}
