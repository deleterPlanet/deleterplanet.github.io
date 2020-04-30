const wrapper = document.getElementById('content');

var games = {
	"JKT" : {
		"mainImg" : "circle.png",
		"shortDescription" : "Just kill time",
		"imgs" : ["doom3.jpg", "doom2.jpeg", "doom1.png"],
		"description" : "if you have a lot of time and you don’t know what to do. This game is for you. You just need to run this application and the problems with free time will go away"
	},
	"Game" : {
		"mainImg" : "circle.png",
		"shortDescription" : "Just kill time",
		"imgs" : ["doom3.jpg", "doom2.jpeg", "doom1.png"],
		"description" : "if you have a lot of time and you don’t know what to do. This game is for you. You just need to run this application and the problems with free time will go away"
	}
}

articles = [["iconsdb", "Иконки", "Сайт с огромным количеством однотонных иконок без заднего фона. Одним из преимуществ сайта является инструмент, позволяющий задать иконке абсолютно любой цвет. Так же, при скачивании иконки, предоставляется несколько вариантов размеров и форматов."], //https://www.iconsdb.com/
			["iLoveImg", "Работа с изображениями", "Сайт предоставляет как сжатие изображений так и изменение их размера. Помимо этого, проект способен проводить множество других операций над изображениями."], //https://www.iloveimg.com/
			["colorscheme", "Работа с цветами", "В правом верхнем углу сайта можно найти вкладку далее, открыв которую отобразиться множество инструментов для работы с цветом. На сайте можно найти 'название цвета по hex', 'конвентер в разные форматы', литература, цветовые схемы и т.д."]]; //https://colorscheme.ru/

var projectsBtn = document.getElementById('projects'),
	toolsBtn = document.getElementById('tools'),
	donationsBtn = document.getElementById('donations'),
	contentDiv,
	img,
	contentText,
	h3,
	h5,
	a;

projectsBtn.onclick = function(){
	wrapper.innerHTML = "";
	setProjects();
	return true
}
toolsBtn.onclick = function(){
	wrapper.setAttribute("style", "");
	wrapper.innerHTML = "";
	setTools();
	return true
}
donations.onclick = function(){
	wrapper.setAttribute("style", "");
	wrapper.innerHTML = "";
	setDonation();
	return true
}

function setProjects(){
	var k = 0
	for (var i in games){
		wrapper.appendChild(addWrapElem(games[i]));
		k++;
	}
	wrapper.setAttribute("style", "height:" + 400*(~~(k/2) + k%2) + "px; padding:20px 0 0 0; flex-direction:row; background:#0b0d0f");
}

function setTools(){
	for (var i = 0; i < articles.length; i++){
		contentDiv = document.createElement('div');
		contentDiv.classList.toggle("contentDiv");

		img = document.createElement('img');
		img.src = "media/" + articles[i][0] + ".png";

		contentText = document.createElement('div');
		contentText.classList.toggle("contentText");

		h3 = document.createElement('h3');
		a = document.createElement('a');
		a.classList.toggle("contentTitle");
		a.href = "html/article.html";
		a.appendChild(document.createTextNode(articles[i][1]));
		h3.appendChild(a);

		h5 = document.createElement('h5');
		h5.appendChild(document.createTextNode(articles[i][2]));

		contentText.appendChild(h3);
		contentText.appendChild(h5);

		contentDiv.appendChild(img);
		contentDiv.appendChild(contentText);

		content.appendChild(contentDiv);
		if (i < articles.length - 1){
			var hr = document.createElement('hr');
			hr.setAttribute("width", "750px");
			hr.setAttribute("size", "2px");
			hr.setAttribute("color", "#4E5754");
			hr.setAttribute("noshade", null);
			hr.setAttribute("align", "center");
			content.appendChild(hr);
		}
	}
}

function setDonation(){}

function addWrapElem(data){
	var divWrapElement = document.createElement('div');
	divWrapElement.className = "wrapElement";

	var divFront = document.createElement('div');
	divFront.className = "front";

	var divRight = document.createElement('div');
	divRight.className = "right";

	//front
	var but = document.createElement	('button');
	var mainImg = document.createElement('img');
	var shortDescript = document.createElement('p');

	but.onclick = function(){
		this.parentNode.parentNode.style.transform = "translatez(-160px) rotateY(-90deg)";
	}
	but.className = "button";
	but.appendChild(document.createTextNode("-->"));
	mainImg.src = "media/" + data["mainImg"];
	mainImg.className = "img";
	shortDescript.appendChild(document.createTextNode(data["shortDescription"]));
	shortDescript.className = "p";

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
	butBack.className = "button";
	butBack.appendChild(document.createTextNode("<--"));
	img.src = "media/" + data["imgs"][0];
	img.className = "img";
	descript.appendChild(document.createTextNode(data["description"]));
	descript.className = "p";

	divRight.appendChild(img);
	divRight.appendChild(descript);
	divRight.appendChild(butBack);

	divWrapElement.appendChild(divFront);
	divWrapElement.appendChild(divRight);
	return divWrapElement;
}