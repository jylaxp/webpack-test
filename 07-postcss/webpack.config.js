/* jshint esversion: 6 */

/**
 * webpack.config.js webpack配置文件
 *  模块化默认采用commonjs
 */

const { resolve } = require('path');

const HtmlWebpackPlugin = require("html-webpack-plugin");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// 设置nodejs环境变量
// process.env.NODE_ENV = "development";

module.exports = {

    // 入口文件
    entry: "./src/js/index.js",

    // 输出
    output: {
        // 文件名
        filename: "js/build.js",
        // 输出目录
        path: resolve(__dirname, 'build')
    },

    // loader
    module: {
        rules: [
            {
                // 匹配那些文件
                test: /\.(css|less)$/,
                // 使用的loader, 执行顺序，从后往前
                use: [
                    // 创建style标签， 将js中的样式资源插入到html的head中
                    // "style-loader",

                    // 提取css文件
                    MiniCssExtractPlugin.loader,

                    // 讲css文件变成commonjs模块，加载到js中，内容是样式字符串
                    "css-loader",

                    // less loader
                    "less-loader",

                    // css 兼容性处理， postcss-loader  postcss-preset-env
                    // postcss-preset-env 帮助 postcss-loader 找到 package.json中 browserslist 里面的配置，通过配置加载指定的css兼容性样式
                    /**
                    "browserslist": {
                        // 开发环境， 需要设置node环境变量： process.env.NODE_ENV = development
                        "development": [
                            "last 1 chrome version",
                            "last 1 firefox version"
                        ],
                        // 生产环境，默认是生产环境
                        "production": [
                            ">0.2%",
                            "not dead",
                            "not op_mini all"
                        ]
                    }
                     */
                    {
                        loader: "postcss-loader",
                        options: {
                            indent: "postcss",
                            plugins: () => [
                                require("postcss-preset-env")()
                            ]
                        }
                    }
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
                        name: "[hash:10].[ext]",

                        // 输出路径
                        outputPath: "imgs"
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
        }),
        new MiniCssExtractPlugin({
            filename: "css/build.css"
        })
    ],

    // 模式
    mode: "development",

    // mode: "production"

    // 开发服务器， 自动编译，打包，刷新浏览器, 需要安装 webpack-dev-server
    // 只会在内存打包，不会输出到硬盘
    // 启动指令：npx webpack-dev-server
    devServer: {
        contentBase: resolve(__dirname, "build"),
        compress: true,
        port: 3000,
        open: true,
    }
}