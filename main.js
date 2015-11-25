console.log('Sanity Check: JS is working!');
$(document).ready(function(){


	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");

	ctx.beginPath();
	// x y width height
	//x moves left and right
	//y moves up and down 
	//width of sqaure and height of it
	ctx.rect(0,100,22,12);
	//filling color
	ctx.fillStyle = "blue";
	ctx.fill();
	ctx.closePath();


});