var dynamicList = document.getElementById('test-list');
var textBox = document.getElementById("in");
var testForm = document.getElementById('inTest');

function addItem() {
	 var listItem = document.createElement('li');
	listItem.textContent = 'Test Item';
	dynamicList.appendChild(listItem);

}

async function createList() {
	let keys = await chrome.storage.local.get(null);
	var array = Object.keys(keys);
	console.log('testing key names on index: ');
	console.log(array);
	await array.forEach((el) => {
		var listItem = document.createElement('li');
		listItem.textContent = el;
		listItem.id = el;
		//create clickable link should be turned into button maybe....
		let link = document.createElement('a');
		link.href = '#'+[el];
		link.text = ' copy';
		listItem.appendChild(link);
		//Create clickable delete link also can be button later
		let del = document.createElement('a');
		del.href = '#'+'nopezz';
		del.text = ' delete';
		del.id = 'delete';
		listItem.appendChild(del)
		dynamicList.appendChild(listItem);
	});

	addListners();
}

async function addListners(){
	
	var myAncors = document.getElementsByTagName('a');
	for (var i = 0; i < myAncors.length; i++){
	console.log('I ran '+ i);
	myAncors[i].addEventListener("click",
	async function(event){
		event.preventDefault();
		console.log('defualtprevented');
		console.log(event.target.id);

		if (event.target.id == 'delete' ){
			console.log('del confirmed');
			chrome.storage.local.remove([event.target.parentElement.id]);
			location.reload();
		}else{

		///let testing = await chrome.storage.local.get('name');
		///console.log(testing);
		///console.log(Object.values(testing));
		///console.log(testing.get('name'));
		////chrome.stget([pass]);
		///console.log(''+Object.values(x)[0]);
		let pass = event.target.parentElement.id;
		console.log(pass);

		let x = await chrome.storage.local.get([pass]);

		let room = ''+Object.values(x)[0];
		console.log(room);

		navigator.clipboard.writeText(room);	
		}
		///navigator.clipboard.writeText(
		///	chrome.storage.local.get(
		///		[myAncors[i].parentElement.textContent]));
	});

}
}


function saveText(str){
//	var listItem = document.createElement('li');
//	listItem.textContent = str;
//	dynamicList.appendChild(listItem);
	console.log('my functionality has been removed');
}
testForm.addEventListener('submit',function(event) {
	//console.log('we hit submit');
	event.preventDefault();
});

textBox.addEventListener("keyup",function(event){
	event.preventDefault();
	//console.log('keyup');
	//console.log('KEYCODE: '+event.keyCode);
	if (event.keyCode == 13){
		saveText(textBox.value);
	}
});

document.getElementById('promptButton').addEventListener("click",function(){
	console.log('what the heellllll');
	window.location.href = 'prompt.html';	
});

function move(){
	console.log('WHAT THE FUCK');
//window.location.href = 'prompt.html';
}

//addItem();
createList();

