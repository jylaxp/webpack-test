## 代码分割

### 单入口文件
```javascript
// 入口文件
    entry: ['./src/js/index.js', './src/index.html'],

    // 输出
    output: {
        // 文件名
        filename: 'js/build.js',
        // 输出目录
        path: resolve(__dirname, 'build')
    },
```

### 多入口
```javascript
// 入口文件
entry: {
    index: "./src/js/index.js",
    test: "./src/js/test.js"
}, 
// 输出
output: {
    // 文件名
    filename: 'js/[name].[contenthash:10].js',
    // 输出目录
    path: resolve(__dirname, 'build')
},
```
### 单独打包
```javascript
// 将 node_modules 中的代码单独打包成一个 chunk 最终输出
optimization: {
        splitChunks:{
            chunks: "all"
        }
    },
```

### 动态导入
```javascript
import(/* webpackChunkName: 'test' */'./test')
    .then(({hello}) => {
        hello();
    })
    .catch(() => {
        // 加载失败
    });
```