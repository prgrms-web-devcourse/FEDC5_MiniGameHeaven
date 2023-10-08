const $canvas = document.getElementById('canvas');
const ctx = $canvas.getContext('2d');

$canvas.width = window.innerWidth - 100;
$canvas.height = window.innerHeight - 100;

const dino = {
  // 추후 머쓱이로 면경
  x: 10,
  y: 200,
  width: 50,
  height: 50,
  draw() {
    ctx.fillStyle = 'teal';
    ctx.fillRect(this.x, this.y, this.width, this.height); // 10,10 위치에 100 * 100 size의 사각형을 그린다
  },
};

class Cactus {
  constructor() {
    this.x = 500;
    this.y = 200;
    this.width = 50;
    this.height = 50;
  }

  draw() {
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
