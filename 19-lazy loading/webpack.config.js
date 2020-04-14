/* jshint esversion: 6 */

/**
 * webpack.config.js webpack配置文件
 *  模块化默认采用commonjs
 */

const { resolve } = require('path');

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
            minify: {
                collapseWhitespace: true,
                removeComments: true
            }
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