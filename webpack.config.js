
var webpack = require('webpack'); 
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin'); 
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var combineLoaders = require('webpack-combine-loaders');

const VENDORS = [
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
		path: path.join(__dirname, 'dist'),	
		filename: '[name].[chunkhash].js',	
		publicPath: '/'            
	},
	module: {
	loaders: [
			{
				exclude: /node_modules/,	
				loader: 'babel-loader',     
				test: /\.js$/,              
				query: {
					presets: ['react', 'es2015', 'stage-1']
				}
			},
			{
				use: ['style-loader', 'css-loader'], 
				test: /\.css$/
			},		
		]
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({	
			names: ['vendor', 'manifest']			
		}),
		new HtmlWebpackPlugin({
			template: 'src/index.html'  	
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
		})
	]

};
module.exports = config;
