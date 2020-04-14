## 懒加载

### 懒加载
```javascript
document.getElementById("btn").onclick = function () {
    import(/* webpackChunkName: 'test' */'./test')
        .then(({ add }) => {
            console.log(add(1, 2));
        });
};
```
```html
 <button id="btn">按钮</button>
```
### 预加载
```javascript
document.getElementById("btn").onclick = function () {
     import(/* webpackChunkName: 'test', webpackPrefetch: true */'./test')
        .then(({ add }) => {
            console.log(add(1, 2));
        });
};
```