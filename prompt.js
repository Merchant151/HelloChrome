
//var name = 'key';
//var nameTwo = 'name';
//var prom = 'value';
var textBox = document.getElementById("textarea");
var promptName = document.getElementById('pName');
//var ActiveKey = '';
const queryString = window.location.search;
console.log('logging vars');
console.log(queryString);


async function addme(){

document.getElementById('save').addEventListener("click",function(){
	console.log('memory testing');

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
	let promvalue = 'insert prompt...';

	let myProm = document.createElement('textarea');
	myProm.style.position ='absolute'; 
	myProm.style.padding = '10px '; 
	myProm.style.width = '275px'; 
	myProm.style.height = '400px'; 
	myProm.style.outline= 'none'; 
	myProm.style.resize = 'none';
	myProm.style.backgroundcolor= 'solid blue';
	myProm.id = 'dynamicText';
	myProm.autocorrect = 'off'; 
	myProm.autocapitalize = 'off'; 
	myProm.spellcheck = 'true';
	myProm.tabindex = '0';
	myProm.textContent = promvalue;

	let mydiv = document.getElementById('promptSection')
	

	mydiv.appendChild(myProm);
	console.log('line 45 prompt.js');

	console.log('chidlren of the Div: ')
	for (const child of mydiv.children) {
 	 	
		console.log(child.tagName);
	}
}
async function saveBox()
{
	let namevalue	= 'Prompt Name...';

	let nameInput = document.createElement('input');
	let nameButton = document.createElement('button');
	let spaces = document.createElement('div');

	nameInput.type = 'text';
	nameInput.id = 'pName';

	nameButton.type = 'button';
	nameButton.id = 'save';
	nameButton.textContent = 'Save Prompt';

	spaces.classList.add('spacing');

	let mydiv = document.getElementById('promptSection');

	await mydiv.appendChild(spaces);
	await mydiv.appendChild(nameInput);
	await mydiv.appendChild(nameButton);

	addme();	
}

promBox();
saveBox();
