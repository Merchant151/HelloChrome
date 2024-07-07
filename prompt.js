
var name = 'key';
var prom = 'value';

document.getElementById('save').addEventListener("click",function(){
	console.log('memory testing');
	chrome.storage.local.set({name: prom}).then(() => {
	console.log("set values")
	});
	chrome.storage.local.get(null).then((result) => {
		console.log(Object.keys(result));
	});
});
