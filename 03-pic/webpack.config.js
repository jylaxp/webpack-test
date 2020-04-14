/* jshint esversion: 6 */

/**
 * webpack.config.js webpack配置文件
 *  模块化默认采用commonjs
 */

const { resolve } = require('path');

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {

    // 入口文件
    entry: "./src/index.js",

    // 输出
    output: {
        // 文件名
        filename: "build.js",
        // 输出目录
        path: resolve(__dirname, 'build')
    },

    // loader
    module: {
        rules: [
            {
                // 匹配那些文件
                test: /\.less$/,
                // 使用的loader, 执行顺序，从后往前
                use: [
                    // 创建style标签， 将js中的样式资源插入到html的head中
                    "style-loader",

                    // 讲css文件变成commonjs模块，加载到js中，内容是样式字符串
                    "css-loader",

                    // less loader
                    "less-loader"
                ]
            }, {
                test: /\.(jpg|png)$/,
                // use 使用多个loader, 只有一个loader的话，可以使用loader
                // 安装 url-loader和file-loader
                // use: ['url-loader'],
                use: [{
                    loader: "url-loader",
                    options: {
                        //  图片大小小于limit, 会被 base64 编码处理
                        limit: 8 * 1024,
                        // 图片名称长度， 原来ext后缀名
                        name: "[hash:10].[ext]"
                    }
                }],
                // loader: "url-loader",
                // options: {
                //     //  图片大小小于limit, 会被 base64 编码处理
                //     limit: 8 * 1024
                // }
            }, {
                test: /\.html$/,
                loader: "html-loader"
            }
        ]
    },

    // 插件
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        })
    ],

    // 模式
    mode: "development"

    // mode: "production"
}