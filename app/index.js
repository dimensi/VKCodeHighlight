import ObserveDom from './ObserveDom';
import VKCodeHighlight from './VKCodeHighlight';

const start = new VKCodeHighlight();
const myStyle = document.createElement('link');
myStyle.type = 'text/css';
myStyle.rel = 'stylesheet';
myStyle.href = chrome.extension.getURL('/files/styles/atom-one-light.css');
document.head.appendChild(myStyle);

/**
 * Запускаю при загрузки стилей скрипт.
 */
myStyle.onload = () => {
	start.init();
};

/**
 * Устаналиваю параметры для слежения за чатом.
 */
const observeChatBlock = new ObserveDom('.im-page--history', { attributes: true });
observeChatBlock.setCallback(function() {
	if (!document.querySelector('.im-page--history').classList.contains('im-page--history_empty')) {
		start.reinit();
	}
});

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