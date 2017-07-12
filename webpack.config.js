//This config file is use for webpack build for production
var webpack = require('webpack'); 
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin'); //auto config <script src> for index.html base on js in dist folder
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var combineLoaders = require('webpack-combine-loaders');

const VENDORS = [	//code which has long time update (stable code) => improve download speed
	'react', 
	'react-bootstrap', 
	'react-dom', 
	'react-router', 
	'react-router-bootstrap',
];

const config = {
	entry: {
		bundle: './src/index.js',
		vendor: VENDORS
	},
	output: {
		path: path.join(__dirname, 'dist'),	//Create hash add to file name, help browser easily regconize file changed
		filename: '[name].[chunkhash].js',	//Code spliting : bundle.js and vendor.js => reduce size of bundle.js
		publicPath: '/'            	//PRODUCTION: use for url-loader to lookup big images
	},
	module: {
	loaders: [
			{
				exclude: /node_modules/,	//exclude babel-loader in this folder
				loader: 'babel-loader',     //tell babel how to work with webpack
				test: /\.js$/,              //regex, all files .js will be applied by babel-loader
				query: {
					presets: ['react', 'es2015', 'stage-1']
				}
			},
			{
				use: ['style-loader', 'css-loader'], //apply loader from right to left
				test: /\.css$/
			},		
		]
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({	//vendor.js contain vendor code only, bundle.js doesn't
			names: ['vendor', 'manifest']			//put in vendor.js, helps browser caching easily
		}),
		new HtmlWebpackPlugin({
			template: 'src/index.html'  	//file that plugin will effect
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
		})
	]

};
module.exports = config;
