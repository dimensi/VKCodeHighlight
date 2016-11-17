import hljs from 'highlight.js';
import observeDOM from './observeDOM';

class VKCodeH {

	constructor(el) {
		this.chat = document.querySelectorAll(el);
	}

	get getElements() {
		const arrEl = [];
		this.chat.forEach(function(el) {
			if (el.innerText.search(/-\/\//g) !== -1) {
				arrEl.push(el);
			}
		});
		return arrEl;
	}

	rebuildEl() {
		const arrEl = this.getElements;
		arrEl.forEach(function(el) {
			el.innerHTML = el.innerHTML.replace(/-\/\//g, '').replace(/<br>/g, '\n');
			let newHtml = `<pre><code>${el.innerHTML}</pre></code>`;
			el.innerHTML = newHtml;
			el.classList.add('code');
		});
	}

	init() {
		this.rebuildEl();
		hljs.initHighlighting();
	}

	reinit() {
		this.rebuildEl();
		let arr = document.querySelectorAll('.code');
		arr.forEach(function(el) {
			hljs.highlightBlock(el);
		});
	}
}

const start = new VKCodeH('.im_msg_text');
const myStyle = document.createElement('link');
myStyle.type = 'text/css';
myStyle.rel = 'stylesheet';
myStyle.href = chrome.extension.getURL('/files/styles/atom-one-light.css');
document.head.appendChild(myStyle);

myStyle.onload = () => {
	start.init();
};

observeDOM(document.querySelector('._im_name_el'), function() {
	start.reinit();
});