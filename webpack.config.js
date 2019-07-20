'use strict';

const path = require('path');
const libPath = path.join(__dirname, 'lib');
const wwwPath = path.join(__dirname, 'www');
const pkg = require('./package.json');
var CopyWebpackPlugin = require('copy-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: path.join(libPath, 'index.js'),
	devtool: 'source-map',
	output: {
		path: wwwPath,
		filename: 'simulator-[hash:6].js',
	},
	mode: 'development',
	module: {
		rules: [
			{
				test: /[\/]angular\.js$/,
				loader: 'expose-loader?angular!exports-loader?window.angular',
			}, {
				test: /\.(html|svg)$/,
				loader: 'html-loader',
			}, {
				test: /\.json$/,
				loader: 'json-loader',
			}, {
				test: /\.png$/,
				use: ['file-loader',
						{
							loader:'image-webpack-loader',
							options:{
								bypassOnDebug:true,
								disable:true,
							},
						},
				],
			}, {
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader?importLoaders=1',
					'postcss-loader',
				],
			},
		],

	},
	resolve: {
		extensions: ['.js', '.json', '.css', '.html'],
		modules: [
			libPath,
			'node_modules',
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			pkg,
			template: path.join(libPath, 'index.ejs'),
		}),
		new CopyWebpackPlugin([
			{
				from: './lib/assets',
				to: 'assets',
			}
		]),
	],
};
