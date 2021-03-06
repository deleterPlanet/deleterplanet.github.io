const canv = document.getElementById('canv'),
	ctx = canv.getContext('2d'),
	endGameBtn = document.getElementById('endGameBtn');

var w = canv.width = innerWidth,
	h = canv.height = innerHeight,
	move = 0,
	moveNum = 0,
	step = min(w, h)/5,
	scoreCross = 0,
	scoreZero = 0,
	map = [["", "", ""],["", "", ""],["", "", ""]],
	ISEndGame = false,
	defX,
	defY,
	pos;

canv.style.background = "#000000";
if (localStorage.getItem("scoreZero") != null){scoreZero = localStorage.getItem("scoreZero")};
if (localStorage.getItem("scoreCross") != null){scoreCross = localStorage.getItem("scoreCross")};

createMap();
createScore();

endGameBtn.onclick = function(){
	ctx.clearRect(0, 0, w, h);
	map = [["", "", ""],["", "", ""],["", "", ""]]
	createMap();
	createScore();
	move = 0;
	moveNum = 0;
	ISEndGame = false;
	this.style.display = "none";
}

canv.onclick = (e)=>{
	let x = e.clientX,
		y = e.clientY;
	pos = (~~(y/step) - 1)*3 + 1;
	x -= defX;
	if(ISEndGame){return}
	if (pos < 0 || pos > 9){return}
	if (x < 0 || x > step*3){return}

	pos += ~~(x/step);
	pos--;

	if (map[(pos-pos%3)/3][pos%3] != ""){return};
	ctx.lineWidth = 5;
	ctx.beginPath();
	if(move == 0){cross()}else{zero()}
	ctx.stroke();
	moveNum++;

	endGame();
}

function createMap(){
	let y = step,
	x = w/2;
	defX = x - 1.5*step;
	defY = step;

	ctx.lineWidth = 5;
	ctx.strokeStyle = "white";
	ctx.beginPath();

	ctx.moveTo(x - step/2, y);
	ctx.lineTo(x - step/2, y + 3*step);

	ctx.moveTo(x + step/2, y);
	ctx.lineTo(x + step/2, y + 3*step);

	ctx.moveTo(x - step/2 - step, y + step);
	ctx.lineTo(x + step/2 + step, y + step);

	ctx.moveTo(x - step/2 - step, y + 2*step);
	ctx.lineTo(x + step/2 + step, y + 2*step);

	ctx.stroke();
}

function min (a, b){
	if (a < b){
		return a;
	}else{
		return b;
	}
}

function cross(){
	let posX = pos%3,
		posY = (pos-pos%3)/3;
	map[posY][posX] = "X";

	ctx.moveTo(defX + posX*step + step*0.1, defY + posY*step + step*0.1);
	ctx.lineTo(defX + posX*step + step*0.9, defY + posY*step + step*0.9);

	ctx.moveTo(defX + posX*step + step*0.9, defY + posY*step + step*0.1);
	ctx.lineTo(defX + posX*step + step*0.1, defY + posY*step + step*0.9);

	move = 1;
}

function zero(){
	let posX = pos%3,
		posY = (pos-pos%3)/3;
	map[posY][posX] = "0";
	ctx.arc(defX + posX*step + step*0.5, defY + posY*step + step*0.5, step*0.4, 0, 2*Math.PI);
	move = 0;
}

function endGame(){
	checkWin();
	if(ISEndGame || moveNum == 9){endGameBtn.style.display = "block"};
}

function checkWin(){
	let x1 = y1 = x2 = y2 = 0,
		winer = "";
	if(map[0][0] == map[1][0] && map[1][0] == map[2][0] && map[0][0] != ""){
		x1 = x2 = defX + step*0.5; y1 = defY + step*0.1; y2 = defY + step*2.9; winer = map[0][0];
	}
	if(map[0][1] == map[1][1] && map[1][1] == map[2][1] && map[0][1] != ""){
		x1 = x2 = defX + step*1.5; y1 = defY + step*0.1; y2 = defY + step*2.9; winer = map[0][1];
	}
	if(map[0][2] == map[1][2] && map[1][2] == map[2][2] && map[0][2] != ""){
		x1 = x2 = defX + step*2.5; y1 = defY + step*0.1; y2 = defY + step*2.9; winer = map[0][2];
	}
	if(map[0][0] == map[0][1] && map[0][1] == map[0][2] && map[0][0] != ""){
		x1 = defX + step*0.1; x2 = defX + step*2.9; y1 = y2 = defY + step*0.5; winer = map[0][0];
	}
	if(map[1][0] == map[1][1] && map[1][1] == map[1][2] && map[1][0] != ""){
		x1 = defX + step*0.1; x2 = defX + step*2.9; y1 = y2 = defY + step*1.5; winer = map[1][0];
	}
	if(map[2][0] == map[2][1] && map[2][1] == map[2][2] && map[2][0] != ""){
		x1 = defX + step*0.1; x2 = defX + step*2.9; y1 = y2 = defY + step*2.5; winer = map[2][0];
	}
	if(map[0][0] == map[1][1] && map[1][1] == map[2][2] && map[0][0] != ""){
		x1 = defX+step*0.1;x2 = defX+step*2.9;y1 = defY+step*0.1;y2 = defY+step*2.9; winer = map[0][0];
	}
	if(map[0][2] == map[1][1] && map[1][1] == map[2][0] && map[0][2] != ""){
		x1 = defX+step*2.9;x2 = defX+step*0.1;y1 = defY+step*0.1;y2 = defY+step*2.9; winer = map[0][2];
	}

	if(x1 == 0 && x2 == 0 && y1 == 0 && y2 == 0){return};
	ctx.strokeStyle = "yellow";
	ctx.lineWidth = 8;
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
	ISEndGame = true;

	if (winer == "0"){scoreZero++}else{scoreCross++};
	localStorage.setItem("scoreZero", scoreZero);
	localStorage.setItem("scoreCross", scoreCross);
}

function createScore(){
	ctx.font = step*0.4 + "px Arial";
	ctx.lineWidth = 1;
	ctx.strokeStyle = "white"

	ctx.beginPath();
	ctx.moveTo(step*0.1, (h/2 - 0.5*step) + step*0.1);
	ctx.lineTo(step*0.9, (h/2 - 0.5*step) + step*0.9);

	ctx.moveTo(step*0.9, (h/2 - 0.5*step) + step*0.1);
	ctx.lineTo(step*0.1, (h/2 - 0.5*step) + step*0.9);

	ctx.strokeText(scoreCross, step*0.4 - (~~scoreCross/10)*0.1*step, (h/2 - 0.5*step) + step*1.5, step*0.8);

	ctx.stroke();

	ctx.beginPath();
	ctx.arc(w - step*0.6, (h/2 - 0.5*step) + step*0.5, step*0.4, 0, 2*Math.PI);

	ctx.strokeText(scoreZero, w - step*0.7 - (~~scoreZero/10)*0.1*step, (h/2 - 0.5*step) + step*1.5, step*0.8);

	ctx.stroke()
}