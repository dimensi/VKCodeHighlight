export default class ObserveDom {
	constructor(el, config = { childList: true }) {
		this.el = el;
		this.config = config;
	}

	setCallback(func) {
		this.observe = new MutationObserver(function(mutations) {
			mutations.forEach(function(mutation) {
				func(mutation);
			});
		});
	}

	start() {
		this.observe.observe(document.querySelector(this.el), this.config);
	}

	disconnect() {
		this.observe.disconnect();
	}

}