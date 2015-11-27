console.log('Sanity Check: JS is working!');
$(document).ready(function(){

	//getting canvas from ID in the canvas class and turning it into a JS variable.
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	var x = canvas.width/2;
	var y = canvas.height /2;
	var boxHeight = 10;
	var boxWidth = 75;

	//jQuery Button Reset
	$('#restart').click(function clear(){
		resetGame();
	})

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

	function resetPlayers(){
		for(var i = 0; i < players.length; i++){
			players[i].boxX = 0;
		}
	}

	function resetGame(){
		for(var i = 0; i < players.length; i++){
			players[i].boxX = 0;
			players[i].wins = 0;
		}
		$("#p1").text("P1 wins: "+ players[0].wins);
		$("#p2").text("P2 wins:" + players[1].wins);
	}
	

	function detectWin(){
		if(players[0].boxX > 600 - boxWidth) {
			//alert("Player 1 wins");
			resetPlayers();
			players[0].wins++;
			$("#p1").text("P1 wins: "+ players[0].wins);
		}
		if(players[1].boxX > 600 - boxWidth) {
			//alert("Player 2 Wins");
			resetPlayers();
			players[1].wins++;
			$("#p2").text("P2 wins:" + players[1].wins);
		}
	}

	var Player = function(color, keycodeLeft, keycodeRight){
		this.color = color;
		this.boxX = 0;
		this.boxY = canvas.height-boxHeight;
		this.rightPressed = false;
		this.leftPressed = false;
		this.wins = 0;
		var instance = this;
		window.addEventListener("keydown",function(e){
			if(e.keyCode == keycodeRight){
				instance.rightPressed = true;
			}
			else if(e.keyCode == keycodeLeft){
				instance.leftPressed = true;
			}
		}, false);
		window.addEventListener("keyup",function(e){
			if(e.keyCode == keycodeRight){
				instance.rightPressed = false;
			}
			else if(e.keyCode == keycodeLeft){
				instance.leftPressed = false;
			}
		}, false);
	};

	Player.prototype.update = function() {
		if(this.rightPressed) this.moveBy(7,0);
		if(this.leftPressed) this.moveBy(-7,0);
		this.drawBox();
	}

	Player.prototype.drawBox = function(){
		ctx.beginPath();
		ctx.rect(this.boxX, this.boxY, boxWidth, boxHeight);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();
	}

	Player.prototype.moveBy = function(moveX, moveY) {
		this.boxX += moveX;
		this.boxY += moveY;
		if(this.boxX > canvas.width-boxWidth) {
			this.boxX = canvas.width-boxWidth;
		}
		if(this.boxX < 0) {
			this.boxX = 0;
		}
	}

	var players = [];

	players.push(new Player("#00ff00", 65, 83));
	players.push(new Player("#0000ff", 90, 88));

	function draw(){
		window.requestAnimationFrame(draw);
		//clears rectangle before each move
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		finishLine();
		for(var i = 0; i < players.length; i++) {
			players[i].update();

		}
		detectWin()
	}

	// everything has been loaded
	window.requestAnimationFrame(draw);

});