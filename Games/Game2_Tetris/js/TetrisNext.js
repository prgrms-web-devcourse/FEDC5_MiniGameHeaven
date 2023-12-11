export default function TetrisNext({ $target }) {
  // $target = .sideboard
  this.render = () => {
    $target.innerHTML = `여기이제 미니 테트리스`;
  };
  this.render();
}
