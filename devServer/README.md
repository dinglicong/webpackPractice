## webpack devServer ##
### 热模块更新 ###
热模块更新 是在webpack开发使用中非常常见的一个功能

	devServer: {
		index: "index.html",
		//服务端口
		port: 3000,
		//是否监听contentBase目录
		watchContentBase: true,
		/*设置contentBase
		 *告诉服务器从哪个目录中提供内容.
		 */
		contentBase: path.join(__dirname, 'src'),
		// 是否热更新
		hot: true,
		// 是否自动打开页面
		open: true,
	},
**注意：** 必须有 webpack.HotModuleReplacementPlugin 才能完全启用 HMR。如果 webpack 或 webpack-dev-server 是通过 --hot 选项启动的，那么这个插件会被自动添加，所以你可能不需要把它添加到 webpack.config.js 中。关于更多信息，[请查看 HMR 概念 页面。](https://webpack.docschina.org/concepts/hot-module-replacement)

	plugins: [
		...
		new webpack.HotModuleReplacementPlugin(),
		...
	]

### source-map ###

webpack打包出来的代码如何调试？
这里就需要使用source-map对打包代码做映射
结合 devServer 可实现本地前端服务。

|devtool|构建速度|重新构建速度|生产环境|品质(quality)|
| ------ | ------ | ------ | ------ |
|(none)|+++|+++|yes|打包后的代码|
|eval|+++|+++|no|生成后的代码|
|cheap-eval-source-map|+|++|no|转换过的代码（仅限行）|
|cheap-module-eval-source-map|o|++|no|原始源代码（仅限行）|
|eval-source-map|--|+|no|原始源代码|
|cheap-source-map|+|o|yes|转换过的代码（仅限行）|
|cheap-module-source-map|o|-|yes|原始源代码（仅限行）|
|inline-cheap-source-map|+|o|no|转换过的代码（仅限行）|
|inline-cheap-module-source-map|o|-|no|原始源代码（仅限行）|
|source-map|--|--|yes|原始源代码|
|inline-source-map|--|--|no|原始源代码|
|hidden-source-map|--|--|yes|原始源代码|
|nosources-source-map|--|--|yes|无源代码内容|

###品质说明(quality)###

`打包后的代码` - 将所有生成的代码视为一大块代码。你看不到相互分离的模块。

`生成后的代码` - 每个模块相互分离，并用模块名称进行注释。可以看到 webpack 生成的代码。示例：你会看到类似 `var module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(42); module__WEBPACK_IMPORTED_MODULE_1__.a();，而不是 import {test} from "module"; test();`。

`转换过的代码` - 每个模块相互分离，并用模块名称进行注释。可以看到 webpack 转换前、loader 转译后的代码。示例：你会看到类似 `import {test} from "module"; var A = function(_test) { ... }(test);，而不是 import {test} from "module"; class A extends test {}`。

`原始源代码` - 每个模块相互分离，并用模块名称进行注释。你会看到转译之前的代码，正如编写它时。这取决于 loader 支持。

`无源代码内容` - source map 中不包含源代码内容。浏览器通常会尝试从 web 服务器或文件系统加载源代码。你必须确保正确设置 output.devtoolModuleFilenameTemplate，以匹配源代码的 url。

`（仅限行）` - source map 被简化为每行一个映射。这通常意味着每个语句只有一个映射（假设你使用这种方式）。这会妨碍你在语句级别上调试执行，也会妨碍你在每行的一些列上设置断点。与压缩后的代码组合后，映射关系是不可能实现的，因为压缩工具通常只会输出一行。