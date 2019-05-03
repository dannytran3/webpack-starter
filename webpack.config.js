const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const config = {
    entry: ['@babel/polyfill', 'whatwg-fetch', './src/js/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        // when using @babel/preset-env, include polyfill at the entry point
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader', // translates CSS into CommonJS modules
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader', // Run postcss actions
                        options: {
                            plugins: function() {
                                // postcss plugins, can be exported to postcss.config.js
                                // adds browser specific prefixes to css properties
                                return [require('autoprefixer')];
                            },
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader', // compiles Sass to CSS,
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'images'
                        }
                    }
                ]
            },
            {
                test: /\.handlebars$/,
                use: [
                    {
                        loader: 'handlebars-loader',
                        options: {
                            partialDirs: [path.join(__dirname, 'src/html', 'partials')],
                            helperDirs: [path.join(__dirname, 'src/js', 'helpers')]
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        // new HtmlWebpackPlugin({
        //     template: require('html-webpack-template'),
        //     inject: false,
        //     appMountId: 'app'
        // })
        new webpack.LoaderOptionsPlugin({
            options: {
                handlebarsLoader: {}
            }
        }),
        new HtmlWebpackPlugin({
            title: 'My awesome service',
            template: './src/html/index.handlebars'
        }),
        new MiniCssExtractPlugin({
            // Extracts styles into a separate CSS file
            filename: '[name].css',
            chunkFilename: '[name].css'
        }),
        new OptimizeCssAssetsPlugin({
            // Minifies CSS
            // Using this plugin because the default minifier in Webpack does not remove redundant styles
            assetNameRegExp: /\.(sa|sc|c)ss$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { map: { inline: false, annotation: true } },
            cssProcessorPluginOptions: {
                preset: ['default', { discardComments: { removeAll: true } }]
            },
            canPrint: true
        })
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                // Separates third party libs into separate js file, including the polyfills
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    }
};

module.exports = config;
