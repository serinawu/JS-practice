var canvas = document.getElementById('canvas');
var c = canvas.getContext("2d");
canvas.width = tX;
canvas.height = tY;

var mouseX = 0;
var mouseY = 0;

addEventListener("mousemove", function() {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

