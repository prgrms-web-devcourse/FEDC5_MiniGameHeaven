export default function UserList({ $target }) {
  const dummy = [
    {
      username: '동동이',
      tetris: 9,
      puzzle: 12,
      2048: 15,
      dino: 4,
    },
    {
      username: '튼튼한피자',
      tetris: 2,
      puzzle: 12,
      2048: 5,
      dino: 41,
    },
    {
      username: '리틀포니',
      tetris: 29,
      puzzle: 2,
      2048: 45,
      dino: 0,
    },
  ];
  const $userList = document.createElement('div');
  $target.appendChild($userList);

  this.state = dummy;
  console.log(this.state);
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
