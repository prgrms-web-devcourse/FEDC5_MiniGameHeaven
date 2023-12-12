import dummyData from './dummy.json' assert { type: 'json' };
import getDataFromFireBase from './dataStore.js';
import { addNewData, updateData, getData, deleteData } from './firebase/firebase.js'; //firebase에 데이터 추가

const $input = document.querySelector('.modal');
const $container = document.querySelector('.container');
const $inputBtn = document.querySelector('.input-button');
const $logoutBtn = document.querySelector('.title-logout');

let fetchedData = null; // FireBase에서 가져온 데이터

(async () => {
  try {
    fetchedData = await getDataFromFireBase();
    console.log(fetchedData);
  } catch (error) {
    console.error(error);
  }
})();

const globalState = dummyData;

let value = '';
function isUsername() {
  const username = localStorage.getItem('username');
  displayUsername();

  return username ? true : false;
}

if ($input) {
  $input.style.opacity = isUsername() ? 0 : 1;
}
if ($container) {
  $container.style.opacity = isUsername() ? 1 : 0;
}

isUsername() && $logoutBtn && ($logoutBtn.style.display = 'block');

function checkUsername(value) {
  if (value.trim() !== '') {
    localStorage.setItem('username', value);
    $container.style.opacity = isUsername() ? 1 : 0;
    $logoutBtn.style.display = 'block';
    document.querySelector('.username-input').value = '';
    $input.style.opacity = 0;
  }
}
$input.addEventListener('keyup', e => {
  e.preventDefault();
  value = e.target.value;
  if (e.key === 'Enter') {
    checkUsername(value);
  }
});
$inputBtn.addEventListener('click', e => {
  checkUsername(value);
});

$logoutBtn.addEventListener('click', e => {
  logout();
});

function displayUsername() {
  const $username = localStorage.getItem('username');
  const $titleUsername = document.querySelector('.title-username');

  if ($titleUsername) {
    $titleUsername.textContent = $username;
  }
}

function logout() {
  const result = window.confirm('로그아웃 하시겠습니까?');

  if (result) {
    window.localStorage.clear();
    location.reload();
  }
}

// firebase테스트
const newWinnerData = {
  //game2에 신기록 세운 new user data
  // game2: {
  name: 'doraemon',
  score: 991,
  // },
};
const newUserData = {
  // 새로운 참여자가 생긴경우 파라미터 database에 유저명을 보내줘야함! 따로 보간법 필요
  // 그 새로운 유저의 게임 결과
  // 아직 안한 게임에 대해선 초기화값 0 필요
  game1: 11,
  game2: 22,
  game3: 33,
  game4: 44,
};

const $fbset = document.querySelector('.fb_test_set');
const $fbupdate = document.querySelector('.fb_test_update');
const $fbdelete = document.querySelector('.fb_test_delete');
const $fbget = document.querySelector('.fb_test_get');
const $fbget_winner = document.querySelector('.fb_test_get_winner');

$fbset.addEventListener('click', () => addNewData('usersData/park', newUserData)); //유저명 임의로 park로 지정함
$fbupdate.addEventListener('click', () => updateData('winnerData/game2', newWinnerData));
$fbdelete.addEventListener('click', () => deleteData('usersData/lee'));
$fbget.addEventListener('click', () => getData('usersData'));
$fbget_winner.addEventListener('click', () => getData('winnerData'));

export default globalState;
