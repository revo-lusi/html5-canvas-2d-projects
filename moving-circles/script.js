const canvas = document.getElementById("my-canvas");
const c = canvas.getContext("2d");
let circles = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

animate();

// Event Listeners
document.body.addEventListener("click", function (e) {
  makeCircleAnimation(e);
});

// document.body.addEventListener("mousemove", function (e) {
//   makeCircleAnimation(e);
// });

document.body.addEventListener("touchstart", function (e) {
  makeCircleAnimation(e);
});

document.body.addEventListener("touchmove", function (e) {
  makeCircleAnimation(e);
});

// Functions
function Circle(x, y, r, dx, dy, color) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.dx = dx;
  this.dy = dy;
  this.color = color;

  this.draw = function () {
    c.fillStyle = color;
    c.beginPath();
    c.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    c.fill();
    c.stroke();
  };

  this.update = function () {
    if (this.x + this.r >= innerWidth || this.x - this.r <= 0) {
      this.dx = -this.dx;
    } else if (this.y + this.r >= innerHeight || this.y - this.r <= 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  };
}

function makeCircleAnimation(e) {
  let x = e.x;
  if (e.x + 50 >= innerWidth) {
    x = innerWidth - 51;
  } else if (e.x - 50 <= 0) {
    x = 51;
  }

  let y = e.y;
  if (e.y + 50 >= innerHeight) {
    y = innerHeight - 51;
  } else if (e.y - 50 <= 0) {
    y = 51;
  }

  let d = [4, -4][Math.floor(Math.random() * 2)];

  let r = Math.floor(Math.random() * 255);
  let g = Math.floor(Math.random() * 255);
  let b = Math.floor(Math.random() * 255);
  let color = `rgb(${r},${g},${b})`;

  circles.push(new Circle(x, y, 50, d, d, color));
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);

  for (let i = 0; i < circles.length; i++) {
    circles[i].update();
  }
}
