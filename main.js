console.log('Sanity Check: JS is working!');
$(document).ready(function(){


var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var x = 0;
var y = 400;
var dx = 2;
var dy = -2;


function draw(){
	//clears rectangle before each move
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	//drawng code
	// x y width height
	//x moves left and right
	//y moves up and down 
	//width of sqaure and height of it
	ctx.beginPath();
	ctx.rect(x,y,22,12);
	//filling color
	ctx.fillStyle = "blue";
	ctx.fill();
	ctx.closePath(); 
	x += dx;
    y += dy;
}
setInterval(draw,10);

});



	// ctx.beginPath();


