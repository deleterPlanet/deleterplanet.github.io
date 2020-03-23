articles = [["Git", "Git Команды", "Команды Git необходимые при командной разработки большого проекта."],
			["Nodejs", "Команды Node.js для работы в консоли", "Полезные команды для работы с Node.js в консоли."]];
const content = document.getElementById('content'),
	menu = document.getElementById('menu');

var	lastOpen = null,
	contentDiv,
	img,
	contentText,
	h3,
	h5,
	a;


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
}

//установка функции onclick для эллементов меню
for (var i = 0; i < menu.children.length; i++) {
	for (var j = 0; j < menu.children[i].children[1].children.length; j++){
		menu.children[i].children[1].children[j].children[0].style.display = 'none';
	};
    menu.children[i].onclick = function(){
    	if ((lastOpen == null) || (lastOpen == this)){
    		openClose(this);
    	}else{
    		openClose(lastOpen);
    		openClose(this);
    	}
    };
};

//открыть или закрыть пункт меню
async function openClose(e){
	if (e.children[1].style.height == ""){
		lastOpen = e;
		e.children[1].style.height = 40*e.children[1].children.length + "px";
		setDisplay(e.children[1]);
	}else{
		lastOpen = null;
		e.children[1].style.height = "";
		setTimeout(setDisplay, 500*e.children[1].children.length, e.children[1]);
	}
	return false;
}

//установить display всем детям элемента на none если элемент виден или на block если элемент скрыт
async function setDisplay(o){
	for (var j = 0; j < o.children.length; j++){
		o.children[j].children[0].style.display = (o.children[j].children[0].style.display == 'none')? 'block': 'none';
	}
}