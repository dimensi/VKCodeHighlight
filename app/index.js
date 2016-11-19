//import hljs from 'highlight.js';
import observeDOM from './vendors/observeDOM';

alert('hello');
/**
 * Класс для обработки и запуска подсветки
 * 
 * @class VKCodeHighlight
 */
class VKCodeHighlight {

	/**
	 * Creates an instance of VKCodeHighlight.
	 * 
	 * @param {string} el
	 * 
	 * @memberOf VKCodeHighlight
	 */
	constructor(el) {
		this.chat = el;
	}

	/**
	 * Возвращает список элементов, которые подходят под разметку
	 * 
	 * @readonly
	 * 
	 * @memberOf VKCodeHighlight
	 */
	get getElements() {
		const arrEl = [];
		const elements = document.querySelectorAll(this.chat);
		elements.forEach(function (el) {
			if (el.innerText.search(/-\/\//g) !== -1) {
				arrEl.push(el);
			}
		});
		return arrEl;
	}


	/**
	 * Обрабатывает список из getElements
	 * 
	 * @memberOf VKCodeHighlight
	 */
	rebuildEl() {
		const arrEl = this.getElements;
		arrEl.forEach(function (el) {
			el.innerHTML = el.innerHTML.replace(/-\/\//g, '').replace(/<br>/g, '\n');
			let newHtml = `<pre><code>${el.innerHTML}</pre></code>`;
			el.innerHTML = newHtml;
			el.classList.add('code');
		});
	}

	/**
	 * Первая инициализация
	 * 
	 * @memberOf VKCodeHighlight
	 */
	init() {
		this.rebuildEl();
		hljs.initHighlighting();
	}


	/**
	 * 
	 * Пересборка
	 * 
	 * @memberOf VKCodeHighlight
	 */
	reinit() {
		this.rebuildEl();
		const arr = document.querySelectorAll('code');
		arr.forEach(function (el) {
			hljs.highlightBlock(el);
		});
	}
}

const start = new VKCodeHighlight('.im_msg_text');
const myStyle = document.createElement('link');
myStyle.type = 'text/css';
myStyle.rel = 'stylesheet';
myStyle.href = chrome.extension.getURL('/files/styles/atom-one-light.css');
document.head.appendChild(myStyle);

myStyle.onload = () => {
	start.init();
};

observeDOM(document.querySelector('._im_name_el'), function () {
	start.reinit();
});