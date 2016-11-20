export default class ObserveDom {
	constructor(el, config = { childList: true }) {
		this.el = el;
		this.config = config;
	}

	setCallback(func) {
		this.observe = new MutationObserver(function(mutations) {
			mutations.forEach(function(mutations) {
				func(mutations);
			});
		});
	}

	start() {
		this.observe.observe(this.el, this.config);
	}

	disconnect() {
		this.observe.disconnect();
	}

}