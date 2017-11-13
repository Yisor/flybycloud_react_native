/**
 * Created by feiba on 2017/11/7.
 */
const webpack = require('webpack')
const path = require('path')

module.exports = {
	entry: {
		main: './index.js',
	},
	module: {
		loaders: [
			{
				test: /\.js?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015', 'react'],
				},
			},
		],
	},
	resolve: {
		alias: {
			'react-native': 'react-native-web',
		},
	},
	output: {
		filename: 'bundle.js'
	}
};