import dummyData from './dummy.json' assert { type: 'json' };
import getDataFromFireBase from './dataStore.js';

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

export default globalState;
