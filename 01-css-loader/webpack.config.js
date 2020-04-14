/* jshint esversion: 6 */

/**
 * webpack.config.js webpack配置文件
 *  模块化默认采用commonjs
 */

const { resolve } = require('path');

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
                test: /\.css$/,
                // 使用的loader, 执行顺序，从后往前
                use: [
                    // 创建style标签， 将js中的样式资源插入到html的head中
                    "style-loader",

                    // 讲css文件变成commonjs模块，加载到js中，内容是样式字符串
                    "css-loader"
                ]
            }
        ]
    },

    // 插件
    plugins: [],

    // 模式
    mode: "development"

    // mode: "production"
}