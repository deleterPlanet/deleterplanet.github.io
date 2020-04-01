const wrapper = document.getElementById('wrapper');

var games = {
	"doom" : {
		"mainImg" : "doom.png",
		"shortDescription" : "text text text text text text",
		"imgs" : ["doom3.jpg", "doom2.jpeg", "doom1.png"],
		"description" : "TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT"
	},
	"js" : {
		"mainImg" : "js.png",
		"shortDescription" : "text text text text text text",
		"imgs" : ["snake1.png", "snake2.png", "snake3.png"],
		"description" : "TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT"
	}
}

var k = 0
var l = !confirm("Отобразить 2 эллемента?")
for (var i in games){
	wrapper.appendChild(addWrapElem(games[i]));
	k++;
	if (l){break}
}

wrapper.style.width = 280*k;
wrapper.style.height = 480;

function addWrapElem(data){
	var divWrapElement = document.createElement('div');
	divWrapElement.className = "wrapElement";

	var divFront = document.createElement('div');
	divFront.className = "front";

	var divRight = document.createElement('div');
	divRight.className = "right";

	//front
	var but = document.createElement('button');
	var mainImg = document.createElement('img');
	var shortDescript = document.createElement('p');

	but.onclick = function(){
		this.parentNode.parentNode.style.transform = "translatez(-160px) rotateY(-90deg)";
	}
	but.appendChild(document.createTextNode("-->"));
	mainImg.src = data["mainImg"];
	shortDescript.appendChild(document.createTextNode(data["shortDescription"]));

	divFront.appendChild(mainImg);
	divFront.appendChild(shortDescript);
	divFront.appendChild(but);

	//right
	var butBack = document.createElement('button');
	var img = document.createElement('img');
	var descript = document.createElement('p');

	butBack.onclick = function(){
		this.parentNode.parentNode.style.transform = "translatez(-140px) rotateY(0deg)";
	}
	butBack.appendChild(document.createTextNode("<--"));
	img.src = data["imgs"][0];
	descript.appendChild(document.createTextNode(data["description"]));

	divRight.appendChild(img);
	divRight.appendChild(descript);
	divRight.appendChild(butBack);

	divWrapElement.appendChild(divFront);
	divWrapElement.appendChild(divRight);
	return divWrapElement;
}