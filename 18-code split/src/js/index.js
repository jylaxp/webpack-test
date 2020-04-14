const add = (x, y) => x + y;
console.log(add(1, 2));

import(/* webpackChunkName: 'test' */'./test')
    .then(({hello}) => {
        hello();
    })
    .catch(() => {
        // 加载失败
    });

