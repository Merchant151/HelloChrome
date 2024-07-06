


document.getElementById('save').addEventListener("click",function(){
console.log('memory testing');
	chrome.storage.local.get(null).then((result) => {
		console.log(Object.keys(result));
	});
});
