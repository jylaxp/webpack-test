## dll

打包指令
```javascript
webpack --config webpack.dll.js
```

配置文件增加配置
```javascript
const webpack = require('webpack');

// 增加插件
// 告诉webpack 哪些库不需要打包，同时使用名称也得变
new webpack.DllReferencePlugin({
    manifest: resolve(__dirname, 'dll/manifest.json')
})
```

下载插件 add-asset-html-webpack-plugin 将 dll 自动添加到 html中
配置插件
```javascript
// 映入打包的文件，添加到html中
new AddAssetHtmlWebpackPlugin({
    filepath: resolve(__dirname, 'dll/jquery.js')
})
})
