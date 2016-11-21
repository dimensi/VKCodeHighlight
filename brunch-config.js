module.exports = {
	files: {
		javascripts: {
			entryPoints: {
				'app/index.js': 'index.js'
			},
		},
		stylesheets: {
			joinTo: {
				'style.css': /^app/
			}
		}
	},

	modules: {
		autoRequire: {
			'index.js': ['index']
		}
	},
	watcher: {
		awaitWriteFinish: true,
		usePolling: true
	},
	plugins: {
		babel: {
			presets: [['env', {
				'targets': {
					'chrome': 54
				}
			}]]
		}
	}
};