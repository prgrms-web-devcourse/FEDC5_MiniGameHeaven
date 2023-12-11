import Score from './Score.js';
import Tetris from './TetrisMain.js';
// import TetrisNext from './TetrisNext.js';
// import UserList from './UserList.js';

// $target = .wrapper
export default function App({ $target }) {
  const $scorezone = document.createElement('div');
  $scorezone.className = 'scorezone';
  $target.appendChild($scorezone);

  const $gamezone = document.createElement('div');
  $gamezone.className = 'gamezone';
  $target.appendChild($gamezone);

  this.state = {
    high: 0,
    score: 0,
  };

  new Score({ $target: $scorezone });

  new Tetris({ $target: $gamezone, initialState: this.state });

  // 추후..
  // const $sideboard = document.createElement('div');
  // $sideboard.className = 'sideboard';
  // $gamezone.appendChild($sideboard);
  // new TetrisNext({ $target: $sideboard });

  // new UserList({ $target: $sideboard });

  this.render = () => {
    // 화면그리기
  };
  this.render();
}
