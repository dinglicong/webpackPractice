# treeshaking #
tree shaking 是一个术语，通常用于描述移除 JavaScript 上下文中的未引用代码(dead-code)。它依赖于 ES2015 模块系统中的静态结构特性，例如 import 和 export。

[如何在webpack4中使用treeshaking](https://webpack.docschina.org/guides/tree-shaking/)

###以上文档虽然可用，但是存在问题###

1. webapck4.*中在mode: 'development'模式下无论怎样都无法触发js的treeshaking?
2. 当且只有在mode: 'puduction'的情况下才能触发treeshaking?


###CSS treeshaking###

	plugins: [
		...
		new ExtractTextWebpackPlugin('style.css'),
		new PurifyCss({
			// css shaking路径
			paths: glob.sync([ // 同时加载多路径
				path.resolve(__dirname, './*.html'),
				path.resolve(__dirname, './src/*.js'),
			])
		})
		...
	]

### 使用webpack 4.X中Plugin遇到的问题 ###

![](https://i.imgur.com/PIEkV5h.png)


**解决方法：输入命令npm install extract-text-webpack-plugin@next**

**原因：[https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/701]('https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/701')**