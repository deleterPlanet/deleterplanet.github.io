const content = document.getElementById('content'),
	menu = document.getElementById('menu');

var	lastOpen = null;

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
		setTimeout(setDisplay, 500, e.children[1]);
	}
	return false;
}

//установить display всем детям элемента на none если элемент виден или на block если элемент скрыт
async function setDisplay(o){
	for (var j = 0; j < o.children.length; j++){
		o.children[j].children[0].style.display = (o.children[j].children[0].style.display == 'none')? 'block': 'none';
	}
}