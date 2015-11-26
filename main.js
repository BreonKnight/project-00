console.log('Sanity Check: JS is working!');
$(document).ready(function(){

//getting canvas from ID in the canvas class and turning it into a JS variable.
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var x = canvas.width2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var boxHeight = 10;
var boxWidth = 75;
var boxX = (canvas.width-boxWidth)/60;
var rightPressed = false;
var leftPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e){
	if(e.keyCode == 83){
		rightPressed = true;
	}
	else if(e.keyCode == 65){
		leftPressed = true;
	}
}

function keyUpHandler(e){
	if(e.keyCode == 83){
		rightPressed = false;
	}
	else if(e.keyCode == 65){
		leftPressed = false
	}
}

function finishLine(){
	ctx.beginPath();
	ctx.moveTo(600,0);
	ctx.lineTo(600,400);
	ctx.fill();
	ctx.closePath();
	ctx.stroke();

}

function drawBox(){
	ctx.beginPath();
	ctx.rect(boxX, canvas.height-boxHeight, boxWidth, boxHeight);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}


function draw(){
	//clears rectangle before each move
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	finishLine();
	drawBox();

    if(rightPressed && boxX < canvas.width-boxWidth) {
        boxX += 7;
    }
    else if(leftPressed && boxX > 0) {
        boxX -= 7;
    }
    
    x += dx;
    y += dy;
 }
setInterval(draw,10);

});