const $input = document.querySelector('.modal');
const $container = document.querySelector('.container');
const $inputBtn = document.querySelector('.input-button');
const $logoutBtn = document.querySelector('.title-logout');

let value = '';
function isUsername() {
  const username = localStorage.getItem('username');
  displayUsername();

  return username ? true : false;
}
$input.style.opacity = isUsername() ? 0 : 1;
$container.style.opacity = isUsername() ? 1 : 0;
isUsername() && ($logoutBtn.style.display = 'block');

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
  document.querySelector('.title-username').textContent = $username;
}

function logout() {
  window.localStorage.clear();
  location.reload();
}
