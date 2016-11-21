import hljs from 'highlight.js';
import chunk from 'lodash/chunk';
import head from 'lodash/head';
import tail from 'lodash/tail';

export default function chunkIt(arr) {
	if (!arr.length) return;
	let arrChunk = chunk(arr,10);
	setTimeout(function go() {
		const headArr = head(arrChunk);
		headArr.forEach(function (el) {
			hljs.highlightBlock(el);
		});
		arrChunk = tail(arrChunk);
		if (arrChunk.length) setTimeout(go, 100);
	}, 100);
}