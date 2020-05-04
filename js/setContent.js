var games = {
	"JKT" : {
		"mainImg" : "jkt_logo.png",
		"shortDescription" : "Just kill time",
		"imgs" : ["triangle_color2.png", "triangle_color3.png", "triangle_color4.png"],
		"description" : "If you have a lot of time and you don’t know what to do. This game is for you. You just need to run this app and the problems with free time will go away"
	}
}

articles = {
	"iconsdb" : {
		"name" : "Иконки",
		"description" : "Сайт с огромным количеством однотонных иконок без заднего фона. Одним из преимуществ сайта является инструмент, позволяющий задать иконке абсолютно любой цвет. Так же, при скачивании иконки, предоставляется несколько вариантов размеров и форматов.",
		"web" : "https://www.iconsdb.com/",
		"img" : "iconsdb.png"
	},
	"iLoveImg" : {
		"name" : "Работа с изображениями",
		"description" : "Сайт предоставляет как сжатие изображений так и изменение их размера. Помимо этого, проект способен проводить множество других операций над изображениями.",
		"web" : "https://www.iloveimg.com/",
		"img" : "iLoveImg.png"
	},
	"colorscheme" : {
		"name" : "Работа с цветами",
		"description" : "В правом верхнем углу сайта можно найти вкладку далее, открыв которую отобразиться множество инструментов для работы с цветом. На сайте можно найти 'название цвета по hex', 'конвентер в разные форматы', литература, цветовые схемы и т.д.",
		"web" : "https://colorscheme.ru/",
		"img" : "colorscheme.png"
	}
}

var donations = {
	"coffee" : {
		"purpose" : 100,
		"img" : "coffee.png",
		"text" : "Скинуться на бочонок кофе",
		"accumulation" : "https://my.qiwi.com/Anton-YaQdHS8a7tu",
		"progress" : 0
	},
	"redBull" : {
		"purpose" : 100,
		"img" : "redBull.png",
		"text" : "Всегда есть время для работы",
		"accumulation" : "https://my.qiwi.com/Anton-YaQdHS8a7tu",
		"progress" : 0
	}
}

var projectsBtn = document.getElementById('projects'),
	toolsBtn = document.getElementById('tools'),
	donationsBtn = document.getElementById('donations'),
	articlesLen = 3,
	contentDiv,
	img,
	contentText,
	progress,
	but,
	h3,
	h5,
	a;

projectsBtn.onclick = function(){
	content.setAttribute("style", "background-color: #0b0d0f");
	content.innerHTML = "";
	setProjects();
	return true
}
toolsBtn.onclick = function(){
	content.setAttribute("style", "background-color: #0b0d0f");
	content.innerHTML = "";
	setTools();
	return true
}
donationsBtn.onclick = function(){
	content.setAttribute("style", "");
	content.innerHTML = "";
	setDonation();
	return true
}

setProjects();

function setProjects(){
	var k = 0
	for (var i in games){
		content.appendChild(addWrapElem(games[i]));
		k++;
	}
	content.setAttribute("style", "height:" + 400*(~~(k/2) + k%2) + "px; padding:20px 0 0 0; flex-direction:row; background:#0b0d0f");
	slideShow('.slider', {
      isAutoplay: true
    });
}

function setTools(){
	var k = 0;
	for (var i in articles){
		contentDiv = document.createElement('div');
		contentDiv.classList.toggle("contentDiv");

		img = document.createElement('img');
		img.src = "media/" + articles[i]["img"];

		contentText = document.createElement('div');
		contentText.classList.toggle("contentText");

		h3 = document.createElement('h3');
		a = document.createElement('a');
		a.classList.toggle("contentTitle");
		a.href = articles[i]["web"];
		a.appendChild(document.createTextNode(articles[i]["name"]));
		h3.appendChild(a);

		h5 = document.createElement('h5');
		h5.appendChild(document.createTextNode(articles[i]["description"]));
		h5.classList.toggle("h5");

		contentText.appendChild(h3);
		contentText.appendChild(h5);

		contentDiv.appendChild(img);
		contentDiv.appendChild(contentText);

		content.appendChild(contentDiv);
		if (k < articlesLen - 1){
			var hr = document.createElement('hr');
			hr.setAttribute("width", "750px");
			hr.setAttribute("size", "2px");
			hr.setAttribute("color", "#4E5754");
			hr.setAttribute("noshade", null);
			hr.setAttribute("align", "center");
			content.appendChild(hr);
		}
		k++;
	}
}

function setDonation(){
	var k = 0
	for (var i in donations){
		contentDiv = document.createElement('div');
		contentDiv.classList.toggle("contentDiv");

		img = document.createElement('img');
		img.src = "media/" + donations[i]["img"];

		contentText = document.createElement('div');
		contentText.classList.toggle("contentText");

		h3 = document.createElement('h3');
		h3.classList.toggle("contentTitle");
		h3.appendChild(document.createTextNode(donations[i]["text"]));

		
		progress = document.createElement('progress');
		progress.setAttribute("value", donations[i]["progress"]);
		progress.setAttribute("max", donations[i]["purpose"]);
		progress.classList.toggle("donatProgress");

		but = document.createElement('button');
		but.appendChild(document.createTextNode("Пожертвовать"));
		but.classList.toggle("donationBut");
		a = document.createElement('a');
		a.href = donations[i]["accumulation"];
		a.appendChild(but);

		h5 = document.createElement('h5');
		h5.classList.toggle("progressText");
		var s = donations[i]["progress"] + ""; 
		if (donations[i]["progress"] >= 1000){
			s = donations[i]["progress"]/1000 + " " + s[s.length - 3] + s[s.length - 2] + s[s.length - 1];
		}
		h5.appendChild(document.createTextNode(s + "руб. (" + ~~((donations[i]["progress"]/donations[i]["purpose"])*1000)/10 + "%)"));
		h5.setAttribute("style", "top:" + (k*180 + 150) + "px; left: " + (innerWidth*0.1 + 180) + "px;");

		contentText.appendChild(h3);
		contentText.appendChild(progress);
		contentText.appendChild(a);
		contentText.appendChild(h5);

		contentDiv.appendChild(img);
		contentDiv.appendChild(contentText);

		content.appendChild(contentDiv);
		k++;
	}
}

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
	but.className = "button";
	but.appendChild(document.createTextNode("-->"));
	mainImg.src = "media/" + data["mainImg"];
	mainImg.className = "img";
	shortDescript.appendChild(document.createTextNode(data["shortDescription"]));
	shortDescript.className = "appName";

	divFront.appendChild(shortDescript);
	divFront.appendChild(mainImg);
	divFront.appendChild(but);

	//right
	var butBack = document.createElement('button');
	var slider = setSlider(data);
	var descript = document.createElement('p');

	butBack.onclick = function(){
		this.parentNode.parentNode.style.transform = "translatez(-140px) rotateY(0deg)";
	}
	butBack.className = "button";
	butBack.appendChild(document.createTextNode("<--"));
	slider.classList.toggle("slider");
	descript.appendChild(document.createTextNode(data["description"]));
	descript.className = "p";

	divRight.appendChild(slider);
	divRight.appendChild(descript);
	divRight.appendChild(butBack);

	divWrapElement.appendChild(divFront);
	divWrapElement.appendChild(divRight);
	return divWrapElement;
}

function setSlider(data){
	var divWrapper = document.createElement('div'),
		divItems = document.createElement('div'),
		aLeft = document.createElement('a'),
		aRight = document.createElement('a');

	divWrapper.classList.toggle("slider__wrapper");
	divItems.classList.toggle("slider__items");

	for (var j = 0; j < data["imgs"].length; j++){
		var divItem = document.createElement('div');
		divItem.classList.toggle("slider__item");
		var img = document.createElement('img');
		img.setAttribute("src", "media/" + data["imgs"][j]);
		divItem.appendChild(img);
		divItems.appendChild(divItem);
	}

	aLeft.classList.toggle("slider__control");
	aLeft.classList.toggle("slider__control_prev");
	aLeft.setAttribute("href", "#");
	aLeft.setAttribute("role", "button");
	
	aRight.classList.toggle("slider__control");
	aRight.classList.toggle("slider__control_next");
	aRight.classList.toggle("slider__control_show");
	aRight.setAttribute("href", "#");
	aRight.setAttribute("role", "button");

	divWrapper.appendChild(divItems);

	var div = document.createElement('div');
	div.appendChild(divWrapper);
	div.appendChild(aLeft);
	div.appendChild(aRight);
	return div;
}