// import '@babel/polyfill';
import './print';
import '../css/index.less';
import '../css/a.css';
import '../css/b.css';
import '../css/c.css';

const add = (x, y) => x + y;

console.log(add(1, 2));


const promise = new Promise((resolve) => {
  setTimeout(() => {
    console.log('定时器执行完了。');
    resolve();
  }, 1000);
});

console.log(promise);

print();

if (module.hot) {
  // module.hot 为true, 说明开启了 HMR 功能
  module.hot.accept('./print.js', () => {
    print();
  });
}
