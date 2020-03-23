const canvas = document.getElementById('canvas'),
	ctx = canvas.getContext('2d');
	dirBtns = document.getElementsByClassName('tapBut');

var gs = fkp = false,
	speed = baseSpeed = 3,
	xv = yv = 0,
	px = ~~(canvas.width)/2,
	py = ~~(canvas.height)/2,
	pw = ph = 20,
	aw = ah = 20,
	trail = [],
	tail = 10,
	tailSafeZone = 20,
	cooldown = false,
	score = 0,
	H1score = document.getElementById("Hscore"),
	H1hiscore = document.getElementById("H1hiscore"),
	hiscore = 0,
	apple = {},
	isPhone;

window.onload = function(){
	isPhone = confirm("Вы зашли на сайт с компьютера?");
	dirBtns[1].style.display = dirBtns[3].style.display = dirBtns[5].style.display = dirBtns[7].style.display = (isPhone) ? "none" : "inline-block";
	checkWindow();
	if (localStorage.getItem('HiscoreSnake') != null){
	    hiscore = localStorage.getItem('HiscoreSnake');
	};
	H1hiscore.innerHTML = "Hiscore: " + hiscore;
	H1score.innerHTML = "Score: 0";

	document.addEventListener('keydown', changeDirection);

	setInterval(loop, 1000/60);
}

function loop(){
	ctx.fillStyle = 'black';
  	ctx.fillRect(0, 0, canvas.width, canvas.height);

	px += xv;
	py += yv;

	ctx.fillStyle = apple.color;
    ctx.fillRect(apple.x, apple.y, aw, ah);

	teleport();
	paintSnake();
	death();
	checkCollApple();
}

function teleport(){
	if( px > canvas.width ){
		px = 0;
	}

	if( px + pw < 0 ){
		px = canvas.width;
	}

	if( py + ph < 0 ){
    	py = canvas.height;
    }

	if( py > canvas.height ){
 	 	py = 0;
	}
}

function death(){
	if(trail.length >= tail && gs){
    	for(var i = trail.length - tailSafeZone; i >= 0; i--){
			if(px < (trail[i].x + pw) && px + pw > trail[i].x && py < (trail[i].y + ph) && py + ph > trail[i].y){
				tail = 10;
				speed = baseSpeed;
				if (score > hiscore){
					hiscore = score;
					H1hiscore.innerHTML = "Hiscore: " + hiscore;
					localStorage.setItem('HiscoreSnake', hiscore);
				}
				score = 0;
				H1score.innerHTML = "Score: 0";

				for( var t = 0; t < trail.length; t++ ){
          			trail[t].color = 'red';
					if(t >= trail.length - tail){
						break;
					}
				}
			}
		}
	}
}

function paintSnake(){
	ctx.fillStyle = 'lime';
    for(var i = 0; i < trail.length; i++){
	    ctx.fillStyle = trail[i].color || 'lime';
	    ctx.fillRect(trail[i].x, trail[i].y, pw, ph);
  	}

  	trail.push({x: px, y: py, color: ctx.fillStyle});

  	if(trail.length > tail){
		trail.shift();
	};

	if(trail.length > tail){
		trail.shift();
	}
}

function changeDirection(e){
	if(!fkp && [37,38,39,40].indexOf(e.keyCode) > -1){
		setTimeout(()=>{gs = true;}, 1000);
		fkp = true;
		spawnApple();
	}

	if (cooldown){
		return false;
	}

	if(e.keyCode == 37 && !(xv > 0)){ // left
    	xv = -speed;
    	yv = 0;
    }

	if(e.keyCode == 38 && !(yv > 0)){ // top
    	xv = 0;
    	yv = -speed;
    }

	if(e.keyCode == 39 && !(xv < 0)){ // right
    	xv = speed;
    	yv = 0;
    }

	if(e.keyCode == 40 && !(yv < 0)){ // down
    	xv = 0;
    	yv = speed;
    }

	cooldown = true;
  	setTimeout(()=>{cooldown = false;}, 100);
}

function spawnApple(){
apple = {x: ~~(Math.random() * canvas.width),
	y: ~~(Math.random() * canvas.height),
	color: 'red'
	};

	if((apple.x < aw || apple.x > canvas.width - aw) || (apple.y < ah || apple.y > canvas.height - ah)){
		spawnApple();
		return;
	}

	for(var i = 0; i < tail.length; i++){
		if(apple.x < (trail[i].x + pw) && apple.x + aw > trail[i].x && apple.y < (trail[i].y + ph) && apple.y + ah > trail[i].y){
			spawnApple();
			return;
		}
	}
}

function checkCollApple(){
	if(px < (apple.x + pw) && px + pw > apple.x && py < (apple.y + ph) && py + ph > apple.y){
		tail += 10;
		speed += 0.1;
		score += 1;
		H1score.innerHTML = "Score: " + score;
		spawnApple();
	}
}

function checkWindow(){
	canvas.width = innerWidth - 50;
	canvas.height = innerHeight - 130;
	px = ~~(canvas.width)/2;
	py = ~~(canvas.height)/2;
}

function changeDirectionBut(e){
	if(!fkp){
		setTimeout(()=>{gs = true;}, 1000);
		fkp = true;
		spawnApple();
	}

	if(e.dataset.direction == "left" && !(xv > 0)){
    	xv = -speed;
    	yv = 0;
    }

	if(e.dataset.direction == "top" && !(yv > 0)){
    	xv = 0; yv = -speed;
    }

	if(e.dataset.direction == "right" && !(xv < 0)){ 
    	xv = speed;
    	yv = 0;
    }

	if(e.dataset.direction == "down" && !(yv < 0)){
    	xv = 0;
    	yv = speed;
    }
}