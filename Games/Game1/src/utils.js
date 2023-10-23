const $ = document;

export const FOUR_X_FOUR_NUM = 16;
export const FIVE_X_FIVE_NUM = 25;
export const PUZZLE_HIGH_SCORE_KEY = 'PuzzleHighScore';
export const imageContainer = $.querySelector('.wrap__imageContainer');
export const startButton = $.querySelector('.wrap__startButton');
export const gameCompleteText = $.querySelector('.wrap__gameCompleteText');
export const playTime = $.querySelector('.wrap__playTime');
export const stopButton = $.querySelector('.wrap__stopButton');
export const highScore = $.querySelector('.highScore');

export function imageShuffle(array) {
  let index = array.length - 1;
  while (index > 0) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [array[index], array[randomIndex]] = [array[randomIndex], array[index]];
    index--;
  }
  return array;
}

export function checkStatus() {
  const currentList = [...imageContainer.children];
  const unMatchedList = currentList.filter((li, index) => {
    return Number(li.getAttribute('data-index')) !== index;
  });
  if (unMatchedList.length === 0) {
    //게임 종료 조건
    // storeLocalStorage(time);
    gameCompleteText.style.display = 'block';
    isPlaying = false;
    clearInterval(timeinterval);
  }
}

export function activeCheat() {
  const $cheatButton = $.createElement('div');
  $cheatButton.textContent = 'Cheat!';

  $.querySelector('.wrap').appendChild($cheatButton);

  $cheatButton.addEventListener('click', () => {
    imageContainer
      .querySelectorAll('li')
      .forEach($target => ($target.innerHTML = Number($target.dataset.index) + 1));
  });
}
