export default function UserList({ $target }) {
  const $userList = document.createElement('div');
  $target.appendChild($userList);

  this.state = dummy;

  $userList.innerHTML = `
    <ul style="color:white">
    ${this.state
      .map(
        user =>
          `<li>
      ${user.username} - ${user.tetris}
      </li>`
      )
      .join('')}
    </ul>
  `;
}
