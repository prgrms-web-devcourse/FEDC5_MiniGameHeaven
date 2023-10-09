const $ = document;
const imageContainer = $.querySelector('.wrap__imageContainer');
const startButton = $.querySelector('.startButton');
const gameCompleteText = $.querySelector('.gameCompleteText');
const playTime = $.querySelector('.playTime');

const tileCount = 16;

Array(tileCount)
  .fill()
  .forEach((_, index) => {
    const li = $.createElement('li');
    li.setAttribute('data-index', index);
    li.classList.add(`list${index}`);
    console.log(li);
    console.log(index);
  });
