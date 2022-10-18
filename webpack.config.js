const path = require('path');
const HtmlWEbpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpack = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const DotEnv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name][contenthash].js',
        assetModuleFilename: "assets/images/[hash][ext][query]",
        publicPath: "/"

    },
    resolve: {
        extensions: ['.js', ],
        alias: {
            '@utils': path.resolve(__dirname, 'src/utils/'),
            '@templates': path.resolve(__dirname, 'src/templates/'),
            '@styles': path.resolve(__dirname, 'src/styles/'),
            '@images': path.resolve(__dirname, 'src/assets/images/')
        }
    },
    module: {
        rules: [
        {
            test: /\.m?js&/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'
            }
        },
        {
            test: /\.css|.styl$/i,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'stylus-loader'
            ]
        },
        {
            test: /\.png/,
            type: "asset/resource"
        },
        {
            test: /\.(woff|woff2)$/, // REGLA PARA ARCHIVOS WOFF | WOFF2
            use: {
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    mimetype: 'aplication/font-woff',
                    name: "[name].[contanthash].[ext]",
                    outputPath: './assets/fonts/',
                    publicPath: '../assets/fonts/',
                    esModule: false
                }
            }
        }
    ]},
    plugins: [
        new HtmlWEbpackPlugin({
            inject: true,
            template: './public/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/[name].[contenthash].css'
        }),
        new CopyWebpack(
            {
                patterns: [
                    {
                        from: path.resolve(__dirname, 'src', 'assets/images'),
                        to: 'assets/images'
                    }
                ]
            }
        ),
        new DotEnv(),
        new CleanWebpackPlugin(),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin(),
        ]
    }
}
