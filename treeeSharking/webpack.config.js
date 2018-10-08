var path = require('path');
var webpack = require('webpack');
var PurifyCss = require('purifycss-webpack');
var glob = require('glob-all');
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
var UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin')

module.exports  = {
	// mode: 'development',
	//  
	mode: "production",
	entry: {
		app: './src/app.js',
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: './dist/',
		filename: '[name].bundle.js',
		// chunkFilename: '[name].chunk.js',
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ExtractTextWebpackPlugin.extract({
					// 应用于当 CSS 没有被提取,该用怎样的方式将CSS加载到页面中 （类似于备胎）
					fallback: 'style-loader',
					use: 'css-loader',
				})
			}, 
// 			{
// 				test: /\.css$/,
// 				use: [{
// 					loader: 'style-loader',
// 					options: {
// 						singleton: true,
// 					}
// 				}, {
// 					loader: 'css-loader',
// 					options: {
// 						// 启用/禁用 压缩
// 						minimize: true,
// 						// 启用/禁用 CSS module
// 						modules: true,
// 						/*
// 							配置生成的标识符(ident)
// 							path: 文件路径
// 							name: 文件名
// 							local: 类名
// 							hash: hash码
// 						*/
// 						localIdentName: '[path][name]_[local]_[hash:base64:5]',
// 					}
// 				}]
// 			}
		]
	},
	optimization: {
		minimize: true,
		// 分离manifest
// 		runtimeChunk: {
// 			name: "manifest",
// 		},
// 		minimizer: [
// 			new UglifyJsWebpackPlugin({
// 				test: /.js($|\?)/i,
// 				exclude: /\/node_modules/,
// 			}),
// 		]
	},
	plugins: [
		new ExtractTextWebpackPlugin('style.css'),
		new PurifyCss({
			// css shaking路径
			paths: glob.sync([ // 同时加载多路径
				path.resolve(__dirname, './*.html'),
				path.resolve(__dirname, './src/*.js'),
			])
		})
		//  removed
		// new webpack.optimize.UglifyJsPlugin(),
// 		new UglifyJsWebpackPlugin({
// 			test: /.js($|\?)/i,
// 			exclude: /\/node_modules/,
// 		}),
	]
};