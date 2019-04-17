var canvas;
var ctx;
var kolo;
var number;
var counter;
var interval;
var interval_number;
var interval_duration;
var interval_counting;
var x;
var y;
var dx = 0;
var dy = 0;
var arrayX = new Array();
var arrayY = new Array();
var arrayS = new Array();
var arrayT = new Array();
var arrayCounter = new Array();
var score = 0;
var total_time;
var flaga = true;
var player;
var counting;

function writeStyle(){
    number.fillStyle = "black";
    number.font = "14px Arial";
}

function cancelingAllIntervals(){
    cancelAnimationFrame(interval);
    clearInterval(interval_number);
    clearInterval(interval_duration);
}

function createRandomSquares(){
    counter = Math.floor(Math.random()*20)+20;

    for(var i = 0; i < counter; i++){
        arrayX[i] = Math.floor(Math.random()*(canvas.width-20));
        arrayY[i] = Math.floor(Math.random()*(canvas.height-50));
        arrayS[i] = 1;
        arrayT[i] = Math.floor(Math.random()*50);
        arrayCounter[i] = 20;
    }

    for(var i = 0; i < counter; i++){
        squaresCollision(i);
    }
}

function changeDirection(e){
    if(e.key == "d") {
        dx = 1;
        dy = 0
    }
    else if(e.key == "a") {
        dx = -1;
        dy = 0;
    }
    else if(e.key == "w"){
        dx = 0;
        dy = -1;
    }
    else if(e.key == "s"){
        dx = 0;
        dy = 1;
    }
    else if(e.key == "q"){
        dx =-1;
        dy = -1;
    }
    else if(e.key == "e"){
        dx = 1;
        dy = -1;
    }
    else if(e.key == "z"){
        dx = -1;
        dy = 1;
    }
    else if(e.key == "x"){
        dx = 1;
        dy = 1;
    }
    else if(e.key == "p" && flaga == true){
        flaga = false;
        cancelingAllIntervals();
        writeStyle();
        number.fillText("Pause" ,canvas.width/2-25, canvas.height-10);
    }
    else if(e.key == "p" && flaga == false){
        flaga = true;
        number.clearRect(0, 0, canvas.width, canvas.height);
        interval = requestAnimationFrame(drawBall);
        interval_number = setInterval(decrement, 1000);
        interval_duration = setInterval(duration,1000);
    }
}

function squaresCollision(i){
    arrayX[i] = Math.floor(Math.random()*(canvas.width-20));
    arrayY[i] = Math.floor(Math.random()*(canvas.height-50));
    arrayS[i] = 1;
    arrayT[i] = Math.floor(Math.random()*50);
    arrayCounter[i] = 20;

    for(var j = 0; j < i; j++ ){
        if(arrayX[i] > arrayX[j]-10 && arrayX[i] < arrayX[j]+30 && arrayY[i] > arrayY[j]-10 && arrayY[i] < arrayY[j] +30){
            arrayX[i] = Math.floor(Math.random()*(canvas.width-20));
            arrayY[i] = Math.floor(Math.random()*(canvas.height-50));
            j = 0;
        }
    }
}

function collision(){
    for(var i = 0; i < counter; i++ ){
        if(x > arrayX[i]-10 && x < arrayX[i]+30 && y > arrayY[i]-10 && y < arrayY[i] +30){
            ctx.clearRect(arrayX[i], arrayY[i], 20, 20);
            score += arrayCounter[i];
            squaresCollision(i);
        }
    }
}

function drawBall() {
    kolo.clearRect(0, 0, canvas.width, canvas.height);
    drawSquares();

    kolo.beginPath();
    kolo.arc(x, y, 10, 0, 2 * Math.PI)
    kolo.fillStyle = "#0095DD";
    kolo.fill();
    kolo.closePath();

    if(x + dx > canvas.width) {
        x = 0;
    }
    if(x + dx < 0){
        x = canvas.width;
    }
    if(y + dy > canvas.height) {
        y = 0;
    }
    if(y + dy < 0){
        y = canvas.height;
    }

    x += dx;
    y += dy;
    interval = requestAnimationFrame(drawBall);
}

function drawSquares(){
    for(var i = 0; i < counter; i++){
        if(arrayS[i] == 1 && arrayCounter[i] >= 0 && arrayT[i] > 0){
            ctx.beginPath();
            ctx.rect(arrayX[i], arrayY[i], 20, 20);
            ctx.fillStyle = "#7FFF00";
            ctx.fill();
            ctx.closePath();
        }
        else
        if(arrayS[i] == 1 && arrayCounter[i] < 0 && arrayT[i] > 0){
            ctx.beginPath();
            ctx.rect(arrayX[i], arrayY[i], 20, 20);
            ctx.fillStyle = "red";
            ctx.fill();
            ctx.closePath();
        }
    }
    drawNumbers();
    drawScore();
    collision();
}

function decrement(){
    for(var i = 0; i < counter; i++){
        arrayT[i]--;
        arrayCounter[i]--;
        if( arrayT[i] <= 0){
            squaresCollision(i);
        }
    }
}

function drawNumbers(){
    for(var i = 0; i < counter; i++){
        if(arrayS[i] == 1 && arrayT[i] > 0){
            writeStyle();
            if(arrayCounter[i] >= 10)
                number.fillText(arrayCounter[i], arrayX[i]+2, arrayY[i]+15);
            else
            if(arrayCounter[i] >= 0)
                number.fillText(arrayCounter[i], arrayX[i]+5, arrayY[i]+15);
            else
            if(arrayCounter[i] > -10)
                number.fillText(arrayCounter[i], arrayX[i]+3, arrayY[i]+15);
            else
                number.fillText(arrayCounter[i], arrayX[i], arrayY[i]+15);

        }
    }
}

function drawScore(){
    writeStyle();
    number.fillText("Score: " + score, 10, canvas.height-10);
    number.fillText("Time left: " + total_time, canvas.width-90, canvas.height-10);
}

function changeTableScore(score){
    for(var i = 1; i <= 10; i++){
        var number = i.toString();
        var scoreTable = document.getElementById(number).innerHTML;
        if(scoreTable < score){
            for(var j = 10; j >number; j--){
                document.getElementById(j).innerHTML = document.getElementById(j-1).innerHTML
                document.getElementById("p" + j).innerHTML = document.getElementById("p" + (j-1)).innerHTML
            }
            document.getElementById(number).innerHTML = score;
            document.getElementById("p" + number).innerHTML = name;
            break;
        }
    }
}

function duration(){
    total_time--;
    if(total_time < 0){
        cancelingAllIntervals();
        dx = 0;
        dy = 0;
        window.alert("Game Over - Score: " + score);

        changeTableScore(score);

        score = 0;
        kolo.clearRect(0, 0, canvas.width, canvas.height);
    }
}

function begin(){
    drawSquares();
    drawScore();
    drawBall();
    interval_number = setInterval(decrement, 1000);
    interval_duration = setInterval(duration,1000);
}

function ready(){
    number.clearRect(0, 0, canvas.width, canvas.height);
    number.fillStyle = "black";
    number.font = "50px Arial";
    number.fillText(counting, x-10, y);
    counting--;
    if(counting < 0){
        clearInterval(interval_counting);
        begin();
    }
}

function Go(){
    dx = 0;
    dy = 0;
    cancelingAllIntervals();
    total_time = 60;
    score = 0;
    counting = 3;

    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    kolo = canvas.getContext("2d");
    number = canvas.getContext("2d");

    document.addEventListener("keydown", changeDirection,false);

    name = window.prompt("Player name:", "Player1");

    createRandomSquares();

    x = canvas.width/2;
    y = canvas.height/2;

    interval_counting = setInterval(ready, 1000);
}
