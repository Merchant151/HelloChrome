
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
	chrome.storage.local.set(data).then(()=> {console.log("emergency save");});
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

async function autoListner(keyNames,promptText){

	
console.log('autoListner function');
document.getElementById('copy').addEventListener('click',function(event){
	event.preventDefault();
	console.log('copy');
	console.log('There are '+keyNames.length+' KeyNames');
	//CREATE MAP
	var boxValues = new Map();
	for (let i =0; i < keyNames.length; i++ ){
		//get each keyname value 
		//if keyname value is not null add to map]
		console.log('logging value '+keyNames[i]);
		console.log(document.getElementById(keyNames[i]).value);
		var key = keyNames[i];
		var val = document.getElementById(keyNames[i]).value;
		console.log('value length '+document.getElementById(keyNames[i]).value.length)
		if (val.length > 0 ){
			boxValues.set(key,val);
			console.log('AUTOFILL VALUE ADDED');
		}
	}
	//for each key name replace
	var result = promptText;
	boxValues.forEach((values,keys)=>{
		console.log(values,keys);
		let findMe = keys;
		let replace= values;
		console.log("find and replace",findMe);
		//console.log(promptText);
		result = result.replace(findMe,replace);
		//test one 
		//result = result.replace('[commander]',replace)
		console.log(result);

	});
	//copy to clipboard 


});

}

async function promBox()
{
	const queryString = window.location.search;
	var parse = queryParser(queryString);
	console.log('Picked pepper: '+parse);
	var promvalue = await chrome.storage.local.get([parse]);
	console.log('logging prompt value');
	console.log(promvalue);
	console.log(''+Object.values(promvalue)[0])
	console.log(promvalue[parse]);
	var output = promvalue[parse];
	console.log(output);
	if (typeof promvalue[parse] === 'undefined' ){
		var promvalue = 'insert prompt...';
		var output = promvalue;
	}

	let myProm = document.createElement('textarea');
	myProm.style.padding = '10px '; 
	myProm.style.width = '275px'; 
	myProm.style.height = '400px'; 
	myProm.style.outline= 'none'; 
	myProm.style.resize = 'none';
	myProm.style.backgroundcolor= 'solid blue';
	myProm.id = 'dynamicText';
	myProm.spellcheck = 'true';
	myProm.tabindex = '0';
	myProm.textContent = output;

	let mydiv = document.getElementById('promptSection')
	

	mydiv.appendChild(myProm);
	
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
		if (promptText.charAt(i) == '[' && !started){
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
		let autoTitle = document.createElement('h3');
		//content autofill and copy
		autoTitle.textContent = 'Autofill and Copy'
		
		mydiv.appendChild(autoTitle);
		//for blanks
		let blankName = document.createElement('small');
		let autoInput = document.createElement('input');
		let br;
		for (let x of blanks){
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
		copy.id = 'copy';
		await mydiv.appendChild(copy);
	 	autoListner(blanks,promptText);	
	//create blank box 

}	
async function saveBox(parse)
{
	if (parse.length <=1){
		var namevalue = 'Prompt Name...'
	}else{ 
		var namevalue = parse;
	}

	let nameInput = document.createElement('input');
	let nameButton = document.createElement('button');
	let nameText = document.createElement('small');

	nameText.textContent = 'Prompt Name:';

	nameInput.type = 'text';
	nameInput.id = 'pName';
	nameInput.value =  namevalue;

	nameButton.type = 'button';
	nameButton.id = 'save';
	nameButton.textContent = 'Save';


	let mydiv = document.getElementById('promptSection');

	await mydiv.appendChild(nameText);
	await mydiv.appendChild(nameInput);
	await mydiv.appendChild(nameButton);
	addme();

}

promBox();
