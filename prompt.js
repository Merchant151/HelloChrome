
//var name = 'key';
//var nameTwo = 'name';
//var prom = 'value';
//var ActiveKey = '';

document.getElementById('backB').addEventListener("click",function(){
	//console.log('added backButton');
	var promptName = document.getElementById('pName');
	var textBox = document.getElementById('dynamicText');
 	var data = {[promptName.value]:textBox.value};
	if (textBox.value == 'insert prompt...'){
		console.log('no emergency save needed');
	}else{
	chrome.storage.local.set(data).then(()=> {console.log("emergency save")});
	}

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
	//console.log(builder.slice(7));
	return builder.slice(7);

};

async function addme(){
var textBox = document.getElementById('dynamicText');
var promptName = document.getElementById('pName');

document.getElementById('save').addEventListener("click",function(){
	//console.log('memory testing2');

	var data = { [promptName.value]:textBox.value }; 
	chrome.storage.local.set(data).then(() => {
	//console.log("set values");
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
	console.log(''+Object.values(promvalue)[0])
	console.log(promvalue[parse]);
	var output = promvalue[parse];
	//console.log('logging output');
	console.log(output);
	if (typeof promvalue[parse] === 'undefined' ){
		//console.log('found no value for prompt');
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
	//console.log('line 45 prompt.js');
	
	///console.log('chidlren of the Div: ')
	///for (const child of mydiv.children) {
 	 	
	///	console.log(child.tagName);
	///}
	await saveBox(parse);
	autoBox(output,parse);
	
}

async function autoBox(promptText,parse){

//parse and log autofill
	console.log('starting autobox creation process on prompt: ' + promptText);
	var blanks = [];
	let blankNum = -1;
	let blank = '';
	let started = false;
	for (let i = 0; i< promptText.length; i++){
		console.log(promptText.charAt(i));
		if (promptText.charAt(i) == '[' && !started){
			console.log('found start');
			started = true; 
			blankNum = blankNum + 1;
		}
		if (started){
			blank = blank+promptText.charAt(i);
		}

		if (started && promptText.charAt(i) == ']'){
			console.log('found end');
			started = false;
			blanks[blankNum] = blank;
			blank = '';
		}
	}
	console.log('Found: ');
	console.log(blanks);

	

	let mydiv = document.getElementById('promptSection');
	if (typeof parse !== 'undefined'){
		//build and append autofill section 
		//'h3'
		let autoTitle = document.createElement('h3');
		//content autofill and copy
		autoTitle.textContent = 'Autofill and Copy'
		
		mydiv.appendChild(autoTitle);
		//for blanks
		let blankName = document.createElement('small');
		let autoInput = document.createElement('input');
		let br;
		for (let x of blanks){
			//create blank name
			console.log('Auto')
			blankName = document.createElement('small'); 
			blankName.textContent = x.slice(1,-1)+':';
			mydiv.appendChild(blankName);
			autoInput = document.createElement('input')
			autoInput.type = 'text';
			autoInput.id = x;
			autoInput.classList = 'AutoIn';
			mydiv.appendChild(autoInput);
			br = document.createElement('br');
			mydiv.appendChild(br);
		}
		}else{console.log('parse undefined');}

	//create copy button. 
		let copy = document.createElement('button');
		copy.textContent = 'copy';
		mydiv.appendChild(copy);
	//create blank box 

}	
async function saveBox(parse)
{
	if (parse.length <=1){
		//console.log('parse is undefined');
		var namevalue = 'Prompt Name...'
	}else 
	{	//console.log('parse is defined');
		//console.log(parse);
		var namevalue = parse;
	}

	let nameInput = document.createElement('input');
	let nameButton = document.createElement('button');
	let nameText = document.createElement('small');
	//let spaces = document.createElement('div');

	nameText.textContent = 'Prompt Name:';

	nameInput.type = 'text';
	nameInput.id = 'pName';
	nameInput.value =  namevalue;

	nameButton.type = 'button';
	nameButton.id = 'save';
	nameButton.textContent = 'Save';

	//spaces.classList.add('spacing');

	let mydiv = document.getElementById('promptSection');

	//await mydiv.appendChild(spaces);
	await mydiv.appendChild(nameText);
	await mydiv.appendChild(nameInput);
	await mydiv.appendChild(nameButton);
	//console.log('running addme');
	addme();

}

promBox();
//saveBox();
