const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (moduleName) => {
    return [
        {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
            }
        },
        {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: file => (
                /node_modules/.test(file) && !/\.vue\.js/.test(file)
            )
        },
        {
            test: /\.(png|jpe?g|gif|svg)$/,
            type: 'asset',
            parser: {
                dataUrlCondition: {
                    maxSize: 4 * 1024 // 4kb
                }
            },
            generator: {
                filename: `pages/${moduleName}/images/[name].[hash][ext]`,
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
                filename: `pages/${moduleName}/fonts/[name].[hash][ext]`,
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