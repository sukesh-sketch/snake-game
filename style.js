const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const snakeSize = canvas.width / 20;
const snake_Size = 20;

let head_x = Math.floor(Math.random() * (canvas.width / snakeSize)) * snakeSize;
let head_y = Math.floor(Math.random() * (canvas.height / snakeSize)) * snakeSize;
let food_x = Math.floor(Math.random() * (canvas.width / snakeSize)) * snakeSize;
let food_y = Math.floor(Math.random() * (canvas.height / snakeSize)) * snakeSize;

let x_speed = 0;
let y_speed = 0;
let snake_body = [[head_x, head_y]];
let snake_len = 1;
let speed = 300;
let speeddx = 35;
let highscore = Number(localStorage.getItem("highest_score")) || 0;
document.getElementById("topscore").innerText = highscore;

// play();
var collisionAudio = new Audio('yumy.wav');




function snake() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Move the head
    head_x += x_speed;
    head_y += y_speed;

    // Check for collision with the food
    collision();

    // Update the snake body
    const newHead = [head_x, head_y];
    snake_body.unshift(newHead);

    // Remove the last part of the snake if it's longer than its length
    if (snake_body.length > snake_len) {
        snake_body.pop();
    }

    // Draw the food
    ctx.fillStyle = "yellow";
    ctx.fillRect(food_x, food_y, snake_Size, snake_Size);

    // Draw the snake
    ctx.fillStyle = "black";
    ctx.fillRect(head_x, head_y, snake_Size, snake_Size);

    for (let i = 1; i < snake_body.length; i++) {
        ctx.fillStyle = "blue"
        ctx.fillRect(snake_body[i][0], snake_body[i][1], snake_Size, snake_Size);
    }

    // Check for collision with itself
    for (let i = 1; i < snake_body.length; i++) {
        if (snake_body[i][0] === head_x && snake_body[i][1] === head_y) {

            updateScore()





            alert("Game Over!");
            document.location.reload();
        }
    }
    // check for collision with wall
    if (head_x === -20 || head_y === 400 || head_x === 400 || head_y == -20) {
        updateScore();
        alert("Game Over!");
        document.location.reload();
    }




    setTimeout(snake, speed); // Adjust the speed as needed
}

function collision() {
    if (head_x === food_x && head_y === food_y) {

        collisionAudio.play().catch(error => console.error("Error playing collision sound:", error));

        snake_len++;





        food_x = Math.floor(Math.random() * (canvas.width / snakeSize)) * snakeSize;
        food_y = Math.floor(Math.random() * (canvas.height / snakeSize)) * snakeSize;

        if (snake_len % 1 === 0) {
            speed = Math.max(speed - speeddx, 50);
        }
        let scoreElement = document.getElementById("currentscore");
        if (scoreElement) {
            scoreElement.innerText = snake_len - 1;
        }
    }
}

function navigator() {
    document.addEventListener("keydown", function (event) {
        move(event);
    });
}

function move(event) {
    switch (event.key) {
        case "d":
            if (x_speed !== -snakeSize) {
                x_speed = snakeSize;
                y_speed = 0;
            }
            break;
        case "a":
            if (x_speed !== snakeSize) {
                x_speed = -snakeSize;
                y_speed = 0;
            }
            break;
        case "w":
            if (y_speed !== snakeSize) {
                x_speed = 0;
                y_speed = -snakeSize;
            }
            break;
        case "s":
            if (y_speed !== -snakeSize) {
                x_speed = 0;
                y_speed = snakeSize;
            }
            break;
    }
}


function play() {
    var audio = new Audio('music.wav');

    audio.play();
    audio.loop = true;
}
function updateScore() {
    let current_score = snake_len - 1;


    if (highscore === null) {
        localStorage.setItem("highest_score", current_score);
    } else if (current_score > highscore) {
        localStorage.setItem("highest_score", current_score);
    }
}
snake();
navigator();

function openpopup() {
    let rulebtn = document.getElementById("rulesdescription");
    rulebtn.style.display = "block";
}

function closepopup() {
    let rulesDesc = document.getElementById("rulesdescription");
    if (rulesDesc) {
        rulesDesc.style.display = "none"; // Hide the element by setting display to none
        console.log("Popup closed");
    } else {
        console.log("rulesdescription element not found");
    }
}
