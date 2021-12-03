const canvas = document.getElementById("game");
var context = canvas.getContext("2d");
var HEIGHT = 530;
var WIDTH = 300;
var CANVAS_WIDTH = 300;
var CANVAS_HEIGHT = 530;
canvas.height = 530;
canvas.width = 300;
var FPS = 60;
var gravity = 1.5;
var score = 0;
var birdPosition = {
    x:50,
    y:150
}
var plombs = new Array();
plombs[0] = {
    x:context.canvas.width,
    y:0
}
const resize = () => {
    CANVAS_HEIGHT = window.innerHeight;
    CANVAS_WIDTH = window.innerWidth;
    canvas.height = HEIGHT;
    canvas.width = WIDTH;
    canvas.style.height = ""+CANVAS_HEIGHT+"px";
}
const bird = new Image();
bird.src = "images/bird.png";
const plomb1 = new Image();
plomb1.src = "images/plomb1.png";
const plomb2 = new Image();
plomb2.src = "images/plomb2.png";
const ground = new Image(); 
ground.src = "images/ground.png";
const background = new Image();
background.src = "images/background.png"; 
const pointAudio = new Audio();
pointAudio.src = "audio/point.mp3"
resize()
window.addEventListener("resize", resize)
window.addEventListener("keydown", (e) => {
    console.log(e.key)
    if (e.key == " ") {
        birdPosition.y -= 35; 
    }
    if (e.key == "Escape") {
        ; 
    }
});
setInterval( () => {
    context.clearRect(0,0,300, 530);
    context.drawImage(background, 0, 0);
    context.drawImage(ground, 0, context.canvas.height-ground.height);
    context.drawImage(bird, birdPosition.x, birdPosition.y);
    for (let i = 0; i < plombs.length; i++) {
        var space = plomb1.height + 80;
        context.drawImage(plomb1, plombs[i].x, plombs[i].y);
        context.drawImage(plomb2, plombs[i].x, plombs[i].y + space);
        plombs[i].x--;
        if (plombs[i].y + plomb1.height < 80) {
            plombs[i].y = 0;
        }
        if (plombs[i].x == 150) {
            plombs.push({
                x:context.canvas.width,
                y:Math.floor(Math.random()*plomb1.height) - plomb1.height
            })
        }
        if (birdPosition.x + bird.width >= plombs[i].x && 
            birdPosition.x <= plombs[i].x + plomb1.width &&
            (birdPosition.y <= plombs[i].y + plomb1.height || 
                birdPosition.y + bird.height >= plombs[i].y + space) ||
                birdPosition.y + bird.height >= context.canvas.height - ground.height) {
                location.reload();
        }
        if (plombs[i].x == birdPosition.x) {
            score++
            pointAudio.play()
        }
    
    }
    birdPosition.y += gravity;
    context.fillStyle = "rgba(0,0,0,1)";
    context.font = "25px Arial"
    context.fillText("Score: "+score,10,context.canvas.height - 40)
}, 1000/FPS)
