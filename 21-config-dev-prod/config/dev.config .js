/* jshint esversion: 6 */

const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./base.config');
const WebpackMerger = require('webpack-merge');

module.exports = WebpackMerger(baseConfig, {

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
    ],

    // 模式
    mode: 'development',
    devServer: {
        contentBase: resolve(__dirname, '../build'),
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
});
