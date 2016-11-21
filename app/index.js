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



let lastTime = 0;
const observeChatBlock = new ObserveDom('.im-page--history', { attributes: true });
observeChatBlock.setCallback(function() {
	if (lastTime + 2000 < Date.now()) {
		if (!document.querySelector('.im-page--history').classList.contains('im-page--history_empty')) {
			start.reinit();
			lastTime = Date.now();
		}
	}
});

const observeTitle = new ObserveDom('title');
let changed = true;
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