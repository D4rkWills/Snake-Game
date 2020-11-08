const Points= document.getElementById("points");
const Record= document.getElementById("record");
const random= (min, max) => Math.floor(Math.random() * (max - min - 1) + min);
var snake;
var count= 0;
var fruit;
var points= 0;
var record= 0;
var vel= 200;
var velCount= 0;
var pointCount= 0;
const init= function() {
    context.clearRect(0, 0, width, height);
    snake= new Snake(300, 200, 10, 0, "rgb(5, 167, 5)");
    snake.add();
    snake.add();
    fruit= {
        x: 0,
        y: 0,
        alive: false,
        type: ""
    };
    points= 0;
    path= [];
    velCount= 0;
    vel= 200;
    pointCount= 0;
};
const move= function(event) {
    let moves= {
        ArrowUp: () => {snake.velY= -10; snake.velX= 0},
        ArrowLeft: () => {snake.velX= -10; snake.velY= 0},
        ArrowDown: () => {snake.velY= 10; snake.velX= 0},
        ArrowRight: () => {snake.velX= 10; snake.velY= 0}
    };
    if (moves[event.key]) {
        moves[event.key]();
    };
};
const isOverSnake= function(x, y) {
    for (pos in path) {
        if (x== path[pos].x && y== path[pos].y) {
            return true;
        };
    };
    return false;
};
const update= function() {
    Record.innerHTML="Record: " + record.toString();
    Points.innerHTML="Points: " + points.toString();
    for (pos in path) {
        if (path[pos].type=="piece") {
            if (snake.x== path[pos].x && snake.y== path[pos].y) {
                init();
            };
        };
    };
    snake.draw();
    if (!fruit.alive) count+= 10;
    if (count>= 100) {
        let chances= [0, 0, 0, 0, 0, 0, 0, 0, 1, 1];
        let type= chances[random(0, 10)];
        fruit.x= random(0, 60) * 10;
        fruit.y= random(0, 40) * 10;
        if (type== 0) {
            context.fillStyle="red";
            fruit.type="common";
        } else {
            context.fillStyle="purple";
            fruit.type="super;"
        };
        if (!isOverSnake(fruit.x, fruit.y)) {
            context.fillRect(fruit.x, fruit.y, 10, 10);
            fruit.alive= true;
            count= 0;
        };
    };
    if (snake.x== fruit.x && snake.y== fruit.y && fruit.alive) {
        if (fruit.type=="common") {
            snake.add();
            points+= 10;
            pointCount+= 10;
        } else if (fruit.type="super") {
            for (let i= 1;i<= 10;i++) {
                snake.add();
            };
            points+= 50;
            pointCount+= 50;
        };
        fruit.alive= false;
    };
    if (points> record) {
        record= points;
    };
    if (pointCount>= 100) {
        pointCount-= 100;
        vel-= 5;
        if (vel< 10) vel= 10;
    };
};
setInterval(() => {
    velCount+= 10;
    if (velCount>= vel) {
        velCount= 0;
        update();
    };
}, 10);
init();
document.addEventListener("keydown", move);
