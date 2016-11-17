'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const path = require('path');
const webpack = require('webpack');

/** Пути */
const paths = {
	assets: path.join(__dirname, 'src/js'),
	public: path.join(__dirname, 'dist'),
};


module.exports = {

	/**
	 * Общий путь
	 */
	context: paths.assets,

	/**
	 * Точки входа
	 * Можно указать общий файл и в него, что-то общее добавить.
	 * common: "./javascript/common" и или можно включить в common другие файлы
	 * common: ["./javascript/welcome", "./javascript/common"]
	 */
	entry: {
		index: 'index.js'
	},

	/**
	 * Куда сохранять js
	 */
	output: {
		path: paths.public,
		filename: '[name].js',
		library: '[name]',
	},

	/**
	 * Запускаю watch, если это разработка
	 */
	watch: NODE_ENV == 'development',

	/**
	 * Параметры для watch
	 */
	watchOptions: {
		aggregateTimeout: 150
	},

	/**
	 * Собираю source-map, разные при разных режимах
	 */
	devtool: NODE_ENV == 'development' ? 'cheap-source-map' : 'source-map',

	/**
	 * Подключаю плагины
	 * 1. DefinePlugin, он передает всякие переменные в клиент
	 * 2. NoErrorsPlugin - не ломает webpack при ошибках
	 * 3. CommonsChunkPlugin - собирает из всех файлов один общий.
	 * Если указать chunks: ['about', 'home']
	 * дублировать плагин до тех пор, пока не надоест, то можно будет осознанно собирать общее с разных страниц.
	 * 4. ProvidePlugin подключение глобальные библиотек
	 */
	plugins: [
		new webpack.DefinePlugin({
			NODE_ENV: JSON.stringify(NODE_ENV)
		}),
		new webpack.NoErrorsPlugin()
	],

	/**
	 * Библиотеки с CDN
	 */

	// externals: {
	//     jQuery: '$'
	// },
	externals: {
		hljs: 'hljs'
	},

	/**
	 * Указываю пути где надо искать
	 * По моему я нахимичил с root..., оно работает как-то не так, как я хочу
	 * TODO: ПРОВЕРЬ!
	 */
	resolve: {
		root: [paths.assets],
		modulesDirectories: ['node_modules'],
		extensions: ['', '.js', ]
	},

	/**
	 * Указываю пути для лоадеров
	 */
	resolveLoader: {
		modulesDirectories: ['node_modules'],
		moduleTemplates: ['*-loader', '*'],
		extensions: ['', '.js']
	},

	/**
	 * Подключаю лоадеры
	 * 1. Babel
	 */
	module: {

		loaders: [{
			test: /\.js$/,
			include: [paths.assets],
			loader: 'babel',
			query: {
				presets: ['es2015'],
				plugins: ['transform-runtime']
			}
		}, ]

	}
};


/**
 * Если продакшен, то сжимаю
 */
if (NODE_ENV == 'production') {
	module.exports.plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				// don't show unreachable variables etc
				warnings: false,
				drop_console: true,
				unsafe: true,
			}
		})
	);
}
