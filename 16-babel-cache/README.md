## 缓存
### 资源缓存

#### babel 缓存
#### 文件资源缓存

#### babel 缓存
```js
    cacheDirectory:true
```

#### 文件资源缓存

hash: 每次 webpack 构建时会生成一个唯一的 hash 值
chunkhash: 根据 chunk 生成的 hash 值。如果打包资源来源于同一个 chunk, 那么hash值就一样, 生产环境使用
contenthash: 根据文件内容生成的 hash值, 生产环境使用


