import ObserveDom from './ObserveDom';
import VKCodeHighlight from './VKCodeHighlight';
import debounce from 'lodash/debounce';

const start = new VKCodeHighlight();
const myStyle = document.createElement('link');
myStyle.type = 'text/css';
myStyle.rel = 'stylesheet';
myStyle.href = chrome.extension.getURL('/files/styles/atom-one-light.css');
document.head.appendChild(myStyle);

/**
 * Устаналиваю параметры для слежения за чатом.
 */
const observeChatBlock = new ObserveDom('.im-page--history', { attributes: true });
observeChatBlock.setCallback(debounce(function () {
	if (!document.querySelector('.im-page--history').classList.contains('im-page--history_empty')) {
		start.wrapElements();
	}	
}, 100));

if (/vk.com\/im/.test(window.location.href)) {
	observeChatBlock.start();
}
/**
 * Устанавливаю параметры для слежения на title
 */
let changed = true;
const observeTitle = new ObserveDom('title');
observeTitle.setCallback(function() {
	if (/vk.com\/im/.test(window.location.href)) {
		if (changed) {
			observeChatBlock.start();
			changed = false;
		}
	} else {
		changed = true;
		observeChatBlock.disconnect();
	}
});
observeTitle.start();

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