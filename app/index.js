import observeDOM from './vendors/observeDOM';
import VKCodeHighlight from './VKCodeHighlight';

const start = new VKCodeHighlight();
const myStyle = document.createElement('link');
myStyle.type = 'text/css';
myStyle.rel = 'stylesheet';
myStyle.href = chrome.extension.getURL('/files/styles/atom-one-light.css');
document.head.appendChild(myStyle);

myStyle.onload = () => {
	start.init();
};


const scrollEl = document.querySelector('.im-page-chat-contain');
let lastObserver;
observeDOM(scrollEl, function (mutations) {
	if (lastObserver) {
		console.log('Отключаюсь от прошлого слушателя');
		lastObserver.disconnect();
	} 
	console.log('Слушаю весь чат');
	let arrNode = mutations[0].addedNodes;
	if (arrNode.length !== 0) {
		console.log('Массив с домом не пуст, запускаю второй слушатель');
		let lastNode = arrNode[arrNode.length - 1];
		let listOfMessages = lastNode.querySelector('.im-mess-stack--mess');
		const observeMessages = new MutationObserver(function(mutations) {
			mutations.forEach(function() {
				start.reinit();
			});
		});
		lastObserver = observeMessages.observe(listOfMessages, { childList: true });
	} else {
		console.log('Массив был пуст, запускаю просто так');
		start.reinit();
	}
});
