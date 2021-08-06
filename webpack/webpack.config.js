const path = require('path');

module.exports = {
    performance: {
        // 资源文件最大限制大小warning提示
        maxAssetSize: 1000 * 1024,
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor:{//node_modules内的依赖库
                    chunks:"all",
                    test: /[\\/]node_modules[\\/]/,
                    name:"vendor",
                    minChunks: 1, //被不同entry引用次数(import),1次的话没必要提取
                    maxInitialRequests: 5,
                    minSize: 0,
                    priority:100,
                    // enforce: true?
                },
                common: {//
                    chunks:"all",
                    test:/[\\/]src[\\/]styles[\\/]/,//也可以值文件/[\\/]src[\\/]js[\\/].*\.js/,  
                    name: "common", //生成文件名，依据output规则
                    minChunks: 1,
                    maxInitialRequests: 5,
                    minSize: 0,
                    priority:1
                },
                utils: {//
                    chunks:"all",
                    test:/[\\/]src[\\/]js[\\/]/,//也可以值文件/[\\/]src[\\/]js[\\/].*\.js/,  
                    name: "utils", //生成文件名，依据output规则
                    minChunks: 1,
                    maxInitialRequests: 5,
                    minSize: 0,
                    priority:1
                }
            }
        }	
    },
	resolve: {
		alias: {
            'vue$': path.resolve(__dirname, '../src/browser/vue'),
            '@': path.resolve(__dirname, '../src'),
            '@pages': path.resolve(__dirname, '../src/pages')
        },
        extensions: ['.js', '.vue', '.json'],
	}
}