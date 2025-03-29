const canvas = document.getElementById("my-canvas");
const c = canvas.getContext("2d");
let arrOfCircles = [];
let counter = 0;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

animate();

// Event Listeners
document.body.addEventListener("click", function (e) {
  makeCircleAnimation(e);
});

document.body.addEventListener("mousemove", function (e) {
  if (counter % 8 == 0) makeCircleAnimation(e);
  counter++;
});

document.body.addEventListener("touchmove", function (e) {
  makeCircleAnimation(e);
});

// Functions
class Circle {
  constructor(x, y, r, dx, dy, color) {
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
}

function makeCircleAnimation(e) {
  let radius = 50;
  let x = e.x || e.touches[0].clientX;
  let y = e.y || touches[0].clientY;
  let direction = [4, -4][Math.floor(Math.random() * 2)];
  let color = `rgb(
  ${Math.floor(Math.random() * 255)},
  ${Math.floor(Math.random() * 255)},
  ${Math.floor(Math.random() * 255)}
  )`;

  if (x + radius >= innerWidth) {
    x = innerWidth - radius + 1;
  } else if (x - radius <= 0) {
    x = radius + 1;
  }

  if (y + radius >= innerHeight) {
    y = innerHeight - radius + 1;
  } else if (y - radius <= 0) {
    y = radius + 1;
  }

  arrOfCircles.push(new Circle(x, y, radius, direction, direction, color));
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);

  arrOfCircles.forEach((circle) => {
    circle.update();
  });
}
