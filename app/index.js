import ObserveDom from './ObserveDom';
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

const chatObserve = new ObserveDom(scrollEl);

chatObserve.setCallback(function(mutations) {
	if (lastObserver) {
		console.log('Отключаюсь от прошлого слушателя');
		lastObserver.disconnect();
	}

	console.log('Слушаю весь чат');

	const arrNode = mutations.addedNodes;
	if (arrNode.length) {
		console.log('Массив с домом не пуст, запускаю второй слушатель');
		const lastNode = arrNode[arrNode.length - 1];
		const listOfMessages = lastNode.querySelector('.im-mess-stack--mess');
		const observeMessages = new ObserveDom(listOfMessages);
		observeMessages.setCallback(function() {
			console.log('Обновились сообщения в списке');
			start.reinit();
		});
		observeMessages.start();
		lastObserver = observeMessages;
	} else {
		start.reinit();
	}
});