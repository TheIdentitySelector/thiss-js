const path = require('path');
const webpack = require("webpack");
const PolyfillInjectorPlugin = require('webpack-polyfill-injector');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const DotEnv = require("dotenv-webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const package = require('./package.json');

function make_manifest(buffer) {
   var manifest = JSON.parse(buffer.toString());
   manifest.version = package.version;
   manifest_JSON = JSON.stringify(manifest, null, 2);
   return manifest_JSON;
}


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
        'sa-button': `webpack-polyfill-injector?${JSON.stringify({
            modules: ['./src/sa-button/index.js']
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
        new webpack.PrefetchPlugin(path.join(__dirname, "node_modules"),"./zoid/index.js"),
        new DotEnv({systemvars: true}),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                  from: "./src/assets/manifest.json",
                  to: "./manifest.json",
                  transform(content, path) {
                     return make_manifest(content)
                  },
                },
                {
                    from: "./src/assets/*.svg",
                    to: "./[name].[ext]",
                },
            ],
        }),
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
            filename: 'sa-button/index.html',
            chunks: ['sa-button'],
            inject: true,
            template: '!ejs-loader!src/sa-button/index.html'
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
                'AbortController',
                'Array.prototype.findIndex',
                'Array.prototype.filter',
		        'String.prototype.includes',
                'String.prototype.endsWith'
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
                include: path.resolve(__dirname, "src/asset/fonts/"),
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'fonts/'
                }
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
                exclude: path.resolve(__dirname, "src/asset/fonts/"),
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
