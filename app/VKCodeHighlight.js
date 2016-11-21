import chunkIt from './chunkIt';
import chunk from 'lodash/chunk';
/**
 * Класс для обработки и запуска подсветки
 * 
 * @class VKCodeHighlight
 */
export default class VKCodeHighlight {
	constructor() {}

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
		for (let el of messages) {
			let newMessage = el.querySelector('.im_msg_text');
			if (!newMessage === false) {
				// Проверяю, есть ли текст в основном блоке для сообщений, если есть, то добавляю этот блок в текст.
				if (newMessage.childNodes.length) {
					if (newMessage.innerText.startsWith('-//')) {
						arrEl.push(newMessage);
						continue;
					}
				}
			}
			//В основном блоке ничего не нашел, ищу в не основном, если нашел, добавляю.
			if (el.innerText.startsWith('-//')) {
				arrEl.push(el);
			}
		}
		return arrEl;
	}


	/**
	 * Обрабатывает список из getElements
	 * 
	 * @memberOf VKCodeHighlight
	 */
	wrapElements() {
		const arrEl = this.getElements;
		if (!arrEl.length) return;
		const rebuiledElements = arrEl.reduce((result, el) => {
			el.innerHTML = el.innerHTML.slice(3).replace(/»|«|—|<br>/g, function(match) {
				if (match == '<br>') return '\n';
				if (match == '»') return '>>';
				if (match == '«') return '<<';
				if (match == '—') return '--';
			}).trim();
			el.innerHTML = `<pre><code>${el.innerHTML}</pre></code>`;
			el.classList.add('vkch');
			result.push(el.querySelector('code'));
			return result;
		}, []).reverse();

		const resultArr = chunk(rebuiledElements.filter(el => !el.classList.contains('hljs')), 10);
		chunkIt(resultArr);
	}

}