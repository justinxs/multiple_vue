const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const getThemesEntry = require('./filePath.js').getThemesEntry;
const entrys = getThemesEntry()
module.exports = Object.keys(entrys).map(name => {
    return {
        mode: 'none',
        entry: entrys[name],
        output: {
            path: path.resolve(__dirname, '../dist'),
            filename: `pages/${name}/themes/js/[name].js`,
            publicPath: ''
        },
        performance: {
            // 资源文件最大限制大小warning提示
            maxAssetSize: 500 * 1024,
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: `pages/${name}/themes/[name].css`,
                ignoreOrder: false
            })
        ],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, '../src'),
                '@styles': path.resolve(__dirname, '../src/styles'),
                '@images': path.resolve(__dirname, '../src/images')
            },
            extensions: ['.js', '.vue', '.json'],
        },
        module: {
            rules: [
                {
                    test: /\.(png|jpe?g|gif|svg)$/,
                    type: 'asset',
                    parser: {
                        dataUrlCondition: {
                            maxSize: 4 * 1024 // 4kb
                        }
                    },
                    generator: {
                        filename: `pages/${name}/images/[name].[hash][ext]`,
                    }
                },
                {
                    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                    type: 'asset',
                    parser: {
                        dataUrlCondition: {
                            maxSize: 10 * 1024 // 10kb
                        }
                    },
                    generator: {
                        filename: `pages/${name}/fonts/[name].[hash][ext]`,
                    }
                },
                // 它会应用到普通的 `.css` 文件
                // 以及 `.vue` 文件中的 `<style>` 块
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options:{
                                publicPath: '../../../'
                            }
                        },
                        {
                            loader: 'css-loader',
                            options: { importLoaders: 1 }
                        },
                        { 
                            loader: 'postcss-loader', options: 
                            { 
                                postcssOptions: loader => {
                                    return {
                                        plugins: [
                                            require('postcss-import')({ root: loader.resourcePath }),
                                            require('autoprefixer')({
                                                overrideBrowserslist: ['Android >= 9', 'iOS >= 11']
                                            }),
                                            require('cssnano')()
                                        ]
                                    }
                                }
                            } 
                        }
                    ]
                },
                {
                    test: /\.scss$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options:{
                                publicPath: '../../../'
                            }
                        },
                        'css-loader',
                        { 
                            loader: 'postcss-loader', options: 
                            { 
                                postcssOptions: loader => {
                                    return {
                                        plugins: [
                                            require('postcss-import')({ root: loader.resourcePath }),
                                            require('autoprefixer')({
                                                overrideBrowserslist: ['Android >= 9', 'iOS >= 11']
                                            }),
                                            require('cssnano')()
                                        ]
                                    }
                                }
                            } 
                        },
                        'sass-loader'
                    ]
                }
            ]
        }
    }
})