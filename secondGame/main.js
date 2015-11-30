console.log('Sanity Check: JS is working!');
$(document).ready(function(){

	//getting canvas from ID in the canvas class and turning it into a JS variable.
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	var x = canvas.width/2;
	var y = canvas.height /2;
	// var bgImage = new Image();
	// bgImage.src = 'forest.png'


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
		$("#p2").text("P2 wins: " + players[1].wins);
	}
	

	function detectWin(){
		if(players[0].boxX > 600 - players[0].img.width) {
			//alert("Player 1 wins");
			resetPlayers();
			players[0].wins++;
			$("#p1").text("P1 wins: "+ players[0].wins);
		}
		if(players[1].boxX > 600 - players[1].img.width) {
			//alert("Player 2 Wins");
			resetPlayers();
			players[1].wins++;
			$("#p2").text("P2 wins: " + players[1].wins);
		}
	}

	var Player = function(img, keycodeLeft, keycodeRight, boxY){
		this.img = img;
		this.boxX = 0;
		this.boxY = boxY;
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
		this.drawSprite();
	}

	Player.prototype.drawSprite = function(){
		ctx.drawImage(this.img, this.boxX, this.boxY, this.img.width, this.img.height);
	}

	function loadImage(img_url, cb){
		var image = new Image();
		image.src = img_url;
		image.onload = function(){
			console.log(image);
			cb(image);
		}
	}

	Player.prototype.moveBy = function(moveX, moveY) {
		this.boxX += moveX;
		this.boxY += moveY;
		if(this.boxX > canvas.width - this.img.width) {
			this.boxX = canvas.width - this.img.width;
		}
		if(this.boxX < 0) {
			this.boxX = 0;
		}
	}

	function draw(){
		window.requestAnimationFrame(draw);
		//clears rectangle before each move
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		finishLine();
		for(var i = 0; i < players.length; i++) {
			players[i].update();
		}
		detectWin();
	}

	var players = [];
	loadImage("chrono.png", function(loaded_image){
		players.push(new Player(loaded_image, 65, 83, 100));
		loadImage("frog.png", function(loaded_frog_image){
			players.push(new Player(loaded_frog_image, 75, 76, 300));
			window.	requestAnimationFrame(draw);
		});
	});

});