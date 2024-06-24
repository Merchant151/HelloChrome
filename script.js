var dynamicList = document.getElementById('test-list');
var textBox = document.getElementById("in");

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

textBox.addEventListener("keyup",function(event){
	if (event.keyCode == 13){
		saveText(textBox.value);
	}
});
addItem();


