articles = [["Git", "Git Команды", "Команды Git необходимые при командной разработки большого проекта."],
			["Nodejs", "Команды Node.js для работы в консоли", "Полезные команды для работы с Node.js в консоли."]];
var content = document.getElementById('content');
var contentDiv,
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
	a.href = "html/articleFromMain.html";
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