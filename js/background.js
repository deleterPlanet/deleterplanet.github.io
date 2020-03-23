const canv = document.getElementById('canv'),
	ctx = canv.getContext('2d'),
	maxSpeed = 1,
	maxLineWidth = 0.5,
	maxLenLine = 100,
	pointsLen = ~~((innerWidth*innerHeight)/((1280*720)/100));

var cWidth = canv.width = innerWidth,
	cHeight = canv.height = innerHeight,
	points = {};

for (var i = 0; i < pointsLen; i++){
	points[i] = {
		x : Math.random()*cWidth,
		y : Math.random()*cHeight,
		dX : Math.random()*2*maxSpeed - maxSpeed,
		dY : Math.random()*2*maxSpeed - maxSpeed
	}
	while(points[i].dX == 0){
		points[i].dX = ~~(Math.random()*2*maxSpeed - maxSpeed);
	}
	while(points[i].dY == 0){
		points[i].dY = ~~(Math.random()*2*maxSpeed - maxSpeed);
	}
}

timer = setInterval(loop, 1000/60);

function loop(){
	ctx.fillStyle = '#14171a';
  	ctx.fillRect(0, 0, cWidth, cHeight);
  	ctx.fillStyle = '#ffffff';
  	for (var i = 0; i < pointsLen; i++){
  		ctx.beginPath();
  		ctx.arc(points[i].x, points[i].y, 2, 0, Math.PI*2, true);
  		ctx.fill();

  		points[i].x += points[i].dX;
  		points[i].y += points[i].dY;
  		if (points[i].x < 0){
  			points[i].x = cWidth;
  		};
  		if (points[i].x > cWidth){
  			points[i].x = 0
  		};
  		if (points[i].y < 0){
  			points[i].y = cHeight
  		};
  		if (points[i].y > cHeight){
  			points[i].y = 0
  		};

		ctx.strokeStyle = "#ffffff";
  		for (var j = i; j < pointsLen; j++){
  			dist = getDistance({x : points[i].x, y : points[i].y}, {x : points[j].x, y : points[j].y});
  			if (dist <= maxLenLine){
  				ctx.lineWidth = (maxLenLine/dist)*maxLineWidth;
  				ctx.beginPath();
  				ctx.moveTo(points[i].x, points[i].y);
  				ctx.lineTo(points[j].x, points[j].y);
  				ctx.stroke();
  			}
  		}
  	}
}

function getDistance(a, b){
	return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
}