const $ = document;
const imageContainer = $.querySelector('.wrap__imageContainer');
const startButton = $.querySelector('.startButton');
const gameCompleteText = $.querySelector('.gameCompleteText');
const playTime = $.querySelector('.playTime');

const tileCount = 16;

createGame();

function createGame() {
  let tiles = [];
  tiles = createImageTiles();
  tiles.forEach(tile => {
    imageContainer.appendChild(tile);
  });

  setTimeout(() => {
    imageContainer.innerHTML = '';
    imageShuffle(tiles).forEach(tile => {
      imageContainer.appendChild(tile);
    });
  }, 2000);
}

function createImageTiles() {
  const tempArray = [];
  Array(tileCount)
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

function imageShuffle(array) {
  let index = array.length - 1;
  while (index > 0) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [array[index], array[randomIndex]] = [array[randomIndex], array[index]];
    index--;
  }
  return array;
}

//
imageContainer.addEventListener('dragstart', e => {
  console.log(e);
});

imageContainer.addEventListener('dragover', e => {
  e.preventDefault();
  console.log('over');
});

imageContainer.addEventListener('drop', e => {
  console.log('drop');
});
