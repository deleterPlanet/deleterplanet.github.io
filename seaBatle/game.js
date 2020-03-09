var myField = document.getElementById('myField'),
	enemyField = document.getElementById('enemyField'),
	addGameBut = document.getElementById('addGame'),
	conectionGameBut = document.getElementById('conectionGame'),
	serverId = document.getElementById('serverId'),
	isconectionOpen = false,
	k = 0;
	/*webSocketServer = new require('ws');*/

addGameBut.onclick = function(){
	var port = Math.round(8000 + Math.random()*100);
	/*webSocketServer = new webSocketServer.Server({
	    port: port
	});*/
	this.innerHTML = "Порт: " + port;
	this.disabled = "true";
	this.style.color = "#000000";
	this.style.cursor = "default";
	conectionGameBut.disabled = "true";
	document.getElementById('optionShipList').children[0].children[0].disabled = "true";
}

conectionGame.onclick = function(){
	addGameBut.disabled = "true";
	this.innerHTML = "<input id = 'portInp' type='text'>";
	this.style.padding = "0";
	this.disabled = 'true';
	isconectionOpen = true;
	document.getElementById('portInp').addEventListener('keyup', function(event){
		if (isconectionOpen){
			k++;
			if (k == 4){
				var e = this.parentElement;
				e.innerHTML = "Порт: " + this.value;
				e.style.color = "#000000";
				document.getElementById('optionShipList').children[0].children[0].disabled = "true";
			}
		}
	});
}