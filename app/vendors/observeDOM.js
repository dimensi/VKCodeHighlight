/**
 * // Observe a specific DOM element:
observeDOM( document.getElementById('dom_element') ,function(){ 
    console.log('dom changed');
});
 */
const observeDOM = (function () {
	const MutationObserver = window.MutationObserver || window.WebKitMutationObserver, eventListenerSupported = window.addEventListener;

	return function (obj, callback) {
		if (MutationObserver) {
			// define a new observer
			const obs = new MutationObserver(function (mutations, observer) {
				if (mutations[0].addedNodes.length || mutations[0].removedNodes.length)
					callback();
			});
			// have the observer observe foo for changes in children
			obs.observe(obj, { childList: true, subtree: true });
		}
		else if (eventListenerSupported) {
			obj.addEventListener('DOMNodeInserted', callback, false);
			obj.addEventListener('DOMNodeRemoved', callback, false);
		}
	};
})();

export default observeDOM;