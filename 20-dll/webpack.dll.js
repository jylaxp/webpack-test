

const { resolve } = require('path');
const webpack = require('webpack');

modules.exports = {
    entry: {
        jquery: ['jquery'],
    },

    output: {
        file: '[name].js',
        path: resolve(__dirname, 'dll'),
        // 打包的库里面向外暴露出去的内容名字
        libary: '[name]_[hash]'
    },

    plugins: [
        new webpack.DllPlugin({
            // 映射库的暴露的内容名称
            name: '[name]_[hash]',
            path: resolve(__dirname, 'dll/manifest.json')
        })
    ],

    mode: 'production'
}
