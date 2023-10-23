const $ = document;
export default function Board({ $target, initialState }) {
  this.state = initialState;
  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  function createImageTiles() {
    const tempArray = [];
    Array(16)
      .fill()
      .forEach((_, index) => {
        const li = $.createElement('li');
        li.setAttribute('data-index', index);
        li.classList.add(`list${index}`);
        li.setAttribute('draggable', 'true');
        tempArray.push(li);
      });

    return tempArray;
  }

  this.render = () => {
    const temp = createImageTiles();
    temp.forEach(tile => {
      $target.appendChild(tile);
    });
  };
  this.render();
}
