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


// const chatContainer = document.querySelector('._im_peer_history.im-page-chat-contain');
// let lastObserver;


// const chatObserve = new ObserveDom(chatContainer);

// chatObserve.setCallback(function(mutations) {
// 	if (lastObserver) {
// 		console.log('Отключаюсь от прошлого слушателя');
// 		lastObserver.disconnect();
// 	}

// 	console.log('Слушаю весь чат');

// 	const arrNode = mutations.addedNodes;
// 	if (arrNode.length) {
// 		console.log('Массив с домом не пуст, запускаю второй слушатель');
// 		const lastNode = arrNode[arrNode.length - 1];
// 		const listOfMessages = lastNode.querySelector('.im-mess-stack--mess');
// 		const observeMessages = new ObserveDom(listOfMessages);
// 		observeMessages.setCallback(function() {
// 			console.log('Обновились сообщения в списке');
// 			start.reinit();
// 		});
// 		observeMessages.start();
// 		lastObserver = observeMessages;
// 	} else {
// 		start.reinit();
// 	}
// });

const chatBlock = document.querySelector('.im-page--history');
let lastTime = 0;
const observeChatBlock = new ObserveDom(chatBlock, { attributes: true });
observeChatBlock.setCallback(function() {
	if (lastTime + 3000 < Date.now()) {
		if (!chatBlock.classList.contains('im-page--history_empty')) {
			start.reinit();
			lastTime = Date.now();
		}
	}
});

observeChatBlock.start();