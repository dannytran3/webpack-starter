const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const config = {
    entry: {
        main: ['@babel/polyfill', 'whatwg-fetch', './src/js/index.js'],
        calendar: './src/js/fullcalendar.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'ccm_[name].js'
    },
    mode: 'production',
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
                        loader: 'css-loader' // translates CSS into CommonJS modules
                    },
                    {
                        loader: 'postcss-loader', // Run postcss actions
                        options: {
                            plugins: function() {
                                // postcss plugins, can be exported to postcss.config.js
                                // adds browser specific prefixes to css properties
                                return [require('autoprefixer')];
                            }
                        }
                    },
                    {
                        loader: 'sass-loader' // compiles Sass to CSS,
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
                    // {
                    //     loader: 'image-webpack-loader',
                    //     options: {
                    //         mozjpeg: {
                    //             progressive: true,
                    //             quality: 65
                    //         },
                    //         // optipng.enabled: false will disable optipng
                    //         optipng: {
                    //             enabled: false
                    //         },
                    //         pngquant: {
                    //             quality: '65-90',
                    //             speed: 4
                    //         },
                    //         gifsicle: {
                    //             interlaced: false
                    //         },
                    //         svgo: {
                    //             plugins: [{ removeViewBox: false }]
                    //         }
                    //     }
                    // }
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
            chunkFilename: '[name].css'
        }),
        new OptimizeCssAssetsPlugin({
            // Minifies CSS
            // Using this plugin because the default minifier in Webpack does not remove redundant styles
            assetNameRegExp: /\.(sa|sc|c)ss$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default', { discardComments: { removeAll: true } }]
            },
            canPrint: true
        }),
        new HtmlWebpackPlugin({
            filename: 'ccm_dashboard.html',
            title: 'Dashboard',
            template: './src/html/dashboard.handlebars',
            chunks: ['calendar', 'vendors', 'main'],
            minify: {
                html5: true,
                collapseWhitespace: true,
                caseSensitive: true,
                removeComments: true
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'ccm_docket.html',
            title: 'Docket',
            template: './src/html/docket.handlebars',
            chunks: ['vendors', 'main'],
            minify: {
                html5: true,
                collapseWhitespace: true,
                caseSensitive: true,
                removeComments: true
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'ccm_case.html',
            title: 'Case',
            template: './src/html/case.handlebars',
            chunks: ['vendors', 'main'],
            minify: {
                html5: true,
                collapseWhitespace: true,
                caseSensitive: true,
                removeComments: true
            }
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
        },
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    output: {
                        comments: false
                    }
                }
            })
        ]
    }
};

module.exports = config;
