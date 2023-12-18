var canvas = document.getElementById('canvas');
var c = canvas.getContext("2d");
var tX = canvas.width;
var tY = canvas.height;

var mouseX = 0;
var mouseY = 0;

document.addEventListener("mousemove", function(event) {
    //取得滑鼠在整個頁面中的座標
    var pageX = event.pageX;
    var pageY = event.pageY;

    //取得canvas在整個頁面中的位置
    var canvasReact = canvas.getBoundingClientRect();

    //計算滑鼠在canvas內的相對座標
    mouseX = pageX - canvasReact.left;
    mouseY = pageY - canvasReact.top;
    
    //將座標限縮在 canvas內
    mouseX = Math.max(0, Math.min(mouseX, canvas.width));
    mouseY = Math.max(0, Math.min(mouseY, canvas.height));

    console.log('mouse moved', mouseX, mouseY);
});


var gravity = 0.88;
c.strokeWidth = 5;
function randomColor() {
    return (
        "rgba(" +
        Math.round(Math.random() * 250) +
        "," +
        Math.round(Math.random() * 250) +
        "," +
        Math.round(Math.random() * 250) +
        "," +
        Math.ceil(Math.random() * 10) / 10 +
        ")"
    );
}

function Ball () {
    this.color = randomColor();
    this.radius = Math.random() * (25 - 10) + 10;
    this.startRadius  = this.radius;
    this.x = Math.random() * (tX - this.radius * 2) + this.radius;
    this.y = Math.random() * (tY - this.radius);
    this.dY = Math.random((Math.random() * 2));
    this.dX = Math.round((Math.random() * 1) + 1);
    this.vel = Math.random() / 5;
    this.update = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        c.fillStyle = this.color;
        c.fill();
    };
}

var bal = [];
for (var i = 0; i < 30; i++) {
    bal.push(new Ball());
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, tX, tY);
    for (var i = 0; i < bal.length; i++) {
        bal[i].update();
        bal[i].y += bal[i].dY;
        bal[i].x += bal[i].dX;
        
        if (bal[i].y + bal[i].radius >= tY - bal[i].radius) {
            bal[i].dY = -bal[i].dY * gravity;
        } else {
            bal[i].dY += bal[i].vel;
        }

        if (bal[i].x + bal[i].radius > tX ||
         bal[i].x - bal[i].radius < 0) {
            bal[i].dX = - bal[i].dX;
        }

        if (
            mouseY > bal[i].y - bal[i].radius &&
            mouseY < bal[i].y + bal[i].radius &&
            mouseX > bal[i].x - bal[i].radius &&
            mouseX < bal[i].x + bal[i].radius &&
            bal[i].radius < 70) {
                bal[i].radius += 5;
        } else {
            if (bal[i].radius > bal[i].startRadius) {
                bal[i].radius += -5;
            }
        }
    }
}

animate();

setInterval(function(){
    bal.push(new Ball());
    bal.splice(0, 1);
}, 400);
