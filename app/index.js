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


const scrollEl = document.querySelector('.im-page--chat-body-abs .ui_scroll_bar_inner');
observeDOM(scrollEl, function () {
	start.reinit();
});
