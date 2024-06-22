var dynamicList = document.getElementById('test-list');
var textBox = document.getElementbyID("in");

function addItem() {
	 var listItem = document.createElement('li');
	listItem.textContent = 'Test Item';
	dynamicList.appendChild(listItem);

}

addItem();


