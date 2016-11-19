module.exports = {
	files: {
		javascripts: {
			entryPoints: {
				'app/index.js': 'vkchl.js'
			}
		},

		stylesheets: {
			joinTo: {
				'style.css': 'style.styl'
			}
		}
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