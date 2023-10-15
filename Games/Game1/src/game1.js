const $ = document;
const imageContainer = $.querySelector('.wrap__imageContainer');
const startButton = $.querySelector('.wrap__startButton');
const gameCompleteText = $.querySelector('.wrap__gameCompleteText');
const playTime = $.querySelector('.wrap__playTime');

const tileCount = 16;

const dragged = {
  el: null,
  class: null,
  index: null,
};

let isPlaying = false;
let timeinterval = null;
let time = 0;

function createGame() {
  isPlaying = true;
  let tiles = [];
  time = 0;
  imageContainer.innerHTML = '';
  clearInterval(timeinterval);
  gameCompleteText.style.display = 'none';

  tiles = createImageTiles();
  tiles.forEach(tile => {
    imageContainer.appendChild(tile);
  });

  setTimeout(() => {
    imageContainer.innerHTML = '';
    imageShuffle(tiles).forEach(tile => {
      imageContainer.appendChild(tile);
    });
    timeinterval = setInterval(() => {
      playTime.innerText = time;
      time++;
      if (time == 10) {
        activeCheat();
      }
    }, 1000);
  }, 5000);
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

function checkStatus() {
  const currentList = [...imageContainer.children];
  const unMatchedList = currentList.filter((li, index) => {
    return Number(li.getAttribute('data-index')) !== index;
  });
  if (unMatchedList.length === 0) {
    //게임 종료 조건
    storeLocalStorage(time);
    gameCompleteText.style.display = 'block';
    isPlaying = false;
    clearInterval(timeinterval);
  }
}

//
imageContainer.addEventListener('dragstart', e => {
  if (!isPlaying) {
    return;
  }
  const $object = e.target;
  dragged.el = $object;
  dragged.class = $object.className;
  dragged.index = [...$object.parentNode.children].indexOf($object);
});

imageContainer.addEventListener('dragover', e => {
  e.preventDefault();
  //   console.log('over');
});

imageContainer.addEventListener('drop', e => {
  if (!isPlaying) {
    return;
  }
  const $object = e.target;
  //   console.log({ $object });

  if ($object.className !== dragged.class) {
    let originPlace;
    let isLast = false;

    if (dragged.el.nextSibling) {
      originPlace = dragged.el.nextSibling;
    } else {
      originPlace = dragged.el.previousSibling;
      isLast = true;
    }

    const droppedIndex = [...$object.parentNode.children].indexOf($object);
    dragged.index > droppedIndex ? $object.before(dragged.el) : $object.after(dragged.el);
    isLast ? originPlace.after($object) : originPlace.before($object);
  }
  checkStatus();
});

startButton.addEventListener('click', () => {
  createGame();
});

function activeCheat() {
  const $cheatButton = $.createElement('div');
  $cheatButton.textContent = 'Cheat!';

  $.querySelector('.wrap').appendChild($cheatButton);

  $cheatButton.addEventListener('click', () => {
    imageContainer
      .querySelectorAll('li')
      .forEach($target => ($target.innerHTML = Number($target.dataset.index) + 1));
  });
}
