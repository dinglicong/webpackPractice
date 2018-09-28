var webpack = require('webpack');
var path = require('path');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'none',
	devtool: 'eval-source-map',
    entry: {
        index: "./src/index.js",
        // pageB: "./src/pageB.js"
    },
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'index_bundle.js'
	},
	devServer: {
		index: "index.html",
		port: 3000,
		watchContentBase: true,
		contentBase: path.join(__dirname, 'src'),
		/*
		必须有 webpack.HotModuleReplacementPlugin 才能完全启用 HMR。
		如果 webpack 或 webpack-dev-server 是通过 --hot 选项启动的，
		那么这个插件会被自动添加，
		所以你可能不需要把它添加到 webpack.config.js 中。
		*/
		hot: true,
		open: true,
	},
	plugins: [
		new HtmlWebpackPlugin(),
		//
		new webpack.HotModuleReplacementPlugin()
	],
}
