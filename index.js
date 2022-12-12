const body = document.querySelector('body')

body.style.margin = 0;
body.style.overflow = 'hidden'
body.style.cursor = 'none'

const card = document.querySelector('#card');
const canvasDOM = document.querySelector('canvas');

const WIDTH = (canvasDOM.width = innerWidth);
const HEIGHT = (canvasDOM.height = innerHeight);
const canvas = canvasDOM.getContext('2d');

const circleArray = [];
const colorArray = [
    'white',
    'cornsilk',
    'fuchsia',
    'chocolate',
    'cornflowerblue',
    'crimson',
    'rebeccapurple',
    'darkviolet',
    'darkgoldenrod',
    'white',
    'forestgreen',
    'aquamarine',
    'lightslategrey',
    'blue',
    'black',
    'chartreuse',
    'aliceblue',
    'darkmagenta'
];

const mouse = {
    x: undefined,
    y: undefined
};

const drawFish = () => {

    canvas.beginPath();
    canvas.fillStyle = 'red';
    canvas.moveTo(mouse.x, mouse.y);
    canvas.lineTo(mouse.x + 100, mouse.y - 60);
    canvas.lineTo(mouse.x + 100, mouse.y + 60);
    canvas.fill();
    canvas.beginPath();
    canvas.fillRect(mouse.x + 100, mouse.y - 60, 100, 120);
    canvas.beginPath();
    canvas.moveTo(mouse.x + 200, mouse.y + 60);
    canvas.lineTo(mouse.x + 250, mouse.y);
    canvas.lineTo(mouse.x + 200, mouse.y - 60);
    canvas.fill();
    canvas.beginPath();
    canvas.moveTo(mouse.x + 220, mouse.y);
    canvas.lineTo(mouse.x + 300, mouse.y + 30);
    canvas.lineTo(mouse.x + 300, mouse.y - 30);
    canvas.fill();
    canvas.beginPath();
    canvas.fillStyle = 'white';
    canvas.arc(mouse.x + 60, mouse.y, 15, 0, 2 * Math.PI);
    canvas.fill();
    canvas.beginPath();
    canvas.fillStyle = 'black';
    canvas.arc(mouse.x + 60, mouse.y, 5, 0, 2 * Math.PI);
    canvas.fill();
}
const drawFishWithOpenMouse = () => {

    canvas.beginPath();
    canvas.fillStyle = 'red';
    canvas.moveTo(mouse.x, mouse.y + 40);
    canvas.lineTo(mouse.x + 100, mouse.y - 60);
    canvas.lineTo(mouse.x + 100, mouse.y + 60);
    canvas.fill();
    canvas.beginPath();
    canvas.fillRect(mouse.x + 100, mouse.y - 60, 100, 120);
    canvas.beginPath();
    canvas.moveTo(mouse.x + 200, mouse.y + 60);
    canvas.lineTo(mouse.x + 250, mouse.y);
    canvas.lineTo(mouse.x + 200, mouse.y - 60);
    canvas.fill();
    canvas.beginPath();
    canvas.moveTo(mouse.x + 220, mouse.y);
    canvas.lineTo(mouse.x + 300, mouse.y + 30);
    canvas.lineTo(mouse.x + 300, mouse.y - 30);
    canvas.fill();
    canvas.beginPath();
    canvas.fillStyle = 'white';
    canvas.arc(mouse.x + 60, mouse.y, 15, 0, 2 * Math.PI);
    canvas.fill();
    canvas.beginPath();
    canvas.fillStyle = 'black';
    canvas.arc(mouse.x + 60, mouse.y, 5, 0, 2 * Math.PI);
    canvas.fill();
}
const drawBackground = () => {

    const g = canvas.createLinearGradient(0, 0, 0, HEIGHT);
    g.addColorStop(0.0, 'skyblue');
    g.addColorStop(0.4, 'dodgerblue');
    g.addColorStop(0.7, 'mediumblue');
    g.addColorStop(1.0, 'darkblue');
    canvas.fillStyle = g;
    canvas.fillRect(0, 0, WIDTH, HEIGHT);
}

class Circle {
    constructor(x, y, r, dx, dy, color) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.dx = dx;
        this.dy = dy;
        this.color = color;
    }
    draw(index) {

        canvas.beginPath();
        canvas.fillStyle = this.color;
        canvas.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        canvas.fill();

        if (this.x + this.r > WIDTH || this.x - this.r < 0) {

            this.dx = -this.dx;
        }

        if (this.y + this.r > HEIGHT || this.y - this.r < 0) {

            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        if (mouse.x - this.x < 10 && mouse.x - this.x > -10 && mouse.y - this.y < 10 && mouse.y - this.y > -10) {

            drawFishWithOpenMouse();
            circleArray.splice(index, 1)
            card.innerHTML = circleArray.length
        }
    };
}
const animation = () => {

    drawBackground();

    for (i = 0; i < circleArray.length; i += 1) {
        circleArray[i].draw(i);
    }

    drawFish();
    requestAnimationFrame(animation);
}

const init = () => {

    addEventListener('mousemove', function (e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    animation();

    for (i = 0; i < 100; i += 1) {

        const r = (Math.random() * 20) + 5;
        const dx = Math.random() * 4;
        const dy = Math.random() * 4;
        const x = Math.random() * (WIDTH - 2 * r) + r;
        const y = Math.random() * (HEIGHT - 2 * r) + r;
        const color = colorArray[Math.floor(Math.random() * colorArray.length)];
        circleArray.push(new Circle(x, y, r, dx, dy, color));
    }
}

init()

