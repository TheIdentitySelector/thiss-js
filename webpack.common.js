const path = require('path');
const webpack = require("webpack");
const PolyfillInjectorPlugin = require('webpack-polyfill-injector');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const DotEnv = require("dotenv-webpack");
const GoogleFontsPlugin = require("@beyonk/google-fonts-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const PreloadWebpackPlugin = require('preload-webpack-plugin');


module.exports = {
    node: {
      console: false,
      global: true,
      process: true,
      __filename: 'mock',
      __dirname: 'mock',
      Buffer: false,
      setImmediate: true
    },
    resolve: {
        alias: {
            'node_modules': path.join(__dirname, 'node_modules'),
            'bower_modules': path.join(__dirname, 'bower_modules'),
            'jquery': 'jquery/dist/jquery.slim.js'
        }
    },
    optimization: {
        splitChunks: {
          chunks (chunk) {
              return chunk.name != 'thiss';
          },
          minSize: 30000,
          maxSize: 0,
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
        confirm: `webpack-polyfill-injector?${JSON.stringify({
            modules: ['./src/confirm/index.js']
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
        new HtmlWebpackPlugin({
            filename: 'confirm/index.html',
            chunks: ['confirm'],
            inject: true,
            template: '!ejs-loader!src/confirm/index.html'
        }),
        //new PreloadWebpackPlugin(),
        new ExtractTextPlugin("[name].css"),
        new MiniCssExtractPlugin({
            filename: "[name].css"
        }),
        new PolyfillInjectorPlugin({
            polyfills: [
                'Promise',
                'fetch',
                'Object.values',
                'Array.prototype.findIndex',
		'String.prototype.includes'
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
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: ExtractTextPlugin.extract({
                    use: [
                        'css-loader',
                        'sass-loader'
                    ]
                })
            },
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
                test: /\.m?jsx?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env','@babel/preset-react','@babel/preset-flow'],
                        plugins: ['@babel/plugin-proposal-class-properties']
                    }
                }
            }
        ]
    }
};
