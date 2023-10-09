const $ = document;
const imageContainer = $.querySelector('.wrap__imageContainer');
const startButton = $.querySelector('.startButton');
const gameCompleteText = $.querySelector('.gameCompleteText');
const playTime = $.querySelector('.playTime');

const tileCount = 16;

let tiles = [];
tiles = createImageTiles();
console.log(tiles);

imageShuffle(tiles).forEach(tile => {
  imageContainer.appendChild(tile);
});

function createImageTiles() {
  const tempArray = [];
  Array(tileCount)
    .fill()
    .forEach((_, index) => {
      const li = $.createElement('li');
      li.setAttribute('data-index', index);
      li.classList.add(`list${index}`);
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
