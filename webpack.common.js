const path = require('path');
const webpack = require("webpack");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const DotEnv = require("dotenv-webpack");
const CopyWebpackPlugin = require('copy-webpack-plugin');

const package = require('./package.json');

function make_manifest(buffer) {
   var manifest = JSON.parse(buffer.toString());
   manifest.version = package.version;
   manifest_JSON = JSON.stringify(manifest, null, 2);
   return manifest_JSON;
}


module.exports = {
    resolve: {
        alias: {
            'node_modules': path.join(__dirname, 'node_modules'),
            'bower_modules': path.join(__dirname, 'bower_modules'),
            'jquery': 'jquery/dist/jquery.slim.js'
        },
        fallback: {
            "path": require.resolve("path-browserify"),
            "crypto": require.resolve("crypto-browserify"),
            "stream": require.resolve("stream-browserify"),
        }
    },
    optimization: {
        splitChunks: {
          chunks (chunk) {
              return chunk.name != 'thiss';
          },
          minSize: 30000,
          minChunks: 1,
          automaticNameDelimiter: '~',
          name: false,
          cacheGroups: {
            defaultVendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10,
              reuseExistingChunk: true,
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            }
          }
        }
    },
    entry: {
        index: ['./src/index.js'],
        cta: ['./src/cta/index.js'],
        'sa-button': ['./src/sa-button/index.js'],
        ds: ['./src/ds/index.js'],
        ps: ['./src/ps/index.js'],
        thiss: ['./src/component.js'],
        result: ['./src/result/index.js'],
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
                    from: "./src/assets/translations",
                    to: "./translations",
                },
                {
                    from: "./src/assets/fonts",
                    to: "./fonts",
                },
            ],
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            chunks: ['index'],
            inject: true,
            template: 'src/index.ejs'
        }),
        new HtmlWebpackPlugin({
            filename: 'cta/index.html',
            chunks: ['cta'],
            inject: true,
            template: 'src/cta/index.ejs'
        }),
        new HtmlWebpackPlugin({
            filename: 'sa-button/index.html',
            chunks: ['sa-button'],
            inject: true,
            template: 'src/sa-button/index.ejs'
        }),
        new HtmlWebpackPlugin({
            filename: 'ds/index.html',
            chunks: ['ds'],
            inject: true,
            template: 'src/ds/index.ejs'
        }),
        new HtmlWebpackPlugin({
            filename: 'ps/index.html',
            chunks: ['ps'],
            inject: true,
            template: 'src/ps/index.ejs'
        }),
        new HtmlWebpackPlugin({
            filename: 'result/index.html',
            chunks: ['result'],
            inject: true,
            template: 'src/result/index.ejs'
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css"
        })
    ],
    output: {
        filename: '[name]_[contenthash].js',
        chunkFilename: "[name]_[contenthash].js",
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
                resourceQuery: /raw/,
                type: 'asset/source',

            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                   MiniCssExtractPlugin.loader,
                   "css-loader",
                   "sass-loader",
                ],
            },
            {
                test: /\.svg$/i,
                type: 'asset/inline',
            },
            {
                include: path.resolve(__dirname, "src/assets/fonts/"),
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name].[ext]'
                }
            },
            {
                test: /\.ejs$/i,
                use: ['html-loader', 'template-ejs-loader'],
            },
            {
                test: /\.html$/i,
                use: ['html-loader'],
            },
            {
                exclude: path.resolve(__dirname, "src/assets/fonts/"),
                test: /\.(woff(2)?|ttf|eot|xml|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                type: 'asset/inline',
                generator: {
                    filename: 'assets/[hash]_[name].[ext]'
                }
            },
            {
                test: /\.m?jsx?$/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env','@babel/preset-react','@babel/preset-flow'],
                }
            }
        ]
    }
};
