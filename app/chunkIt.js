import hljs from 'highlight.js';
import chunk from 'lodash/chunk';

export default function chunkIt(arr) {
	if (!arr.length) return;
	let arrChunk = chunk(arr,10);
	setTimeout(function go() {
		const headArr = arrChunk.shift();
		headArr.forEach(function (el) {
			hljs.highlightBlock(el);
		});
		if (arrChunk.length) setTimeout(go, 200);
	}, 4);
}
