# 打包公共代码 #


## CommonsChunkPlugin ##

    The CommonsChunkPlugin 已经从 webpack v4 legato 中移除。想要了解在最新版本中如何处理 chunk，请查看 SplitChunksPlugin。


## SplitChunksPlugin ##


两种使用方法：

第一种：Plugins中直接添加

    new webpack.optimize.SplitChunksPlugin({
	    chunks: "all",
	    minSize: 20000,
	    minChunks: 1,
	    maxAsyncRequests: 5,
	    maxInitialRequests: 3,
	    name: true
	)}
第二种：也可以直接在optimization属性中设置

    optimization: {
        splitChunks:{
            chunks: "all",
            // name: 'common',
            minChunks: 2,
			minSize: 0,
        }
    },


1. chunks: 表示显示块的范围，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为all;
2. minSize: 表示在压缩前的最小模块大小，默认为0；
3. minChunks: 表示被引用次数，默认为1；
4. maxAsyncRequests: 最大的按需(异步)加载次数，默认为1；
5. maxInitialRequests: 最大的初始化加载次数，默认为1；
6. name: 拆分出来块的名字(Chunk Names)，默认由块名和hash值自动生成；
7. cacheGroups: 缓存组。

详情可查看[官网](https://webpack.docschina.org/plugins/split-chunks-plugin/)

## Cache Groups ##

如果想继续细分代码，可以使用缓存组(Cache Groups)。同样的，缓存组也有默认的配置；缓存组默认将node_modules中的模块拆分带一个叫做vendors的代码块中，将最少重复引用两次的模块放入default中
这是一段官方里面的代码：

    splitChunks: {
	    chunks: "async",
	    minSize: 30000,
	    minChunks: 1,
	    maxAsyncRequests: 5,
	    maxInitialRequests: 3,
	    automaticNameDelimiter: '~',
	    name: true,
	    cacheGroups: {
	        vendors: {
	            test: /[\\/]node_modules[\\/]/,
	            priority: -10
	        },
	    default: {
	            minChunks: 2,
	            priority: -20,
	            reuseExistingChunk: true
	        }
	    }
	}
上面是缓存组的默认配置，可以通过
**default:false**禁用默认的缓存组，然后就可以自定义缓存组，将初始化加载时被重复引用的模块进行拆分，就像这样：

    cacheGroups: {
	    commons: {
	        name: "commons",
	        chunks: "initial",
	        minChunks: 2
	    }
	}

之后就随心所欲，可以根据具体的需求，创建多个缓存组：

    cacheGroups: {
	    a: {
	        // ...
	    },
	    b: {
	        // ...
	    }
	    // ...
	}