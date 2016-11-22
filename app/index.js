import ObserveDom from './ObserveDom';
import VKCodeHighlight from './VKCodeHighlight';
import debounce from 'lodash/debounce';
import hljs from 'highlight.js';

hljs.configure({
	languages: ['javascript', 'php', 'html', 'xml', 'xhtml', 'atom', 'css']
});


const start = new VKCodeHighlight();
const myStyle = document.createElement('link');
myStyle.type = 'text/css';
myStyle.rel = 'stylesheet';
myStyle.href = chrome.extension.getURL('/files/styles/atom-one-light.css');
document.head.appendChild(myStyle);

/**
 * Устаналиваю параметры для слежения за чатом.
 */
const observeChatBlock = new ObserveDom('.im-page--history', {
	attributes: true
});
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
observeTitle.setCallback(function () {
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