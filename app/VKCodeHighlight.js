import hljs from 'highlight.js';
/**
 * Класс для обработки и запуска подсветки
 * 
 * @class VKCodeHighlight
 */
export default class VKCodeHighlight {

	/**
	 * Creates an instance of VKCodeHighlight.
	 * 
	 * @param {string} el
	 * 
	 * @memberOf VKCodeHighlight
	 */
	constructor() {
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
		const messages = document.querySelectorAll('.im-mess--text.wall_module._im_log_body');
		messages.forEach(function (el) {
			let newMessage = el.querySelector('.im_msg_text').childNodes ? el.querySelector('.im_msg_text').childNodes.length : false;
			let childWithMessage = el.querySelector('.im_msg_text');
			if (newMessage) {
				// Проверяю, есть ли текст в основном блоке для сообщений, если есть, то добавляю этот блок в текст.
				if (childWithMessage.innerText.startsWith('-//')) {
					arrEl.push(childWithMessage);
				}
			} else {
				// Текста не оказалось, поэтому работую с родителем.
				if (el.innerText.startsWith('-//')) {
					arrEl.push(el);
				}
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
			let newText = el.innerHTML.slice(3).replace(/<br>/g, '\n').trim();
			el.innerHTML = newText;
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