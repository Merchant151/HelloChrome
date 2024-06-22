var dynamicList = document.getElementById('test-list');
var textBox = document.getElementbyID("in");

function addItem() {
	 var listItem = document.createElement('li');
	listItem.textContent = 'Test Item';
	dynamicList.appendChild(listItem);

}

function saveText(){
	var listItem = document.createElement('li');
	listItem.textContent = str;
	dynamicList.appendChild(listItem);
}

textBox.addEventListner("keyup",function(event){
	if (event.keyCode == 13){
		saveText(textBox.value)
	}
});
addItem();


