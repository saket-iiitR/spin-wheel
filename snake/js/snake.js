//----------------CREATING CANVAS----------------------//
const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");


//-------------------LOAD IMAGES-----------------------//
const ground = new Image();
ground.src = "/assets/img/ground.png";

const foodImg = new Image();
foodImg.src = "/assets/img/cvd.png";

const spray = new Image();
spray.src = "/assets/img/spray.png";

const bob = new Image();
bob.src = "/assets/img/bob.png";


//----------------LOAD AUDIO FILES---------------------//
let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();
let bg = new Audio();

dead.src = "/assets/audio/dead.mp3";
dead.volume - 0.1;
eat.src = "/assets/audio/eat.mp3";
eat.volume - 0.1;
up.src = "/assets/audio/up.mp3";
up.volume - 0.1;
right.src = "/assets/audio/right.mp3";
right.volume - 0.1;
left.src = "/assets/audio/left.mp3";
left.volume - 0.1;
down.src = "/assets/audio/down.mp3";
down.volume - 0.1;
bg.src = "/assets/audio/bg.mp3";

// call draw function every 100 ms
bg.volume = 0.4;
bg.loop = true;
bg.play();

//-------------------CREATE SNAKE----------------------//
let snake = [];

// create the unit
const box = 32;

snake[0] = {
    x: 9 * box,
    y: 10 * box
};

//----------------CREATE FOOD----------------------//
let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
}

//----------------CREATE SCORE----------------------//
let score = 0;
let a = 0;
let b = 1;

//----------------CONTROL SNAKE----------------------//
let d = "NULL";

document.addEventListener("keydown", direction);

function direction(event) {
    let key = event.keyCode;
    if (key == 37 && d != "RIGHT") {
        left.play();
        d = "LEFT";
    }
    else if (key == 38 && d != "DOWN") {
        d = "UP";
        up.play();
    }
    else if (key == 39 && d != "LEFT") {
        d = "RIGHT";
        right.play();
    }
    else if (key == 40 && d != "UP") {
        d = "DOWN";
        down.play();
    }
}


//----------------CHECK COLLISION----------------------//
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

//----------------DRAW ON CANVAS----------------------//
let chance = 3;
function draw() {

    ctx.drawImage(ground, 0, 0);

    for (let i = 0; i < snake.length; i++) {

        ctx.fillStyle = (i == 0) ? "green" : "MediumSeaGreen";
        if (i == 0) {
            ctx.drawImage(spray, snake[i].x, snake[i].y);
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 2;
            ctx.strokeRect(snake[i].x, snake[i].y, box, box);
        }
        else {

            ctx.drawImage(bob, snake[i].x, snake[i].y);
            ctx.strokeStyle = '#003300';
            ctx.lineWidth = 2;
            ctx.strokeRect(snake[i].x, snake[i].y, box, box);

        }

    }

    ctx.drawImage(foodImg, food.x, food.y);

    //-------------------------OLD HEAD POS----------------------------//
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //------------------------DIRECTION-------------------------------//
    if (d == "LEFT") snakeX -= box;
    if (d == "UP") snakeY -= box;
    if (d == "RIGHT") snakeX += box;
    if (d == "DOWN") snakeY += box;

    //-----------------------EAT FOOD---------------------------------//
    if (snakeX == food.x && snakeY == food.y) {
        score = a + b;
        b = a + b;
        a = b - a;
        prev = score;
        eat.play();
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        }
        // we don't remove the tail
    } else {
        // remove the tail
        snake.pop();
    }

    // add new Head

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    //-------------------GAME OVER----------------------------------//

    if (snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box || collision(newHead, snake)) {
        clearInterval(game);
        dead.play();
        document.getElementById("favDialog").showModal();
    }

    snake.unshift(newHead);

    ctx.fillStyle = "white";
    ctx.font = "45px Montserrat";
    ctx.fillText(score, 2 * box, 1.6 * box);
}

// call draw function every 150 ms
let game = setInterval(draw, 150);

//------------------------------------------------------------------//