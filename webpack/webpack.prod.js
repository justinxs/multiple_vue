const path = require('path');
const webpackMerge = require('webpack-merge');
const TerserPlugin = require("terser-webpack-plugin");
const baseConfig = require('./webpack.config')
const {getPagesEntry} = require('./filePath.js');
const getRules = require('./rules')
const getPlugins = require('./plugins')

const pagesEntry = getPagesEntry()
module.exports = Object.keys(pagesEntry).map((name, i) => {
    return webpackMerge.merge(baseConfig, {
        mode: 'production',
        entry: pagesEntry[name],
        output: {
            path: path.resolve(__dirname, `../dist`),
            filename: `pages/${name}/js/[id]_[chunkhash].js`,
		    chunkFilename:`pages/${name}/js/[name]_[chunkhash].js`,
            publicPath: ''
        },
        optimization: {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    extractComments: false,
                })
            ],
        },
        module: {
            rules: getRules(name)
        },
        plugins: getPlugins(name, i == 0),
        resolve: {
            alias: {
                '@theme': path.resolve(__dirname, `../src/pages/${name}/styles/themes/${process.env.THEME || 'mallwin'}.scss`)
            }
        }
    })
})
