/* jshint esversion: 6 */

/**
 * webpack.config.js webpack配置文件
 *  模块化默认采用commonjs
 */

const { resolve } = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');


// 压缩css  optimize-css-assets-webpack-plugin
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
// 设置nodejs环境变量
// process.env.NODE_ENV = 'development';

const commonCssLoader = [
    // 创建style标签， 将js中的样式资源插入到html的head中
    // 'style-loader',

    // 提取css文件
    {
        loader: MiniCssExtractPlugin.loader,
        options: {
            /*
            * 复写css文件中资源路径
            * webpack3.x配置在extract-text-webpack-plugin插件中
            * 因为css文件中的外链是相对与css的，
            * 我们抽离的css文件在可能会单独放在css文件夹内
            * 引用其他如img/a.png会寻址错误
            * 这种情况下所以单独需要配置../../，复写其中资源的路径
            */
            publicPath: '../../' 
          }
    },

    // 讲css文件变成commonjs模块，加载到js中，内容是样式字符串
    'css-loader',

    /**
            css 兼容性处理， postcss-loader  postcss-preset-env
            postcss-preset-env 帮助 postcss-loader 找到 package.json中 browserslist 里面的配置，通过配置加载指定的css兼容性样式

            'browserslist': {
                // 开发环境， 需要设置node环境变量： process.env.NODE_ENV = development
                'development': [
                    'last 1 chrome version',
                    'last 1 firefox version'
                ],
                // 生产环境，默认是生产环境
                'production': [
                    '>0.2%',
                    'not dead',
                    'not op_mini all'
                ]
            }
     */
    {
        loader: 'postcss-loader',
        options: {
            indent: 'postcss',
            plugins: () => [
                require('postcss-preset-env')()
            ]
        }
    },
];



/**
 *  HMR: hot module replacement
 *      css: 可以使用 HMR功能， style-loader内部实现了(开发环境使用 style-loader)
 *      js: 默认不使用 HMR， 改 js 文件， 支持 HMR(module.hot)
 *      html:  默认不使用 HMR， 同时 html 不能实时更新了(不需要做HMR功能)
 *              解决:   修改 entry入口， 将 html文件引入
 */
module.exports = {

    // 入口文件
    entry: ['./src/js/index.js', './src/index.html'],

    // 输出
    output: {
        // 文件名
        filename: 'js/build.js',
        // 输出目录
        path: resolve(__dirname, 'build')
    },

    // loader
    module: {
        rules: [
            /** 
            * js 语法检查， eslint-loader， eslint-loader依赖 eslint库
            * 注意： 只检查项目代码，不检查 第三库的代码 
            * 设置检查规则：
            *          在 package.json 中 eslintConfig 设置
            *  推荐设置：
            *      eslint-config-airbnb-base  eslint eslint-plugin-import 
            * 'eslintConfig': {
            *       'extends': 'airbnb-base'
            *    }
            */
            {
                test: /\.js$/,
                exclude: /node_modules/,
                // 优先执行
                enforce: "pre",
                loader: 'eslint-loader',
                options: {
                    fix: true
                }
            },
            {
                oneOf: [
                    /** 
                     * js 兼容性处理 
                     *      babel-loader  @babel/core @babel/preset-env
                     *   1. 基本 js 兼容性处理  --> @babel/preset-env
                     *          只能转换基础语法，如，不能转换 promise
                     *   2. 全部 js 兼容性处理  --> @babel/polyfill
                     *          不适合解决部分兼容问题。它会解决全部兼容性问题，会将所有的兼容性代码引入，生成的文件体积很大
                     *   3. 按需处理 --> core-js
                     */
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        loader: "babel-loader",
                        options: {
                            presets: [
                                [
                                    "@babel/preset-env",
                                    {
                                        useBuiltIns: 'usage',
                                        corejs: {
                                            version: 3
                                        },
                                        targets: {
                                            chrome: '60',
                                            firefox: '50',
                                            ie: '9'
                                        }
                                    }
                                ]
                            ],

                            // 开启缓存， 没有变化的 js 不在处理，使用缓存
                            cacheDirectory:true
                        }
                    },
                    {
                        // 匹配 css
                        test: /\.css$/,
                        // 使用的loader, 执行顺序，从后往前
                        use: [...commonCssLoader]
                    },
                    {
                        // 匹配 less
                        test: /\.less$/,
                        // 使用的loader, 执行顺序，从后往前
                        use: [...commonCssLoader, 'less-loader']
                    }, {
                        test: /\.(jpg|png)$/,
                        // use 使用多个loader, 只有一个loader的话，可以使用loader
                        // 安装 url-loader和file-loader
                        // use: ['url-loader'],
                        use: [{
                            loader: 'url-loader',
                            options: {
                                //  图片大小小于limit, 会被 base64 编码处理
                                limit: 8 * 1024,
                                // 图片名称长度， 原来ext后缀名
                                name: '[hash:10].[ext]',
                                // 输出路径
                                outputPath: 'imgs',
                                // 关闭 es6， 使用 commonjs
                                esModule: false
                            }
                        }],
                        // loader: 'url-loader',
                        // options: {
                        //     //  图片大小小于limit, 会被 base64 编码处理
                        //     limit: 8 * 1024
                        // }
                    }, {
                        test: /\.html$/,
                        loader: 'html-loader'
                    }
                ]
            }
        ]
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
        }),

        // 提取 css 文件
        new MiniCssExtractPlugin({
            filename: 'css/build.[contenthash:10].css'
        }),

        // 压缩 css
        new OptimizeCssAssetsWebpackPlugin()
    ],

    // 模式
    mode: 'development',

    // 生产环境自动压缩 js
    // mode: 'production',

    // 开发服务器， 自动编译，打包，刷新浏览器, 需要安装 webpack-dev-server
    // 只会在内存打包，不会输出到硬盘
    // 启动指令：npx webpack-dev-server
    devServer: {
        contentBase: resolve(__dirname, 'build'),
        compress: true,
        port: 3000,
        open: true,
        hot: true,
    },

    /** 
     * source-map: 外部
     * 
     * [inline|hidden|eval-][nosource-][cheap-[module-]]source-map
     * inline-source-map: 内联， 只生产一个内联
     *      错误代码准确信息 和 错误位置
     * hidden-source-map： 外部
     *      错误代码准确信息， 没有源代码
     * eval-source-map: 内联， 每个文件生产一个source-map， 在 eval 中
     *      错误代码准确信息 和 错误位置
     * 
     * cheap-source-map: 外部
     *      错误代码准确信息 和 错误位置
     * 
     * cheap-module-source-map: 外部
     *      错误代码准确信息 和 错误位置
     *      module会将loader的source map 加入
     *      
     * 
     * 开发环境：速度快，调试友好
     *      eval-source-map / source-map
     * 
     * 生成环境: 要不要隐藏源代码，调试友好
     *      隐藏源代码：nosource-source-map / hidden-source-map
     *      调试友好：source-map / cheap-module-source-map
     *              
     * 
    */
    devtool: "source-map"
}