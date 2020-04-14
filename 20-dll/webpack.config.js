/* jshint esversion: 6 */
const { resolve } = require('path');
const webpack = require('webpack');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    // 入口文件
    entry: './src/js/index.js',

    // 输出
    output: {
        // 文件名
        filename: 'js/build.js',
        // 输出目录
        path: resolve(__dirname, 'build')
    },

    // loader
    module: {
        rules: []
    },

    // 插件
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',

            // HTML 压缩
            // minify: {
            //     collapseWhitespace: true,
            //     removeComments: true
            // }
        }),

        // 告诉webpack 哪些库不需要打包，同时使用名称也得变
        new webpack.DllReferencePlugin({
            manifest: resolve(__dirname, 'dll/manifest.json')
        }),
        
        // 映入打包的文件，添加到html中
        new AddAssetHtmlWebpackPlugin({
            filepath: resolve(__dirname, 'dll/jquery.js')
        })
    ],
    optimization: {
        splitChunks:{
            chunks: "all"
        }
    },
    // 模式
    mode: 'development'
}