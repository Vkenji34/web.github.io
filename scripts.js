const canvas = document.getElementById('animatedBackground');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Dot {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.velocityX = Math.random() * 2 - 1;
        this.velocityY = Math.random() * 2 - 1;
        this.color = this.randomColor();
    }

    randomColor() {
        const colors = ['#577399', '#fe5f55', '#fee440'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        this.x += this.velocityX;
        this.y += this.velocityY;

        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.velocityX = -this.velocityX;
        }

        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.velocityY = -this.velocityY;
        }

        this.draw();
    }
}

const dotsArray = [];

for (let i = 0; i < 100; i++) {
    const radius = 2;
    const x = Math.random() * (canvas.width - radius * 2) + radius;
    const y = Math.random() * (canvas.height - radius * 2) + radius;
    dotsArray.push(new Dot(x, y, radius));
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < dotsArray.length; i++) {
        dotsArray[i].update();
    }
}

animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    dotsArray.length = 0;
    for (let i = 0; i < 100; i++) {
        const radius = 2;
        const x = Math.random() * (canvas.width - radius * 2) + radius;
        const y = Math.random() * (canvas.height - radius * 2) + radius;
        dotsArray.push(new Dot(x, y, radius));
    }
});