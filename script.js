var dynamicList = document.getElementById('test-list');
var textBox = document.getElementById("in");
var testForm = document.getElementById('inTest');

function addItem() {
	 var listItem = document.createElement('li');
	listItem.textContent = 'Test Item';
	dynamicList.appendChild(listItem);

}

function saveText(str){
	var listItem = document.createElement('li');
	listItem.textContent = str;
	dynamicList.appendChild(listItem);
}
testForm.addEventListener('submit',function(event) {
	console.log('we hit submit');
	event.preventDefault();
});

textBox.addEventListener("keyup",function(event){
	event.preventDefault();
	console.log('keyup');
	console.log('KEYCODE: '+event.keyCode);
	if (event.keyCode == 13){
		saveText(textBox.value);
	}
});
addItem();
