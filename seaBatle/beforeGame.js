var myField = document.getElementById('myField'),
	enemyField = document.getElementById('enemyField'),
	shipListOpenBut = document.getElementById('optionShipList').children[0].children[0],
	okButList = document.getElementsByClassName('okBut'),
	cleanButList = document.getElementsByClassName('cleanBut'),
	ship = [[[], [], [], []], [[], [], []], [[], []], [[]]],
	isOpenShipList = false,
	angle = "",
	notCheck = "",
	k,
	tr,
	td,
	i;

for (i = 0; i < 10; i++){
	tr = document.createElement('tr');
	td = document.createElement('td');
	td.appendChild(document.createTextNode(i+1));
	tr.appendChild(td);
	for (j = 0; j < 10; j++){
		td = document.createElement('td');
		td.classList.toggle("cell");
		tr.appendChild(td);
	}
	myField.appendChild(tr);
}

for (i = 0; i < 10; i++){
	tr = document.createElement('tr');
	td = document.createElement('td');
	td.appendChild(document.createTextNode(i+1));
	tr.appendChild(td);
	for (j = 0; j < 10; j++){
		td = document.createElement('td');
		td.classList.toggle("cell");
		tr.appendChild(td);
	}
	enemyField.appendChild(tr);
}

shipListOpenBut.onclick = function (){
	var ul = this.parentElement.nextElementSibling.children[0];
	if (isOpenShipList){
		ul.style.height = "0";
		setTimeout(()=>{
			for (i = 0; i < ul.children.length; i++){
				ul.children[i].style.display = "none";
			}
		},600);
	}else{
		for (i = 0; i < ul.children.length; i++){
			ul.children[i].style.display = "block";
		}
		ul.style.height = "310px";
	}
	isOpenShipList = !isOpenShipList;
	return false;
}

for (i = 0; i < okButList.length; i++){
	okButList[i].onclick = function (){
		var e = this.parentElement; //li
		var shipLen = e.children.length-2;
		var shipNum = parseInt(e.dataset.num);
		addShip(ship[shipLen-1][shipNum]); // удаление старого корабля
		for (i = 0; i < e.children.length-2; i++){
			if (e.children[i].value == ""){
				clean(e);
				alert("error");
				ship[shipLen-1][shipNum] = [];
				break;
			}else{
				if (i >= 1){
					if (!checkAngle(e.children[i-1].value, e.children[i].value) && !isNear(e.children[i-1].value, e.children[i].value)){
						clean(e);
						alert("error");
						ship[shipLen-1][shipNum] = [];
						break;
					}
				}
				if (!isNearOtherShip(e.children[i].value)){
					clean(e);
					alert("error");
					ship[shipLen-1][shipNum] = [];
					break;
				}
			}
			ship[shipLen-1][shipNum][i] = e.children[i].value;
		}
		angle = "";
		notCheck = "";
		addShip(ship[shipLen-1][shipNum])
		return false;
	}

	cleanButList[i].onclick = function (){clean(this.parentElement);};
}

function isNearOtherShip(now){
	var bool = true;
	var x = getX(now[0]);
	var y = parseInt(now[1]);
	if (notCheck != "top" && y > 1){
		bool = bool && (myField.children[y-1].children[x].style.backgroundColor != "rgb(0, 0, 0)" );
	}
	if (notCheck != "right" && x < 10){
		bool = bool && (myField.children[y].children[x+1].style.backgroundColor != "rgb(0, 0, 0)" );
	}
	if (notCheck != "bottom" && y < 10){
		bool = bool && (myField.children[y+1].children[x].style.backgroundColor != "rgb(0, 0, 0)" );
	}
	if (notCheck != "left" && x > 1){
		bool = bool && (myField.children[y].children[x-1].style.backgroundColor != "rgb(0, 0, 0)" );
	}
	return bool;
}

function isNear(last, now){
	if (angle == "horizontal"){
		if (last[0].charCodeAt(0) - now[0].charCodeAt(0) == 1){notCheck = "right";};
		if (last[0].charCodeAt(0) - now[0].charCodeAt(0) == -1){notCheck = "left";};
		return last[0].charCodeAt(0) - now[0].charCodeAt(0) == 1 || last[0].charCodeAt(0) - now[0].charCodeAt(0) == -1;
	}
	if (parseInt(last[1]) - parseInt(now[1]) == 1){notCheck = "bottom";};
	if (parseInt(last[1]) - parseInt(now[1]) == -1){notCheck = "top";};
	return last[1].charCodeAt(0) - now[1].charCodeAt(0) == 1 || last[1].charCodeAt(0) - now[1].charCodeAt(0) == -1;
}

function checkAngle(last, now){
	if (angle == ""){
		angle = (last[0] == now[0]) ? "vertical" : "horizontal";
		return (last[0] == now[0] && last[1] != now[1]) || (last[0] != now[0] && last[1] == now[1]);
	}
	alert(last[0] == now[0] && angle == "vertical");
	alert(last[1] == now[1] && angle == "horizontal");
	return (last[0] == now[0] && angle == "vertical") || (last[1] == now[1] && angle == "horizontal");
}

function addShip(shipCells){
	for (i = 0; i < shipCells.length; i++){
		var x = getX(shipCells[i][0]);
		var y = parseInt(shipCells[i][1]);

		if (x){myField.children[y].children[x].style.backgroundColor = (myField.children[y].children[x].style.backgroundColor == "rgb(0, 0, 0)") ? "" : "#000000"};
	}
}

function getX(x){
	if (x.charCodeAt(0) <= 1050 && x.charCodeAt(0) >= 1040){
		x = (x.charCodeAt(0) == 1050) ? 10 : x.charCodeAt(0) - 1040 + 1;
	}else{
		if (x.charCodeAt(0) <= 1082 && x.charCodeAt(0) >= 1072){
			x = (x.charCodeAt(0) == 1082) ? 10 : x.charCodeAt(0) - 1072 + 1;
		}else{
			alert("error");
			return null;
		}
	}
	return parseInt(x);
}

function clean(e){
	for (i = 0; i < e.children.length-2; i++){
		e.children[i].value = "";
	}
}