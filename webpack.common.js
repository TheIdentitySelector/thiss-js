const path = require('path');
const webpack = require("webpack");
//const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const PolyfillInjectorPlugin = require('webpack-polyfill-injector');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const DotEnv = require("dotenv-webpack");
const GoogleFontsPlugin = require("@beyonk/google-fonts-webpack-plugin");


module.exports = {
    resolve: {
        alias: {
            'node_modules': path.join(__dirname, 'node_modules'),
            'bower_modules': path.join(__dirname, 'bower_modules')
        }
    },
    entry: {
        index: ['./src/index.js'],
        cta: `webpack-polyfill-injector?${JSON.stringify({
            modules: ['./src/cta/index.js']
        })}!`,
        ds: `webpack-polyfill-injector?${JSON.stringify({
            modules: ['./src/ds/index.js']
        })}!`,
        ps: `webpack-polyfill-injector?${JSON.stringify({
            modules: ['./src/ps/index.js']
        })}!`,
        thiss: ['./src/component.js'],
    },
    plugins: [
        new GoogleFontsPlugin({
            fonts: [
                { family: "Libre Franklin", variants: ["400","700"], subsets: ['latin-ext'] }
            ],
            local: true
        }),
        new webpack.PrefetchPlugin(path.join(__dirname, "node_modules"),"./zoid/index.js"),
        new DotEnv({systemvars: true}),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            inject: true,
            chunks: ['index'],
            template: '!ejs-loader!src/index.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'cta/index.html',
            chunks: ['cta'],
            inject: true,
            template: '!ejs-loader!src/cta/index.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'ds/index.html',
            chunks: ['ds'],
            inject: true,
            template: '!ejs-loader!src/ds/index.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'ps/index.html',
            chunks: ['ps'],
            inject: true,
            template: '!ejs-loader!src/ps/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css"
        }),
        //new FaviconsWebpackPlugin('./src/assets/ra21icon.svg'),
        new PolyfillInjectorPlugin({
            polyfills: [
                'Promise',
                'fetch',
                'Object.values',
                'Array.prototype.findIndex'
            ]
        })
    ],
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/",
        libraryTarget: 'umd',
        library: '[name]',
        globalObject: 'this',
        umdNamedDefine: true
    },
    /*
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            automaticNameDelimiter: '_',
            minSize: 0,
            cacheGroups: {
                node_modules: {
                    name: 'node_modules',
                    enforce: true,
                    chunks: "all",
                    test(module, chunks) {
                        const name = module.nameForCondition && module.nameForCondition();
                        return chunks.some(chunk => chunk.name in ['index','ds','cta','ps'] && /node_modules/.test(name));
                    },
                    priority: 1,
                },
                thiss: {
                    name: 'thiss',
                    chunks: 'initial',
                    enforce: true,
                    priority: 0,
                    test(module, chunks) {
                        return chunks.some(chunk => chunk.name === 'thiss');
                    }
                }
            }
        },
    },*/
    module: {
        rules: [
            {
                test: /\.(css)$/,
                use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: ['img:src', ':data-src'],
                        options: {
                            minimize: true
                        }
                    }
                }
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg|xml|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader',
                options: {
                    name: '[hash]_[name].[ext]',
                    outputPath: 'assets'
                }
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    }
                }
            }
        ]
    }
};
