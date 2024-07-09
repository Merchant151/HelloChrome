
var name = 'key';
var prom = 'value';
var textBox = document.getElementById("textarea");
var ActiveKey = '';

document.getElementById('save').addEventListener("click",function(){
	console.log('memory testing');
	chrome.storage.local.set({key: textBox.value}).then(() => {
	console.log("set values");
	});
	chrome.storage.local.get(null).then((result) => {
		console.log(Object.keys(result));
		ActiveKey = Object.keys(result);
	});
	console.log('Active Key value is: ' + ActiveKey);
	console.log('textbox value is: ' + textBox.value);
	chrome.storage.local.get(ActiveKey).then((result) => {
		console.log("value: " + result[name]);
	});
});
