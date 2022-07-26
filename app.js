var canvas = document.getElementById('canvas');
var w = canvas.width = window.innerWidth;
var h = canvas.height = window.innerHeight;
var c = canvas.getContext('2d');
var an;
var drawBackground;
var i;
var fish;
var CircleArray = [];
var colorArray = [
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

var mouse = {
    x: undefined,
    y: undefined
};

window.addEventListener('mousemove', function (e) {
    
    'use strict';
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});
function DrawFish() {
    
    'use strict';
    c.beginPath();
    c.fillStyle = 'red';
    c.moveTo(mouse.x, mouse.y);
    c.lineTo(mouse.x + 100, mouse.y - 60);
    c.lineTo(mouse.x + 100, mouse.y + 60);
    c.fill();
    c.beginPath();
    c.fillRect(mouse.x + 100, mouse.y - 60, 100, 120);
    c.beginPath();
    c.moveTo(mouse.x + 200, mouse.y + 60);
    c.lineTo(mouse.x + 250, mouse.y);
    c.lineTo(mouse.x + 200, mouse.y - 60);
    c.fill();
    c.beginPath();
    c.moveTo(mouse.x + 220, mouse.y);
    c.lineTo(mouse.x + 300, mouse.y + 30);
    c.lineTo(mouse.x + 300, mouse.y - 30);
    c.fill();
    c.beginPath();
    c.fillStyle = 'white';
    c.arc(mouse.x + 60, mouse.y, 15, 0, 2 * Math.PI);
    c.fill();
    c.beginPath();
    c.fillStyle = 'black';
    c.arc(mouse.x + 60, mouse.y, 5, 0, 2 * Math.PI);
    c.fill();
}
function DrawFish2() {
    
    'use strict';
    c.beginPath();
    c.fillStyle = 'red';
    c.moveTo(mouse.x, mouse.y + 40);
    c.lineTo(mouse.x + 100, mouse.y - 60);
    c.lineTo(mouse.x + 100, mouse.y + 60);
    c.fill();
    c.beginPath();
    c.fillRect(mouse.x + 100, mouse.y - 60, 100, 120);
    c.beginPath();
    c.moveTo(mouse.x + 200, mouse.y + 60);
    c.lineTo(mouse.x + 250, mouse.y);
    c.lineTo(mouse.x + 200, mouse.y - 60);
    c.fill();
    c.beginPath();
    c.moveTo(mouse.x + 220, mouse.y);
    c.lineTo(mouse.x + 300, mouse.y + 30);
    c.lineTo(mouse.x + 300, mouse.y - 30);
    c.fill();
    c.beginPath();
    c.fillStyle = 'white';
    c.arc(mouse.x + 60, mouse.y, 15, 0, 2 * Math.PI);
    c.fill();
    c.beginPath();
    c.fillStyle = 'black';
    c.arc(mouse.x + 60, mouse.y, 5, 0, 2 * Math.PI);
    c.fill();
}
function DrawBackground() {
    
    'use strict';
    var g = c.createLinearGradient(0, 0, 0, canvas.height);
    g.addColorStop(0.0, 'skyblue');
    g.addColorStop(0.4, 'dodgerblue');
    g.addColorStop(0.7, 'mediumblue');
    g.addColorStop(1.0, 'darkblue');
    c.fillStyle = g;
    c.fillRect(0, 0, canvas.width, canvas.height);
}

function Circle(x, y, speedx, speedy, r, color) {

    'use strict';
    this.x = x;
    this.y = y;
    this.r = r;
    this.speedx = speedx;
    this.speedy = speedy;
    this.color = color;
    this.Draw = function () {
        
        c.beginPath();
        c.fillStyle = this.color;
        c.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        c.fill();

        if (this.x + this.r > canvas.width || this.x - this.r < 0) {

            this.speedx = -this.speedx;
        }

        if (this.y + this.r > canvas.height || this.y - this.r < 0) {

            this.speedy = -this.speedy;
        }
        this.x += this.speedx;
        this.y += this.speedy;

        if (mouse.x - this.x < 10 && mouse.x - this.x > -10 && mouse.y - this.y < 10 && mouse.y - this.y > -10) {

            fish = new DrawFish2();
            this.r = 0;
        }
    };
}
function Animation() {
    
    'use strict';
    drawBackground = new DrawBackground();
    fish = new DrawFish();
    for (i = 0; i < CircleArray.length; i += 1) {
        CircleArray[i].Draw();
    }
    window.requestAnimationFrame(Animation);
}
for (i = 0; i < 100; i += 1) {
    
    var r = Math.random() * 20;
    var speedx = Math.random() * 4;
    var speedy = Math.random() * 4;
    var x = Math.random() * (window.innerWidth - 2 * r) + r;
    var y = Math.random() * (window.innerHeight - 2 * r) + r;
    var color = colorArray[Math.floor(Math.random() * colorArray.length)];
    CircleArray.push(new Circle(x, y, speedx, speedy, r, color));
}
an = new Animation();