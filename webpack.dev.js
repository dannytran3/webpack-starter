const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
    entry: {
        main: ['@babel/polyfill', 'whatwg-fetch', './src/js/index.js'],
        calendar: './src/js/fullcalendar.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'ccm_[name].js'
    },
    mode: 'development',
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
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    {
                        loader: 'file-loader?name="/images/ccm_[name].[ext]',
                        options: {
                            name: 'ccm_[name].[ext]',
                            outputPath: 'ccm_images'
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'ccm_[name].[ext]',
                            outputPath: 'ccm_fonts'
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
                            helperDirs: [path.join(__dirname, 'src/js', 'helpers')],
                            inlineRequires: '/assets/'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                handlebarsLoader: {}
            }
        }),
        new MiniCssExtractPlugin({
            // Extracts styles into a separate CSS file
            filename: 'ccm_[name].css',
            chunkFilename: 'ccm_[name].css'
        }),
        new HtmlWebpackPlugin({
            filename: 'ccm_dashboard.html',
            title: 'Dashboard',
            template: './src/html/dashboard.handlebars',
            chunks: ['calendar', 'vendors', 'main']
        }),
        new HtmlWebpackPlugin({
            filename: 'ccm_docket.html',
            title: 'Docket',
            template: './src/html/docket.handlebars',
            chunks: ['vendors', 'main']
        }),
        new HtmlWebpackPlugin({
            filename: 'ccm_case.html',
            title: 'Case',
            template: './src/html/case.handlebars',
            chunks: ['vendors', 'main']
        }),
        new HtmlWebpackPlugin({
            filename: 'ccm_bond.html',
            title: 'Bond',
            template: './src/html/bond.handlebars',
            chunks: ['vendors', 'main']
        })
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                // Separates third party libs into separate js file, including the polyfills
                vendor: {
                    test: /[\\/]node_modules[\\/]((?!(@fullcalendar)).*)[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    }
};

module.exports = config;
