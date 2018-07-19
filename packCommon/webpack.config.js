var webpack = require('webpack');
var path = require('path');
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'none',
    entry: {
        pageA: "./src/pageA.js",
        pageB: "./src/pageB.js"
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js',
    },
    optimization: {
        splitChunks:{
            chunks: "all",
            // name: 'common',
            minChunks: 2,
			minSize: 0,
        }
    },
    plugins: [
        new CleanWebpackPlugin(['dist'])
    ]
//  plugins: [
//      new webpack.optimize.SplitChunksPlugin({
//          name: 'common',
//          minChunks: 2
//      })
//  ]
}
