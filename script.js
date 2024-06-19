var dynamicList = document.getElementById('test-list');

function addItem() {
	 var listItem = document.createElement('li');
	listItem.textContent = 'Test Item';

	dynamicList.appendChild(listItem);

}

addItem();


