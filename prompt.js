
//var name = 'key';
//var nameTwo = 'name';
//var prom = 'value';
//var ActiveKey = '';

document.getElementById('backB').addEventListener("click",function(){
	//console.log('added backButton');i
	var promptName = document.getElementById('pName');
	var textBox = document.getElementById('dynamicText');
 	var data = {[promptName.value]:textBox.value};
	chrome.storage.local.set(data).then(()=> {console.log("emergency save")});


	window.location.href = 'index.html';
	

});

function queryParser(q)
{

	//console.log('Testing queryParser');
	//console.log('input: ' + q);
	let r = q.split('%20');
	let builder = '';
	for (a in r) {
		builder = builder+' '+r[a];
	}
	//console.log('output: ');
	console.log(builder.slice(7));
	return builder.slice(7);

};

async function addme(){
var textBox = document.getElementById('dynamicText');
var promptName = document.getElementById('pName');

document.getElementById('save').addEventListener("click",function(){
	console.log('memory testing2');

	var data = { [promptName.value]:textBox.value }; 
	chrome.storage.local.set(data).then(() => {
	console.log("set values");
	});

	//chrome.storage.local.get(null).then((result) => {
	//	console.log('atempting to log keys: ' + Object.keys(result));
		//ActiveKey = Object.keys(result);
	//});
	//console.log('Active Key value is: ' + ActiveKey);
	//console.log('textbox value is: ' + textBox.value); not interested in this information
	//chrome.storage.local.get(ActiveKey).then((result) => {
		/// in this log i am getting string 'name'
		//console.log("value: " + result[nameTwo]);
		////I am testing if I can get other key values from the result.
		//in this log i am getting literal name 
		//console.log('value: ' + result.name); //'name'
		//in this log i am getting string 'key' 
		//console.log('value 3: ' + result[name]); //'key'
	//});
});
}

async function promBox()
{
	///examplers
	//let el = document.createElement('h1');
	//elmn.id = 'newID' ///can be id or any attribute 
	//document.getElementByID().appendChild(myNewEl)
	//check for value in edit 
	const queryString = window.location.search;
	//console.log('logging vars');
	//console.log(queryString);
	var parse = queryParser(queryString);
	console.log('Picked pepper: '+parse);
	var promvalue = await chrome.storage.local.get([parse]);
	console.log('logging prompt value');
	console.log(promvalue);
	console.log(promvalue[parse]);
	var output = promvalue[parse];
	//console.log('logging output');
	//console.log(output);
	if (typeof promvalue[parse] === 'undefined' ){
		console.log('found no value for prompt');
		var promvalue = 'insert prompt...';
		var output = promvalue;
	}

	let myProm = document.createElement('textarea');
	//myProm.style.position ='absolute'; 
	myProm.style.padding = '10px '; 
	myProm.style.width = '275px'; 
	myProm.style.height = '400px'; 
	myProm.style.outline= 'none'; 
	myProm.style.resize = 'none';
	myProm.style.backgroundcolor= 'solid blue';
	myProm.id = 'dynamicText';
	//myProm.autocorrect = 'off'; 
	//myProm.autocapitalize = 'off'; 
	myProm.spellcheck = 'true';
	myProm.tabindex = '0';
	myProm.textContent = output;

	let mydiv = document.getElementById('promptSection')
	

	mydiv.appendChild(myProm);
	console.log('line 45 prompt.js');

	console.log('chidlren of the Div: ')
	for (const child of mydiv.children) {
 	 	
		console.log(child.tagName);
	}
	saveBox(parse);
}
async function saveBox(parse)
{
	if (parse.length <=1){
		console.log('parse is undefined');
		var namevalue = 'Prompt Name...'
	}else 
	{	console.log('parse is defined');
		console.log(parse);
		var namevalue = parse;
	}

	let nameInput = document.createElement('input');
	let nameButton = document.createElement('button');
	//let spaces = document.createElement('div');

	nameInput.type = 'text';
	nameInput.id = 'pName';
	nameInput.value =  namevalue;

	nameButton.type = 'button';
	nameButton.id = 'save';
	nameButton.textContent = 'Save Prompt';

	//spaces.classList.add('spacing');

	let mydiv = document.getElementById('promptSection');

	//await mydiv.appendChild(spaces);
	await mydiv.appendChild(nameInput);
	await mydiv.appendChild(nameButton);
	console.log('running addme');
	addme();	
}

promBox();
//saveBox();
