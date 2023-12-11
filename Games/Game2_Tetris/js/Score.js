export default function Score({ $target }) {
  const $scoreboard = document.createElement('div');
  $scoreboard.className = 'scoreboard';
  $target.appendChild($scoreboard);

  this.render = () => {
    $scoreboard.innerHTML = `
    <div class="high">
      <div>HIGH</div>
      <div class="high_score">0</div>
    </div>
    <div class="score">
      <div>SCORE</div>
      <div class="now_score">0</div>
    </div>
    `;
  };

  this.render();
}
