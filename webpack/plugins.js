const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');

const outsidePatterns = [
    { 
        from: path.resolve(__dirname, '../src/css'), 
        to: path.resolve(__dirname, '../dist/css'),
        noErrorOnMissing: true
    },
    {
        from: path.resolve(__dirname, '../src/lib'), 
        to: path.resolve(__dirname, '../dist/lib'),
        noErrorOnMissing: true
    }
];
const commonlibs = [
    {type: 'js', path: 'lib/vue.min.js'},
    {type: 'js', path: 'lib/vuex.min.js'},
    {type: 'js', path: 'lib/vue-router.min.js'},
    {type: 'js', path: 'lib/vuescroll-native.min.js'},
    {type: 'js', path: 'lib/xxtea.min.js'},
    {type: 'js', path: 'lib/axios.min.js'},
    {type: 'js', path: 'lib/md5.min.js'}
]
const libsMap = {
    member: [],
    finnace: []
}
module.exports = (moduleName, isOutsideCopy) => {
    const patterns = [
        { 
            from: path.resolve(__dirname, `../src/pages/${moduleName}/lib`), 
            to: path.resolve(__dirname, `../dist/pages/${moduleName}/lib`),
            noErrorOnMissing: true
        }
    ];
    const plugins = [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: `pages/${moduleName}/css/[name]_[contenthash:8].css`,
            chunkFilename: `pages/${moduleName}/css/[id]_[contenthash:8].css`,
            ignoreOrder: true
        }),
        new htmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/template/index.html'),
            filename: `${moduleName}.html`
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.VERSION': JSON.stringify(process.env.VERSION || 'local'),
            'process.env.THEME': JSON.stringify(process.env.THEME || 'mallwin'),
            'libs': JSON.stringify(commonlibs.concat(libsMap[moduleName] || [])),
        })
    ];

    isOutsideCopy && patterns.splice(patterns.length, 0, ...outsidePatterns);
    patterns.length > 0 && plugins.unshift(new CopyWebpackPlugin({patterns}));

    return plugins
}