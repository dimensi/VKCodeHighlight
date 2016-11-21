import hljs from 'highlight.js';
import chunk from 'lodash/chunk';

const go = (array) => {
	const headArr = array.shift();
	headArr.forEach(function (el) {
		hljs.highlightBlock(el);
	});
	if (array.length) setTimeout(go, 200);
};

export default function chunkIt(arr) {
	if (!arr.length) return;
	let arrChunk = chunk(arr,10);
	go(arrChunk);
}
