# Node.js

**目录**：

- [安装](#安装)
- [异步](#异步)
- [Promise](#Promise)
- [then()](#then())
- [catch()](#catch())
- [finally()](#finally())
- [链式调用](#链式调用)
- [静态方法](#静态方法)
- [宏任务和微任务](#宏任务和微任务)
- [手写 Promise](#手写-promise)
- [async 与 await](#async-与-await)
- [模块化](#模块化)
- [CommonJS](#commonjs)
- [ES Module](#es-模块)
- [核心模块](#核心模块)
- [process](#process)
- [path](#path)
- [fs](#fs)
- [包管理器](#包管理器)
- [npm](#npm)
- [yarn](#yarn)
- [pnpm](#pnpm)
- [网络](#网络)
- [TCP/IP](#tcp/ip)
- [HTTP](#http)
- [Express](#express)

[Node.js](https://nodejs.org/en) 是一个在 V8 引擎上的 JavaScript 运行环境，可以在浏览器之外的地方运行

**处理并发问题**与其他**服务端语言**不同：

- **单线程**
- **异步**

## 安装

**命令**：

- `nvm list`：查看已安装的 Node 版本
- `nvm install 版本`：安装指定版本的 Node

**配置 `nvm` 镜像**：

```shell
nvm node_mirror https://npmmirror.com/mirrors/node/
```

**安装 Node**：

```shell
# 安装最新版Node
nvm install latest

# 安装稳定版
nvm install lts
```

**查看版本**

```shell
node -v
```

**切换版本**：`nvm use` 指定要使用的 node 版本

```bash
nvm use 18.10.0
```

> Node.js 和 JavaScript 的区别
>
> - **Node**：ECMAScript
> - **JavaScript**：ECMAScript、DOM、BOM

## 异步

**进程**：程序运行的环境 

**线程**：线程是实际参与运算的功能

**同步**：代码自上而下执行；

> 同步会出现阻塞问题：一行代码执行慢会影响整个程序的执行
>
> **不同语言处理同步问题的方式**：
>
> - Java、Python：多线程
>
> - Node.js：异步

**异步**：一段代码的执行不会影响其他程序的运行；

- 异步的代码无法通过 `return` 返回，需要通过回调函数返回结果

  基于回调函数的异步带来的问题：

  - 可读性差
  - 可调式性差

- 不会阻塞其他代码执行

  ```javascript
  function sum(a, b, cb) {
      setTimeout(() => {
          cb(a + b);
      }, 1000)
  }
  
  sum(1, 2, function (res) {
      console.log(res);
  });
  ```

## Promise

异步必须通过**回调函数**返回数据，进行复杂调用时，会出现 " 回调地狱 "

```javascript
// 回调地狱 (死亡金字塔)
sum(1, 2, (res) => {
    sum(res, 3, (res) => {
        sum(res, 4, (res) => {
            sum(res, 5, (res) => {
                sum(res, 6, (res) => {
                    console.log(res);
                })
            })
        })
    })
});
```

**Promise**：存储数据的**对象**，代替回调函数来返回结果

> 解决异步中的回调函数的问题，是一个存储数据的容器，具有特殊的存储数据的方式

**创建 Promise**

- 创建 **Promise** 时，构造函数中**需要一个函数作为参数**

- **Promise** 构造函数的回调函数，**在创建时调用**，调用时需要两个参数： `resolve` 和 `reject` 两个函数都可以向 Promise 中存储数据

  - `resolve`：执行正常时存储

  - `reject`：执行错误时存储

    > `resolve` 和 `reject` 并不是在创建时调用，而是根据**需要时**调用

    ```javascript
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Hello world!');
        }, 1000)
    });
    
    // 调用时也需要使用异步
    setTimeout(() => {
        console.log(promise); // Promise {[[PromiseState]]: 'fulfilled', [[PromiseResult]]: 'Hello world!'
    }, 2000);
    ```

### `then()`

**读取数据**：通过 Promise 实例方法 `then` 读取数据，`then` 方法需要两个回调函数作为参数

- `result`：通过 `resolve` 存储的数据，调用第一个回到函数

- `reason`：通过 `reject` 存储的数据或发生**异常**时，调用第二个回调函数

  ```javascript
  promise.then((result) => {
      console.log(result);
  }, (reason) => {
      console.log(reason);
  });
  ```

  > **注意**：`then` 中的两个函数和 `Promise` 对象中的两个函数，并不是一回事。
  >
  > - `Promise` 对象本身创建的函数是用来**存储数据**
  > - `then` 中的第一个函数用来编写**处理数据的代码**，第二个函数用于编写**处理异常**的代码

**Promise** 对象中的两个**隐藏属性**：

- `PromiseResult`：存储数据的属性

- `PromiseState`：记录 **Promise** 的状态 ( 三种状态 )，只能修改一次，修改以后无法改变
- `fulfilled`：完成
  - `rejected`：拒绝、出错
- `pending`：进行中

**流程**：

- 当 Promise 创建时，`PromiseState` 的初始值为 `pending`
  - 当通过 `resolve` 存储数据时，`PromiseState` 变为 `fulfilled` ( 已完成 )，`PromiseResult` 变为存储的数据
  - 当通过 `reject` 存储数据时，`PromiseState` 变为 `rejected` ( 拒绝或出错 )，`PromiseResult` 变为存储的数据或异常对象

- 当通过 `then` 读取数据时，相当于为 **Promise** 设置了两个处理数据的回调函数
  - 如果 `PromiseState` 变为 `fulfilled` ( 已完成 )，则调用 `then` 的第一个回调函数返回数据
  - 如果 `PromiseState` 变为 `rejected` ( 拒绝或出错 )，则调用 `then` 的第二个回调函数返回数据或异常信息

### `catch()`

`catch()`：和 `then()` 类似，只**需一个回调函数作为参数**。`catch()` 只会在 **Promise** 被**拒绝时调用**，**Promise** 专门用于**处理异常**的方法

```javascript
promise.catch((reason) => {
    console.log('程序异常');
});
```

> `catch()` 相当于 `then(null, reason => {})`

### `finally()`

> **注意**：
>
> 1. `Promise()` 对象中的 `then`、`catch`、`finally` 方法调用时返回的都是一个新的 `Promise()`；
>
>    ( 后一个 `then` 读取的是前一个 `then` 的返回值 )
>
> 2. `then` 中的代码是异步的，要**比其他同步代码晚执行**

`finally()`：**无论正常数据还是异常数据**，`finally()` **都会执行**

- `finally()` 中不会接收任何数据作为参数；

- `finally()` 中编写无论成功与否都将执行的代码

  ```javascript
  promise.finally(() => {
      console.log('没有什么可以阻止finally执行!');
  });
  ```

### 链式调用

- **Promise** 对象中的方法**每次调用函数返回的是上一次调用的返回值**

  ```javascript
  const p = new Promise((resolve, reject) => {
      resolve('Hello world!');
      reject('New Error');
  });
  ```

  ```javascript
  p
      .then(result => {
          console.log(result);
          return '1st Run'
      })
      .then(
          result => {
              console.log(result);
              return '2nd Run'
          })
      .then(
          result => {
              console.log(result);
              return '3rd Run'
          })
      .then(
          result => {
              console.log(result);
              return '4th Run'
          })
  
  // Hello world!
  // 1st Run
  // 2nd Run
  // 3rd Run
  ```

- **Promise** 的**链式调用**：`then` 和 `catch` **执行的结果不是当前期望的结果会被直接跳过**

  ```javascript
  const p = new Promise((resolve, reject) => {
      reject('New error!');
  });
  p
      .then(result => {
          console.log(result); // 这一句直接跳过
      })
      .catch(result => {
          console.log(result); // New error!会在这里打印
      })
  ```

- 如果 **Promise** 出现异常，整条链上没有 `catch`，异常会直接在控制台抛出；只需在最后一行中设置 `catch` 即可

  ```javascript
  const p = new Promise((resolve, reject) => {
      reject('New error!');
  });
  p
      .then(result => {
          console.log(result);
          return '1st run'
      })
      .then(result => {
          console.log(result);
          return '2nd run'
      })
      .then(result => {
          console.log(result);
          return '3rd run'
      })
      .then(result => {
          console.log(result);
          return '4th run'
      })
      .catch(result => {
          console.log(result);
  })
  ```

### 静态方法

- `Promise.resolve()`：创建一个**立即完成**的 **Promise**

  ```javascript
  Promise.resolve('Hello world!').then(res => { console.log(res); }); // Hello world!
  ```

- `Promise.reject()`：创建一个**立即拒绝**的 **Promise**

  ```javascript
  Promise.reject('New Error!').then(null, (res) => { console.log(res); }); // New Error!
  ```

- `Promise.all(iterable)`：需要一个 ( 类数组 ) 可迭代对象作为参数，返回一个新的 **Promise** 对象，同时返回多个 **Promise** 的执行结果

  如果其中有一个 **Promise** 报错了，返回错误信息

  ```javascript
  function sum(a, b) {
      return new Promise((resolve, reject) => {
          setTimeout(() => {
              resolve(a + b);
          }, 1000);
      })
  }
  Promise.all([
      sum(1, 2),
      sum(3, 4),
      sum(5, 6)
  ]).then(res => {
      console.log(res);
  }); // (3) [3, 7, 11]
  ```

- `Promise.allSettled()`：需要一个 ( 类数组 ) 可迭代对象作为参数，和 `all` 类似，返回的结果是以**对象**形式返回 ( `status` 保存状态，`value` 保存值 )

  执行结果：成功或失败的数据都返回

  ```javascript
  function sum(a, b) {
      return new Promise((resolve, reject) => {
          setTimeout(() => {
              resolve(a + b);
          }, 1000);
      })
  }
  Promise.allSettled([
      sum(1, 2),
      sum(3, 4),
      Promise.reject('error'),
      sum(5, 6)
  ]).then(res => {
      console.log(res);
  });
  //  (4) [{…}, {…}, {…}, {…}]
  // > 0 = {status: 'fulfilled', value: 3}
  // > 1 = {status: 'fulfilled', value: 7}
  // > 2 = {status: 'rejected', reason: 'error'}
  // > 3 = {status: 'fulfilled', value: 11}
  ```

- `Promise.race()`：需要一个 ( 类数组 ) 可迭代对象作为参数，返回执行最快的 **Promise** ，**不考虑对错**

  ```javascript
  Promise.race([
      Promise.resolve('Hello world!'),
      sum(1, 2),
      sum(3, 4),
      Promise.reject('error'),
      sum(5, 6)
  ]).then(res => {
      console.log(res);
  }) // Hello world! 如果reject放在第一位, catch调用时, 返回的是reject
  ```
  
- `Promise.any()`：需要一个 ( 类数组 ) 可迭代对象作为参数，返回执行最快的 **Promise** 

  只有**当所有的 Promise 对象都出错时，才返回错误信息**

  ```javascript
  function sum(a, b) {
      return new Promise((resolve, reject) => {
          setTimeout(() => {
              resolve(a + b);
          }, 1000);
      })
  }
  Promise.any([
      Promise.reject('e1'),
      Promise.reject('e2'),
      Promise.reject('e3')
  ]).then(res => {
      console.log(res);
  }).catch(res => {
      console.log(res);
  }) 
  // AggregateError: All promises were rejected {stack: 'AggregateError: All promises were rejected', message: 'All promises were rejected', errors: Array(3)}
  ```

### 宏任务和微任务

JS 是单线程的，运行机制基于事件循环机制 ( event loop )

> **调用栈** ( Call Stack )：
>
> - 栈，是一种**后进先出**的数据结构
> - 调用栈中，存放的是准备执行的代码
>
> **任务队列**：
>
> - 队列，是一种**先进先出**的数据结构
> - 任务队列中，存放的是将要执行的代码
>
> 当栈中代码执行完毕，队列中的代码才会依次入栈中执行

```javascript
setTimeout(() => {
    console.log(1);
})

Promise.resolve().then(() => {
    console.log(2);
})

console.log(3);
// 执行顺序: 3 -> 2 -> 1
```

**定时器**：定时器是在一段时间后，将函数放入**任务队列**中

**Promise** 执行原理：**Promise** 执行时，`then` 相当于给 **Promise** 绑定一个回调函数，`promiseState` 的状态从 `pending` 变为 `fulfilled` ，`then` 的回调函数放入**任务队列**

 **任务队列**：**宏任务**、**微任务**

- 宏任务队列：大部分代码存放在宏任务
- 微任务队列：Promise 的回调函数存放在微任务中

**流程**：调用栈 -> 微任务 -> 宏任务

`queueMicrotask()`：添加一个微任务

```javascript
Promise.resolve().then(() => {
    setTimeout(() => {
        console.log(1);
    })
})
queueMicrotask(() => {
    console.log(2);
})
// 执行顺序: 2 -> 1

Promise.resolve().then(() => {
    Promise.resolve().then(() => {
        console.log(1);
    })
})
queueMicrotask(() => {
    console.log(2);
})
// 执行顺序: 2 -> 1
```

>  **解析**：执行顺序实际是先执行 `then` 回调函数，回调函数的作用是将函数体添加入任务队列

练习：

```javascript
// 调用栈 -> 微任务 -> 宏任务
console.log(1);

setTimeout(() => { console.log(2); });

Promise.resolve().then(() => { console.log(3); });

Promise.resolve().then(() => setTimeout(() => { console.log(4); }));

Promise.resolve().then(() => { console.log(5); });

setTimeout(() => { console.log(6); });

console.log(7);

// 1 -> 7 -> 3 -> 5 -> 2 -> 6 -> 4
```

> **6 为什么比 4 先执行？**
>
> - 同步代码 -> 微任务队列 -> 宏任务队列 -> 下一轮事件循环
> - 未执行代码先入队，但 `Promise.resolve().then()` 的回调函数中的宏任务需要在微任务结束时才进入宏任务队列

### 手写 Promise

```javascript
// 定义一个常量: 表示Promise的状态
const PROMISE_STATE = {
    // pending: 0, fulfilled: 1, rejected: 2 
    PENDING: 0,
    FULFILLED: 1,
    REJECTED: 2

};
class MyPromise {

    // 创建一个变量, 用于存储Promise的结果
    #result;

    // 创建一个变量, 记录Promise的状态
    #state = PROMISE_STATE.PENDING;

    // 创建一个数组, 存储回调函数, 回调函数可能有多个
    #callbacks = [];

    constructor(executor) {
        // 接受一个执行器作为参数
        // 调用回调函数

        // 私有方法调用时, 必须要绑定this到实例中, 否则数据存不进来
        // 两种方式: 1. 箭头函数 2. bind(this) 
        // executor(this.#resolve.bind(this), this.#reject.bind(this));
    }

    // #resolve(): 存储成功的数据
    #resolve = (value) => {
        if (this.#state !== PROMISE_STATE.PENDING) return;
        this.#result = value;
        this.#state = PROMISE_STATE.FULFILLED; // 数据填充成功, 状态改变

        // 当resolve执行时, 数据已经存进, 需要调用then()回调函数 
        queueMicrotask(() => {
            // 短路与: 如果回调函数存在才执行
            // this.#callback && this.#callback(this.#result);
            // 调用callbacks中的所有函数
            this.#callbacks.forEach(cb => {
                cb();
            })
        });
    }
    // #reject(): 存储拒绝的数据
    #reject = (reason) => {

    }
    // then(): 读取数据的方法
    then(onFulfilled, onRejected) {
        // then()的链式调用
        // then()回调函数返回值会成为新Promise中的数据
        return new MyPromise((resolve, reject) => {
            if (this.#state === PROMISE_STATE.PENDING) { // 宏任务, 读取数据时在resolve()中进行
                // 数据未进入Promise, 将回调函数设置为callback
                this.#callbacks.push(() => {
                    resolve(onFulfilled(this.#result));
                });
            } else if (this.#state === PROMISE_STATE.FULFILLED) { // 微任务, 直接读取
                // onFulfilled(this.#result);
                // then()中回调函数应该在任务队列, 而非直接调用
                queueMicrotask(() => {
                    resolve(onFulfilled(this.#result));
                });
            }
        });
    }
}

const mp = new MyPromise((resolve, reject) => {
    resolve('Jack')
});

mp
    .then(result => {
        console.log(result);
        return 'Alice'
    })
    .then(result => {
        console.log(result);
    })
```

```javascript
const PROMISE_STATE = {
    // pending: 0, fulfilled: 1, rejected: 2 
    PENDING: 0,
    FULFILLED: 1,
    REJECTED: 2

};

class MyPromise {
    // 成功的值
    #result;
    // 失败的值
    #reason;
    // Promise状态
    #state = PROMISE_STATE.PENDING;
    // onFullfilledCallbacks 成功的回调函数
    #onFullfilledCallbacks = [];
    // onRejectedCallbacks 失败的回调函数
    #onRejectedCallbacks = [];
    // 标志位
    #isHandled = false;

    constructor(executor) {
        try {
            executor(this.#resolve, this.#reject);
        } catch (e) {
            this.#reject(e);
        }
    }

    #resolve = (result) => {
        if (this.#state !== PROMISE_STATE.PENDING) return;
        this.#result = result;
        this.#state = PROMISE_STATE.FULFILLED;
        this.#handleCallbacks();
    }
    #reject = (reason) => {
        if (this.#state !== PROMISE_STATE.PENDING) return;
        this.#reason = reason;
        this.#state = PROMISE_STATE.REJECTED;
        this.#handleCallbacks();
    }
    #handleCallbacks = () => {
        if (this.#isHandled) return; // 避免重复处理
        this.#isHandled = true; // 设置标志位
        queueMicrotask(() => {
            if (this.#state === PROMISE_STATE.FULFILLED) {
                this.#onFullfilledCallbacks.forEach(fn => {
                    try {
                        const res = fn(this.#result);
                        this.#handleCallbacks(res);
                    } catch (e) {
                        this.#reject(e);
                    }
                });
            } else if (this.#state === PROMISE_STATE.REJECTED) {
                this.#onRejectedCallbacks.forEach(fn => {
                    try {
                        const res = fn(this.#reason);
                        this.#handleCallbacks(res);
                    } catch (e) {
                        this.#reject(e);
                    }
                });
            }
            this.#isHandled = false; // 重置标志位
        });
    }
    then(onFulfilled, onRejected) {
        return new MyPromise((resolve, reject) => {
            this.#onFullfilledCallbacks.push(() => {
                try {
                    const res = onFulfilled ? onFulfilled(this.#result) : this.#result;
                    resolve(res);
                } catch (e) {
                    reject(e);
                }
            });
            this.#onRejectedCallbacks.push(() => {
                try {
                    const res = onRejected ? onRejected(this.#reason) : this.#reason;
                    reject(res);

                } catch (e) {
                    reject(e);
                }
            });
            this.#handleCallbacks(); // 立即处理回调，解决pending状态下微任务嵌套宏任务的问题
        });
    }
}
const mp = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        reject('1st reject');
    }, 1000);
});
console.log(mp);

mp
    .then((result) => {
        console.log(result);
        return '2nd resolve';
    }, (res) => {
        console.log(res);
        return '2nd reject'

    })
    .then((result) => {
        console.log(result);
        return '3rd resolve';
    }, (res) => {
        console.log(res);
        return '2rd reject'
    })
```

### async 与 await

- `async`：**快速创建异步函数**，异步函数的返回值会封装到一个 **Promise** 中返回。

  即 `async` 封装的函数，可以通过调用 `then` 方法访问

  ```javascript
  function fn() {
      return Promise.resolve(10);
  }
  
  // async 创建异步
  async function fn() {
      return 10;
  }
  fn().then(result => {
      console.log(result);
  })
  ```

- `await`：**调用异步函数**。暂停代码运行，直到异步代码有结果时才返回

  **阻塞**：`await` 会阻塞异步函数内部代码运行，但不影响外部代码

  ```javascript
  function sum(a, b) {
      return new Promise(resolve => {
          setTimeout(() => {
              resolve(a + b);
          }, 1000);
      });
  }
  async function fn() {
      let result = await sum(1, 2);
      console.log(result);
  }
  fn(); // 3
  ```

  > **注意**：
  >
  > - `await` 只能用于 `async` 声明的异步函数中，或 **es 模块的顶级作用域**中
  >
  >   - HTML `<script>` 标签类型 `type="module"` 中使用
  >   - 扩展名为 `.mjs` 的文件中
  >
  > - 如果 `async` 声明的函数没有 `await` ，那么代码会依次执行，和普通函数的执行结果一样
  >
  >   唯一的区别在于 `async` 返回的是一个 **Promise** 对象
  >
  >   ```javascript
  >   async function fn() {
  >       console.log(1);
  >       console.log(2);
  >       console.log(3);
  >       return 'hello';
  >   }
  >   fn();
  >   console.log(4);
  >   // 执行顺序: 1 -> 2 -> 3 -> 4
  >   
  >   // 等价于
  >   function fn() {
  >       return new Promise(resolve => {
  >           console.log(1);
  >           console.log(2);
  >           console.log(3);
  >           resolve('hello');
  >       });
  >   }
  >   fn();
  >   console.log(4);
  >   ```
  >
  > - 如果使用 `await` 调用完函数后，会在函数执行完，后边所有的代码会被放入微任务队列。即后续代码放入 `then()` 中
  >
  >   ```javascript
  >   async function fn() {
  >       console.log(1);
  >       await console.log(2);
  >       console.log(3);
  >   }
  >   fn();
  >   console.log(4);
  >   // 执行顺序: 1 -> 2 -> 4 -> 3
  >   ```

- `try-catch`：处理异常

  ```javascript
  async function fn() {
      try {
          let result = await sum(1, 2);
          result = await sum(result, 3);
          result = await sum(result, 4);
          console.log(result);
      } catch (e) {
          console.log('出错');
      }
  }
  fn(); // 10
  ```

## 模块化

早期的模块化，通过原始的 `script` 标签引入多个 js 文件

- 容易出现模块间互相覆盖的情况
- 有一些模块是相互依赖的，必须先引入某个组件再引入某个组件，模块才能够正常工作模块化

**模块化**：

模块，就是内部任何变量或其他对象都是私有的，不会暴露给外部模块。

- CommonJS ( Nodejs 默认模块化标准 )
- ES 模块化

### CommonJS

CommonJS 模块化，模块内部定义一个 `module` 对象，`module` 对象内部存储当前模块的基本信息

`module` **对象**中有一个属性名为 `exports`，`exports` 用来指定外部暴露的内容，`exports` 实际上是 `require` 函数的返回值

1. **默认导出**：`module.exports` 是一个对象，直接赋值时，会将值设置为模块的默认导出

   ```javascript
   // m1.js 默认导出
   const a = 10;
   module.exports = a;
   
   // index.js
   const a = require('./m1'); 
   console.log(a); // 输出: 10
   ```

2. 将暴露的内容作为 `exports` 属性值导出，导入时要使用**解构赋值**

   ```javascript
   // m1.js 作为属性值导出
   module.exports.a = 10;
   
   // index.js 直接导出对象
   const m1 = require('./m1');
   console.log(m1.a); 
   
   // 解构赋值导入, 不使用解构赋值会打印 {a: 10}
   const { a } = require('./m1'); 
   console.log(a); // 输出: 10
   ```

3. **解构赋值** 导出多个内容

   ```javascript
   // m1.js
   const a = 10;
   const b = 20;
   module.exports = {
       a,
       b
   };
   
   // index.js 解构赋值导入
   const { a, b } = require('./m1');
   ```

**注意**：

1. `package.json` 的 `type` 属性未指定或指定为 CommonJS 模块时，`.js` 为 CommonJS
2. 当 `type` 属性不为 `module` 时， Node.js 会将 `.js`、`.cjs`、`.mjs`、`.json`、`.node` 视为 CommonJS 

3. CommonJS 环境中，`require()` 是**同步加载模块**的方法，**ES 导入是异步的**，必须使用 `import` 导入 ES 模块

   ```javascript
   // m1.mjs是ES 模块
   let a = 10
   export { a }
   
   // index.js 导入模块
   ;(async () => {
       const { a } = await import('./m1.mjs');
       console.log(a);
   })().catch((err) => console.log(err));
   ```

**引入模块注意事项**：

1. **文件作为模块**，模块路径需以 `./` 或 `../` 开头，否则会被 node 识别为**核心模块**或 `node_modules` 中的模块

   **核心模块**：

   ```javascript
   const path = require('path'); // 等价于 const path = require('node:path');
   ```

   **按需引入**

   ```javascript
   // 只引入'./m3.js'中的name属性
   const name = require('./m3').name;
   ```

   **解构赋值**

   ```javascript
   const {name} = require('./m3');

2. node **自动补全文件扩展名机制**：先在目录中找同名的 `.js` 文件，`.js` 不存在再找同名的 `.json` 或 `.node` 文件 

3. **文件目录作为模块**，需要重构文件夹解构，需要在 `package.json` 中指定 `main` 属性的主文件

   ```xml
   D:\test\
   ├── module/
   │   ├── package.json
   │   └── m1.js
   └── myapp.js 
   ```

   ```json
   // D:\test\module\package.json
   {
       "name": "my-module",
       "version": "1.0.0",
       "main": "./m1.js"
   }
   ```

   ```javascript
   // m1.js
   let a = 1;
   module.exports = { a };
   
   // myapp.js
   const a = require('./module');
   console.log(a); // {a: 1}
   ```

4. `node_modules`：如果加载模块没有以 `./` 或 `../` 开头，且加载模块不是核心模块，会自动去 `node_modules` 中寻找模块，如果存在就是用，不存在就在父目录中查找 `node_modules` 以此类推

**原理**

```javascript
(function(exports, require, module, __filename, __dirname) {
    // xxx
});
```

- `exports`：向外部暴露的部分
- `require`：引入模块的方法
- `__filename`：模块的路径
- `__dirname`：模块所在目录

### ES 模块

ES6 标准

在 Node 环境中，默认模块化标准是 CommonJS，如果想要**使用 ES 标准**

1. 使用 `.mjs` 文件

2. 修改 `package.json` 将模块化规范设置为 ES 模块，修改后 `.js` 将采用 es module 规范 

   ```json
   {
       "type": "module"
   }
   ```

**导出模块**

- 命名导出

  ```javascript
  // 导出变量
  export let a = 10;
  export const b = 20;
  
  // 导出函数和类
  export function fn() { }
  export class className() {  }
  ```

- 导出一组

  ```javascript
  let a = 10;
  const b = 20;
  export {a, b};
  ```

- `as`：设置别名导出

  ```javascript
  export { variable as name };
  ```

- 解构导出

  ```javascript
  const name = "John Doe";
  const age = 30;
  const city = "New York";
  
  // name被重命名为userName
  export const { name: userName, age: userAge, city: userCity } = { name, age, city };
  ```

- `export default xxx`：默认导出。**一个模块只能有一个默认导出**

  ```javascript
  function sum(a, b) {
      return a + b;
  }
  export default sum;
  ```

- `export * from`：**将另一个模块的所有内容导出，而不导出默认导出**。可以**在一个模块集中管理多个模块**

  ```javascript
  // utils.js
  export function add(a, b) { return a + b; }
  export function subtract(a, b) { return a - b; }
  export function multiply(a, b) { return a * b; }
  
  // math.js
  export * from './utils.js';
  
  // main.js
  import { add, subtract, multiply } from './math.js';
  ```

**引入模块**

- 引入模块

  ```javascript
  import "modules.js";
  ```

- `*`：导入所有模块内容至指定命名空间

  ```javascript
  import * as m1 from "./m1.js"
  ```

- 导入模块的指定内容

  ```javascript
  import {export1, export2} from "./m1.js"
  ```

- 导入模块的默认导出

  ```javascript
  import sum from "./m1.js"
  console.log(sum(1, 2)); // 3
  ```

  默认导出可以任意命名

  ```javascript
  import hello from "./m1.js"
  console.log(hello(1, 2)); // 3
  ```

- 导入命名和和混合导出

  ```javascript
  import sum, {a, b} from "./m1.js"
  ```

**注意事项**：

1. **不能省略扩展名**

   ```javascript
   import { a, b } from "./m1.js"
   console.log(a); // 10
   ```

2. **解构赋值**：引入时**变量名必须和导出时相同**

   `as`：**设置别名**

   ```javascript
   import { a as hello, b } from "./m1.js"
   console.log(hello);
   ```

3. ES 模块导入的内容是**常量**

   ```javascript
   import {a} from './xxx.js'
   a = {}; // Syntax Error : 'a' is read-only;
   ```

   > **注意**：
   >
   > 1. `export` 使用的关键字是 `let`，`import` 时引入的变量仍是 `read-only`，不能修改
   >
   > 2. 如果 `export` 导出的是对象，对象的属性值并不是 `read-only` 可以修改。
   >
   >    **原因**： `const` 只禁止变量重新赋值，只保证其引用 ( 内存地址 ) 不变，对象本身的属性值的指针仍然可以修改

4. ES 模块是严格模式

5. `import` 具有变量提升，代码会提升到头部先执行

   ```javascript
   foo();
   import { foo } from 'my_module';
   ```

6. `import` 是静态执行。不能使用表达式或变量

   ```javascript
   // 报错
   import { 'f' + 'oo' } from 'my_module';
   
   // 报错
   let module = 'my_module';
   import { foo } from module;
   
   // 报错
   if (x === 1) {
     import { foo } from 'module1';
   } else {
     import { foo } from 'module2';
   }
   ```

7. `import` 是 Singleton 模式，对于同一 `import` 语句，只会执行一次，而不会执行多次

   ```javascript
   import { foo } from 'my_module';
   import { bar } from 'my_module';
   
   // 等同于
   import { foo, bar } from 'my_module';
   ```

8. 通过 Babel 转码，CommonJS 的 `require` 和 ES 模块的 `import` 可以写在同一文件中，但 `import` 会在静态解析阶段执行，所以`import` 是模块中最早执行的

   ```javascript
   require('core-js/modules/es6.symbol');
   require('core-js/modules/es6.promise');
   import React from 'React';
   ```

### 核心模块

核心模块：Node 中内置的模块，可以在 Node 中直接使用

> **注意**：
>
> - `window`：浏览器宿主对象
>
> - `global`：node 全局对象，类似于 `window`
>
> ES 标准中，全局对象的标准名为 `globalThis`
>
> ```javascript
> console.log(global === globalThis); // true
> ```

#### process

`process` 模块：表示当前的 node 进程；是一个全局变量，可以直接使用

`process.exit([code])`：结束当前进程，终止 Node；( 可选 ) `code` 状态码，自己定义

```javascript
console.log(1);
process.exit();
console.log(2);
console.log(3);
// 只打印 1
```

`process.nextTick(callback[, ...args]`：将函数插入到 tick 队列中

**执行顺序**：调用栈 -> tick 队列 -> 微任务 -> 宏任务

tick 队列，是在下一次事件循环之前执行

```javascript
// 宏任务队列
setTimeout(() => {
    console.log(1);
});

// 微任务队列
queueMicrotask(() => {
    console.log(2);
});

// tick队列
process.nextTick(() => {
    console.log(3);
});

// 调用栈
console.log(4);
// 执行顺序: 4 -> 3 -> 2 -> 1
```

#### path

`path`：路径；通过 `path` 获取路径

使用前需引入模块

```javascript
const path = require('path'); // 等价于 const path = require('node:path');
```

```shell
# 终端中输入命令 node 可以查看包含的方法
node .\path.js
<ref *1> {
  resolve: [Function: resolve],
  normalize: [Function: normalize],
  isAbsolute: [Function: isAbsolute],
  join: [Function: join],
  relative: [Function: relative],
  toNamespacedPath: [Function: toNamespacedPath],
  dirname: [Function: dirname],
  basename: [Function: basename],
  extname: [Function: extname],
  format: [Function: bound _format],
  parse: [Function: parse],
  matchesGlob: [Function: matchesGlob],
  sep: '\\',
  delimiter: ';',
  win32: [Circular *1],
  posix: <ref *2> {
    resolve: [Function: resolve],
    normalize: [Function: normalize],
    isAbsolute: [Function: isAbsolute],
    join: [Function: join],
    relative: [Function: relative],
    toNamespacedPath: [Function: toNamespacedPath],
    dirname: [Function: dirname],
    basename: [Function: basename],
    extname: [Function: extname],
    format: [Function: bound _format],
    parse: [Function: parse],
    matchesGlob: [Function: matchesGlob],
    sep: '/',
    delimiter: ':',
    win32: [Circular *1],
    posix: [Circular *2],
    _makeLong: [Function: toNamespacedPath]
  },
  _makeLong: [Function: toNamespacedPath]
}
```

- `path.resolve([...path])`：生成绝对路径

  ```javascript
  const path = require('path'); // const path = require('node:path');
  // 无参 返回当前工作路径
  let result = path.resolve();
  console.log(result); // D:\xsj_workshop
  ```

  根据不同方式执行代码，生成的工作目录不同

  ```shell
  node ./path.js 
  # D:\xsj_workshop\react_project\src
  ```

  相对路径：`./` 或 `../`

  绝对路径：Windows：`C:\xxx`、Linux：`/User/xxx`、网络：`https://wwww.xxx`

  如果将相对路径作为参数，根据工作目录的不同，生成的绝对路径也不同

  通常会将第一个参数设置为绝对路径，第二个参数为相对路径，node 会自动计算出绝对路径

  ```javascript
  const path = require('path'); // const path = require('node:path');
  let result = path.resolve('D:\\xsj_workshop\\react_project\\src','./hello.js'); 
  console.log(result); // D:\xsj_workshop\react_project\src\hello.js
  ```

  > **注意**：
  >
  > - Windows 的绝对路径反人类，使用反斜杠 `\`。路径需要转义，使用双斜杠 `\\` 或使用 `/`
  >
  > - Nodejs 特殊的全局变量：`__dirname` 和` __filename`
  >
  >   - `__dirname`：返回当前文件夹的绝对路径
  >
  >     ```javascript
  >     const result = path.resolve(__dirname, './hello.js');
  >     ```
  >
  >   - `__filename`：返回当前文件的绝对路径

#### fs

`fs`：File System，帮助 Node 操作磁盘的文件；文件操作也就是 I/O

引入模块

```javascript
const fs = require('node:fs');
```

- `fs.readFileSync(path)`：同步读取文件

  ```javascript
  // 导入fs模块
  const fs = require('node:fs');
  // 导入path模块
  const path = require('node:path');
  
  // 【相对路径不安全】
  // 如果readFileSync()方法的参数是【相对路径】, 那么该路径会返回在上一级目录中寻找目标文件
  // 使用path.resolve(__dirname, './hello.txt')获取指定绝对路径并拼接正确的路径
  let buff = fs.readFileSync(path.resolve(__dirname, './hello.txt'));
  console.log(buff); // Buffer(12) [104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100, 33, buffer: ArrayBuffer(8192), byteLength: 12, byteOffset: 256, length: 12, Symbol(Symbol.toStringTag): 'Uint8Array']
  
  console.log(buff.toString()); // hello world!
  ```

  > `Buffer` 对象：`fs` 模块读取磁盘的数据，数据会以 `Buffer` 对象形式返回，`Buffer` 是一个临时存储数据的缓冲区

- `fs.readFile(path, callback)`：异步读取文件。

  1. 两个参数：1. `path` 路径； 2.  `callback` 回调函数；

     回调函数需要两个参数作为参数：`error` 错误信息、`buffer` 对象

     ```javascript
     // 导入fs模块
     const fs = require('node:fs');
     // 导入path模块
     const path = require('node:path');
     
     // 直接调用readFile()方法
     fs.readFile(
         path.resolve(__dirname, './hello.txt'),
         (err, buffer) => {
             if(err) {
                 console.log('出错了');
             } else {
                 console.log(buffer.toString());
             }
         }
     );
     ```

  2. 回调函数容易产生回调地狱，通常使用 Promise 中的 `then()` 方法调用

     ```javascript
     // 引入fs模块
     const fs = require('node:fs/promises');
     // 引入path模块
     const path = require('node:path');
     
     // 使用Promise的then()方法调用
     fs.readFile(path.resolve(__dirname, './hello.txt'))
         .then(buffer => {
             console.log(buffer.toString());
         })
         .catch(e => {
             console.log('出错了');
         })
     ```

  3. 使用 `async` 快速创建异步函数

     ```javascript
     const fs = require("node:fs/promises");
     const path = require("node:path");
     
     // async快速创建异步
     ; (async () => {
         try {
             const buffer = await fs.readFile(
                 path.resolve(__dirname, "./hello.txt")
             );
             console.log(buffer.toString());
         } catch (e) {
             console.log("出错了");
         }
     })();
     ```

- `fs.appendFile()`：创建新文件，或将数据添加到已有文件中

  如果同名文件不存在，将数据添加到新文件；

  如果同名文件存在，添加数据到文件中

  ```javascript
  const fs = require("node:fs/promises");
  const path = require("node:path");
  // 添加数据
  fs.appendFile(
      path.resolve(__dirname, "./hello.txt"),
      "hello node"
  ).then((result) => {
      console.log(result);
  })
  ```

  通过 `fs.appendFile()` 将文件内容复制到新文件

  ```javascript
  const fs = require("node:fs/promises");
  const path = require("node:path");
  
  fs.readFile(path.resolve(__dirname, "./a.img")).then((buffer) => {
      return fs
          .appendFile(path.resolve(__dirname, "./haha.img"), buffer)
          .then(() => {
              console.log("操作结束");
          });
  });
  ```

- `fs.mkdir()`：创建目录

  ```javascript
  const fs = require("node:fs/promises");
  const path = require("node:path");
  fs.mkdir(path.resolve(__dirname, "./hello/abc"))
      .then((result) => {
          console.log("操作成功");
      })
      .catch((err) => {
          console.log("创建失败", err);
      });
  ```

  **递归创建**：接受第二个参数对象配置方法的功能

  `recursive`：设置为 `true`。如果上级目录不存在，则自动创建

  ```javascript
  const fs = require("node:fs/promises");
  const path = require("node:path");
  fs.mkdir(path.resolve(__dirname, "./hello/abc"), { recursive: true })
      .then((result) => {
          console.log("操作成功");
      })
      .catch((err) => {
          console.log("创建失败", err);
      });
  ```

- `fs.rmdir()`：删除目录

  **递归删除**：`recursive`：设置为 `true`。如果目录还存在下级目录，可以递归删除下级目录

  ```javascript
  const fs = require("node:fs/promises");
  const path = require("node:path");
  fs.rmdir(path.resolve(__dirname, "./hello"), { recursive: true })
      .then(() => {
          console.log("删除成功");
      })
      .catch((err) => {
          console.log("删除失败", err);
      });
  // (node:12904) [DEP0147] DeprecationWarning: In future versions of Node.js, fs.rmdir(path, { recursive: true }) will be removed. Use fs.rm(path, { recursive: true }) instead (Use `node --trace-deprecation ...` to show where the warning was created)
  // 删除成功
  ```

  > **警告**：Node 建议使用 `fs.rm()` 方法，因为后续版本可能删除 `fs.rmdir()` 方法
  >
  > ```javascript
  > fs.rm(path.resolve(__dirname, "./hello"), { recursive: true })
  >     .then(() => {
  >         console.log("删除成功");
  >     })
  >     .catch((err) => {
  >         console.log("删除失败", err);
  >     });
  > ```

- `fs.rename()`：重命名

  ```javascript
  const fs = require("node:fs/promises");
  const path = require("node:path");
  
  fs.rename(
      path.resolve(__dirname, "./haha.jpg"),
      path.resolve(__dirname, "a.jpg")
  )
      .then((result) => {
          console.log("重名名成功");
      })
      .catch((error) => {
          console.log("重命名失败", error);
      });
  ```

  `fs.rename()` 可以实现**剪切**

  ```javascript
  const fs = require("node:fs/promises");
  const path = require("node:path");
  
  fs.rename(
      path.resolve(__dirname, "./a.jpg"),
      path.resolve(__dirname, "../a.jpg")
  )
      .then((result) => {
          console.log("剪切成功");
      })
      .catch((error) => {
          console.log("剪切失败", error);
      });
  ```

- `fs.copyFile()`：复制文件

  ```javascript
  const fs = require("node:fs/promises");
  const path = require("node:path");
  
  fs.copyFile(
      path.resolve(__dirname, "./hello.txt"),
      path.resolve(__dirname, "./haha.txt")
  )
      .then((result) => {
          console.log("复制成功");
      })
      .catch((error) => {
          console.log("复制失败", error);
      });
  ```

## 包管理器

将现成的代码导入项目中帮助开发，如：jQuery

包管理器：下载、删除、更新等

### npm

node 中的包管理器 ( node package manage )，npm 是世界上最大的包管理库

可以在 npm 中上传自己的包，也可以直接从 npm 中下载包

npm 三部分：

1. 官网：https://www.npmjs.com/
2. npm CLI ( Command Line Interface，命令行 )
3. 仓库：存储包和包的相关信息

`npm -v` 检查 npm 是否安装成功

```shell
# 更新最新版npm
npm install -g npm@latest
```

**package.json**

`package.json` 包的描述文件，每个项目都必须有一个 `package.json`

> **注意**：
>
> - `json` 文件属性名不能使用单引号 `''`
> - `json` 文件不能有注释

**结构**：

```json
{
  "name": "code_work",
  "version": "1.0.0",
  "main": "fs.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": ""
}
```

- `name`：包名 ( 必填 )。可以包含包含小写字母、`_` 和 `-`

- `version`：包的版本 ( 必填 ) 。格式：`x.x.x`

  **规则**：

  - 版本从 `1.0.0` 开始
  - 修复错误，补丁：`1.0.1`
  - 添加功能，兼容旧版 ( 小更新 )：`1.1.0`
  - 更新功能，影响兼容 ( 大更新 )：`2.0.0`

- `main`：入口文件。通常为 `index.js`

- `scripts`：脚本。自定义一些命令行的行为

  - `start` 和 `test` 可以直接通过 `npm` 命令使用，其他的命令需要加上 `run`

    ```shell
    npm test 
    npm start
    
    npm run dev
    ```

- `keywords`：关键词儿

- `license`：版权声明

- `description`：包的描述

- `repository`：仓库地址

**常用命令**：

- `npm init`：初始化项目，手动创建 `package.json`

- `npm init -y`：初始化项目，自动创建 `package.json`

- `npm i <包名>`：将指定包下载到当前项目

  ```shell
  npm i lodash
  
  # 安装指定版本
  npm install lodash@3.2.0
  
  # 安装高于指定版本
  npm install lodash@">3.2.0"
  
  # --no-save: 不希望包在package.json中添加依赖
  npm install lodash --no-save
  
  # -D或--save-dev: 将其添加到开发依赖
  npm install lodash -D
  ```

  > `install` 的过程
  >
  > 1.  将包下载到 `node_modules`
  >
  > 2. 在 `package.json` 中添加 `dependencies` 属性，显示当前包所需的依赖的版本
  >
  >    ```shell
  >    {  
  >        "dependencies": {
  >            "lodash": "^4.17.21"
  >        }
  >    }
  >    ```
  >
  > 3. 添加 `package.lock.json` 文件，记录项目安装的包的版本，以及项目依赖的包的版本。提升包的下载速度
  >
  > **注意**：
  >
  > - `node_modules` 包含了项目所需的包，可以通过 `npm i` 安装 `dependencies` 配置的依赖项
  >
  >   ```shell
  >   # 安装项目所需依赖
  >   npm i
  >   ```
  >
  > - `^4.17.21`：执行 `npm i` 命令时，匹配最新的 `4.x.x` 版本，但不匹配 `5.x.x`
  >
  > - `~4.17.21`：执行 `npm i` 命令时，匹配最小依赖的最新版本，即匹配 `4.17.x` 的最新版本
  >
  > - `*`：匹配最新版本

**引入 npm 下载的包**：不需要使用绝对路径

```javascript
const _ = require("lodash");
```

**全局安装**：`npm i <包名> -g`，通常安装一些常用工具

```shell
npm i laughs@latest -g

# 查看全局中安装的包
npm list -g
```

**全局删除**

```shell
npm uninstall -g laughs
```

**镜像**

`npm` 配置镜像服务器

官网：https://www.npmmirror.com/

- 可以使用定制的 `cnpm` 代替 `npm`

  ```shell
  npm install -g cnpm --registry=https://registry.npmmirror.com
  ```

  > `cnpm` 的缺陷：`cnpm i lodash` 命令运行后，会生成两个文件目录：`.store` 和 `lodash`
  >
  > `lodash` 并不是模块本身，而是模块的快捷方式。现代代码编辑器中，如：WebStorm 里会为 `node_modules` 自动构建索引，无法寻找快捷方式的索引 

- 配置 `npm` 的仓库镜像

  ```shell
  # 配置镜像
  npm config set registry https://registry.npmmirror.com
  
  # 查看镜像
  npm config get registry
  
  # 删除镜像
  npm config delete registry
  ```

### yarn

- `npm` 全局安装 `yarn`

  ```shell
  # 安装yarn
  npm i yarn -g
  
  # 删除yarn
  npm r yarn -g
  
  # 查看版本
  yarn -v # 1.22.22
  ```

- Nodejs 默认集成 `corepack` ，`corepack` 无需手动安装，就能直接使用 `npm`、`yarn`、`pnpm`

  ```shell
  # 启用corepack
  corepack enable
  
  # 切换yarn版本至最新版
  corepack prepare yarn@stable --activate
  
  # 切换yarn版本至1.x.x
  corepack prepare yarn@1 --activate
  
  # 禁用corepack
  corepack disable
  ```

  > `yarn` 的版本：
  >
  > - `3.2.4` 版本不再生成 `node_modules`，而是生成 `.yarn` 文件夹。 这是 Yarn Plug'n'Play (PnP) 功能的结果。 `.yarn` 文件夹包含了 Yarn 管理依赖项所需的所有信息，包括已安装的包及其依赖关系。
  >
  >   如果 `yarn` 的版本是 `3.2.4` 版本，终端运行 `.js` 文件不能使用传统的 `node` ，而需要使用 `yarn node ./xxx.js`
  >
  >   ```shell
  >   # 初始化
  >   yarn init -y
  >   
  >   # 安装express包
  >   yarn add express
  >   
  >   # 运行
  >   yarn node ./index.js
  >   ```
  >
  > - `1.22.22`：传统 `node_modules` 文件夹包含所有已安装的包及其依赖项，这会导致文件夹非常大且结构复杂。
  >
  > - 可以在 `package.json` 中指定所需的 `yarn` 的版本
  >
  >   这样指定 `yarn` 的版本，只修改当前项目中 `yarn` 的版本，全局中 `yarn` 的版本不会修改
  >
  >   ```shell
  >   "packageManager": "yarn@3.2.4"
  >   ```

**常用命令**

- `yarn init`：初始化项目，手动创建 `package.json`
- `yarn init -y`：初始化项目，自动创建 `package.json`

- `yarn add <包名>`：添加包以及依赖
- `yarn add <包名> -D`：添加开发依赖
- `yarn remove <包名>`：移除包
- `yarn`：自动安装依赖 ( 相当于 `npm i` )
- `yarn run`：执行脚本
- `yarn xxx`：执行自定义脚本
- `yarn global add <包名>`：全局安装
- `yarn global remove <包名>`：全局删除
- `yarn global bin`：全局安装目录

**镜像**

```shell
# 配置镜像
yarn config set registry https://registry.npmmirror.com

# 查看镜像
yarn config get registry

# 删除镜像
yarn config delete registry
```

### pnpm

**安装**

```shell
# 全局安装
npm i pnpm -g
# 启动corepack, 自动集成了pnpm
corepack enable

# 检查版本
pnpm -v
```

**常用命令**

- `pnpm init`：初始化。自动添加 `package.json`
- `pnpm add <包名>`：添加依赖
- `pnpm add -D <包名>`：添加开发依赖
- `pnpm add -g <包名>`：全局安装
- `pnpm install`：安装依赖
- `pnpm remove <包名>`：移除包

**镜像**

```shell
# 配置镜像
pnpm config set registry https://registry.npmmirror.com

# 查看镜像
pnpm config get registry

# 删除镜像
pnpm config delete registry
```

## 网络

网络服务器是基于**请求**和**响应**的

请求和响应实质上就是一段数据，这段特殊格式有 HTTP 协议规定

`https://www.xxx.com/hello/index.html`

- `https://`：协议名。诸如：FTP 等

- `xxx.com`：域名。domain

  每个网络中存在无数服务器，每一个服务器有自己的唯一标识，称 ip 地址。如：`192.168.1.x`

  由于 ip 地址不方便记忆，域名相当于 ip 地址的别名

- `/hello/index.html`：网站资源路径

**当浏览器在输入地址以后发生什么？**

1. DNS 服务器 -> DNS 解析，获取网站的 ip 地址
2. 浏览器需要和服务器建立连接 ( TCP/IP 协议 ：三次握手) 
3. 向服务器发送请求 ( HTTP 协议：请求报文 )
4. 服务器处理请求，并返回响应 ( HTTP 协议：响应报文 )
5. 浏览器将响应的页面渲染
6. 断开连接 ( TCP/IP 协议：四次挥手 )

**客户端和服务器建立/断开连接？**

- **三次握手**：三次握手是客户端与服务器建立连接的过程

  1. 客户端发送连接请求：`SYN`

  2. 服务器接收连接请求，向客户端返回消息：`SYN`、`ACK`

  3. 客户端收到消息，向服务器发送同意连接的消息：`ACK`

     > **为什么不两次握手？**
     >
     > - **重复的连接请求**：如果只进行两次握手，服务器发送的确认包可能丢失，客户端再次发送连接请求，服务器重新建立连接，浪费资源
     > - **半连接攻击**：攻击者可以伪造 `SYN`，让服务器分配资源，但不发送 `ACK` 包，导致资源占用

- **四次挥手**：断开连接
  1. 客户端向服务器发送请求：`FIN`，表示客户端不再发送数据，请求关闭连接
  2. 服务器向客户端返回数据包：`ACK`，确认客户端的数据包，客户端等待服务器关闭请求
  3. 服务器处理完所有未发送的数据后，向客户端发送数据包：`FIN`，表示服务器准备关闭连接
  4. 客户端收到服务器数据包，向服务器发送数据包表示确认：`ACK`

### TCP/IP

**TCP/IP 协议族**：包含了一组协议，规定了互联网中所有通信细节

**网络通信过程**：4 层

- **应用层**：**软件层**。客户端、服务器等

- **传输层**：负责对数据进行拆分，将大数据拆分成一个一个小包。( 不要把鸡蛋放在一个篮子里 )

- **网络层**：负责给数据包添加信息 ( 菜鸟驿站 )

- **数据链路层**：传输信息

  > 发送：应用层 -> 传输层 -> 网络层 -> 数据链路层
  >
  > 接收：数据链路层 -> 传输层 -> 网络层 -> 应用层

### HTTP

**HTTP 协议**就是**应用层**的协议，规定**客户端和服务器之间通信的报文格式**

**报文 ( message )**：客户端和服务器之间是基于请求和响应的

- 客户端向服务器发送请求 ( request )
- 服务器向浏览器返回响应 ( response )

> 服务器的功能：
>
> 1. 接收客户端发送的请求报文
> 2. 向客户端返回响应报文

**请求报文 ( request )**：客户端发送给服务器的报文称为请求报文

- **格式**

  1. **请求首行**：请求报文的第一行

     **第一部分**：请求方式；`get`、`post`、`put`、`delete`

     ```xml
     GET /index.html?username=sw HTTP/1.1
     ```

     `GET`：`get` 请求，向服务器请求资源

     ```html
     <form method="get" action="#">
         <input type="text" name="username" />
         <button>提交</button>
     </form>
     ```

     `POST`：`post` 请求，向服务器发送数据

     ```html
     <form method="post" action="#">
         <input type="text" name="username" />
         <button>提交</button>
     </form>
     ```

     > `post` 请求
     >
     > - 没有请求头，只有请求体；通过请求体发送数据
     > -  Chrome 通过 **载荷/Payload** 查看
     > - 请求体大小没有限制，向服务器发送数据时，能用 `post` 尽量用 `post`

     **第二部分**：请求资源的路径。`/index.html?username=sw`

     > **查询字符串**：`?` 后面的部分称查询字符串
     >
     > - 查询字符串是一个名值对结构；使用 `=` 连接，多个名值对使用 `&` 分割
     > - `get` 请求通过查询字符串将数据发送给服务器，会在地址栏直接显示，安全性差
     > - `url` 有长度限制，`get` 请求无法发送较大的数据

     **第三部分**：`HTTP/1.1` 。HTTP 协议的版本

  2. **请求头**：名值对结构。告知服务器浏览器的信息

     `Accept`：浏览器可接受的文件类型
  
     ```xml
     Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
     ```
  
     `Accept-Encoding`：浏览器允许的压缩的编码
  
     ```xml
     Accept-Encoding: gzip, deflate, br, zstd
     ```
  
     `Accept-Language`：浏览器可接受的语言
  
     ```xml
     Accept-Language: zh-CN,zh;q=0.9
     ```
  
     `User-Agent`：用户代理。描述浏览器信息的字符串

     ```xml
     User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36
     ```

  3. **空行**：用来分隔请求头和请求体

  4. **请求体**：`post` 请求通过请求体发送数据

**响应报文 ( response )**

- **响应首行**：`HTTP/1.1`：协议名称。`200` - 响应状态码；`OK` - 对响应状态码的描述

  ```xml
  HTTP/1.1 200 OK
  ```

  **状态码**：

  - `1xx`：请求处理中
  - `2xx`：成功
  - `3xx`：请求的重定向
  - `4xx`：客户端错误
  - `5xx`：服务器错误

- **响应头**：多个名值对结构组成，告诉浏览器响应的信息

  ```xml
  Vary: Origin
  Access-Control-Allow-Credentials: true
  Accept-Ranges: bytes
  Cache-Control: public, max-age=0
  Last-Modified: Sat, 07 Dec 2024 02:33:07 GMT
  ETag: W/"152-1939ef6b049"
  Content-Type: text/html; charset=UTF-8
  Content-Length: 1831
  Date: Sat, 07 Dec 2024 02:33:36 GMT
  Connection: keep-alive
  Keep-Alive: timeout=5
  ```

  `Content-Type: text/html;`：响应体的类型

  `charset=UTF-8`：字符集是 `UTF-8`

  `Content-Length: 1831`：响应体长度

- **空行**：空行就是用来分隔响应头和响应体

- **响应体**：响应体就是服务器返回客户端的内容。在 **响应/Response** 中查看

  > **网页、CSS、js、图片会在响应报文的哪一部分发送？**
  >
  > 响应体

## Express

Express 是 node 中的服务器软件，通过 Express 快速在 node 中搭建一个 web 服务器

- 初始化项目

  ```shell
  # 1. 初始化项目
  npm init -y
  
  # 2. 安装express
  npm i express
  
  # 3. 将nodemon添加至项目依赖
  npm i nodemon -D
  
  # 4. 创建index.js
  
  # 5. 新建目录/public/index.html
  ```

- 启动服务器

  ```javascript
  // 引入express
  const express = require('express');
  
  // js中, 一切皆对象, 获取服务器的实例
  const app = express();
  
  // 启动服务器
  // app.listen(端口号, [callback]): 监听端口, 用来启动服务
  app.listen(3000, () => {
      console.log('服务器启动了！');
  });
  ```

- 服务器启动后，通过端口号访问：`协议名://ip地址:端口号/路径`

  本地：`http://127.0.0.1:3000` 或 `http://localhost:3000`

### 路由

`app.METHOD()`：设置路由

- `METHOD` 可以是 `get` 或 `post`

  ```javascript
  // app.get(path, callback);
  // - '/' 表示localhost:3000
  // - callback 有两个参数, request和response
  //    - req 表示用户的请求信息, 通过 req 获取用户传递数据
  //    - res 表示服务器发送客户端的响应信息, 通过 res 向客户端返回数据
  app.get('/', (req, res) => {
      console.log('有人访问了');
      // 读取用户请求 request
      console.log(req.url);
      // 根据用户请求返回响应 response
      res.sendStatus(404);
  });
  ```

- 如果希望服务器正常访问，需要为服务器设置路由

- 路由**可以根据不同请求方式**和**请求地址**处理用户的请求

`res.sendStatus()`：向客户端发送响应状态码

`res.status()`：设置响应状态码，但不发送

`res.send()`：向请求客户端发送 HTTP 响应消息，默认 `status 200`，可以根据设置的响应状态码自动调整响应头状态码

```javascript
// 如果通过status设置了状态码, 响应头就是状态码
// 如果未设置状态码, 默认返回200
res.send('Hello world!'); 
```

### 中间件

`app.use(path, callback)`：设置中间件

- `callback` 有三个参数，`req`、`res`、`next` 函数；`next` 函数用于触发后续中间件

  ```javascript
  app.use((req, res, next) => {
      console.log('第一个中间件触发了');
      next();
  });
  app.use((req, res) => {
      console.log('第二个中间件触发了');
      res.send('Hello world!');
  });
  ```

  > **注意**：`res.send()` 发生后调用 `next()` 没有意义

和路由的区别：

- 中间件不区分请求方式，**只看路径**

- 路径自定义，不写将自动匹配根目录

  ```javascript
  app.use((req, res) => {
      res.send('hello world!');
  });
  ```

**常用中间件**：

- 获取静态资源

  ```javascript
  // 中间件: 获取静态资源的绝对路径
  app.use(express.static(path.resolve(__dirname, 'public')));
  ```

- 请求体解析

  `extended: true`：表示更深层次嵌套解析

  ```javascript
  // 中间件: 请求体解析
  app.use(express.urlencoded({ extended: true }));
  ```

- 解析 json 格式的请求体

  ```javascript
  // 中间件: 解析json格式的请求体
  app.use(express.json());
  ```

- 404：配置错误路由, 这个中间件需要写在所有路由之后

  - 不传路径, 表示匹配所有路径

  - 当该路由执行时, 说明以上地址均未匹配

    ```javascript
    app.use((req, res) => {
        res.status(404);
        res.send('<h1>404 Not Found!</h1>');
    });
    ```

## nodemon

`nodemon` 模块：自动监视代码修改，重启服务器

- 全局安装

  ```shell
  # 全局安装
  npm i -g nodemon
  
  # 启动项目: nodemon命令自动启动当前目录下的 index.js
  # 启动指定的js文件: nodemon ./xxx/xxx.js 
  nodemon
  ```

  > 使用 `yarn` 命令全局安装 `nodemon` ，`nodemon` 可能运行失败
  >
  > ```shell
  > yarn global add nodemon
  > ```
  >
  > **原因**：`yarn` 的目录并不在环境变量中，需要手动创建**环境变量**
  >
  > ```shell
  > # 获取yarn的目录
  > yarn global bin
  > ```
  >
  > 将读取到 `yarn` 的 `bin` 目录添加到 `Path` 环境变量中即可

- 添加项目依赖

  ```shell
  npm i nodemon -D
  yarn add nodemon -D
  
  # 启动项目
  npx nodemon
  ```

  可以添加 `scripts` 到 `package.json`，只需执行 `npm start` 或 `yarn start`

  ```shell
  "scripts": {
  	"start": "npx nodemon"
  }
  ```

## 静态资源

服务器中代码，对外部而言是不可见的，浏览器无法直接访问

如果希望浏览器访问 html 页面，需要将页面所在目录设置静态资源目录

> **注意**：apache/nginx 反向代理 -> node

设置 `static` 中间件，浏览器访问时，自动访问

```javascript
const express = require('express');
const path = require('path');
const app = express();

app.listen(3000, () => {
    console.log('服务器已经启动了~');
});

// 将绝对路径中的public目录设置为静态资源
app.use(express.static(path.resolve(__dirname, './public')));
app.get('/', (req, res) => {});
```

> **为什么用 `path` 绝对路径？**
>
> 因为 VSCode 默认的 F5 启动是在根目录下启动，而不是当前目录
>
> **为什么要将中间件放在路由之前执行呢？**
>
> 
>
> `public` 设置为静态资源时，等价于 `localhost:3000`，服务器会自动在这个目录中寻找名为 `index` 文件

### get 请求

- `req.query`：返回**查询字符串**中的数据

- `param` 参数：以冒号命名的参数

  ```javascript
  // 定义为/hello/:id, 当用户访问/hello/xxx时会触发
  app.get('/hello/:id', (req, res) => {
      res.send('<h1>Hello world!</h1>');
  });
  ```

  - 通过 `req.params` 获取参数
  - **约定大于配置**

练习：一个表单，表单提交实现判断

```html
<!-- ./public/index.html -->
<form action="/login" method="get">
    <div>用户名: <input name="username" type="text" /></div>
    <div>密码: <input name="password" type="password" /></div>
    <div>
        <input type="submit" value="登录" />
    </div>
</form>
```

```javascript
// index.js
const express = require('express');
const path = require('path');
const app = express();

app.listen(3000, () => {
    console.log('服务器已经启动了~');
});

app.use(express.static(path.resolve(__dirname, './public')));
app.get('/login', (req, res) => {
    if (req.query.username === 'admin' && req.query.password === '123456') {
        res.send('登录成功!');
    } else {
        res.send('用户名或密码错误!');
    }
});
```

### post 请求

`req.body`：获取 `post` 请求 ( **请求体** ) 的参数

默认情况下，express 不会自动请求请求体，需要通过**中间件**增加功能

```javascript
// 1. 引入解析请求体的中间件
app.use(express.urlencoded());

// 2. 通过req.body获取请求体的参数
app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username === 'admin' && password === '123456') {
        res.send('登录成功~');
    } else {
        res.send('用户名或密码错误~');
    }
});
```

利用数组模拟数据库

```javascript
// 创建一个数组模拟数据库
const USERS = [
    { username: 'admin', password: '123456' },
    { username: 'jolyne', password: '123123' },
];

// 2. 通过req.body获取请求体的参数
app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    // 去用户数组查找用户
    for (let users of USERS) {
        if (users.username === username) {
            if (users.password === password) {
                res.send(`登录成功, ${username} ~`);
                return;
            }
        }
    }
    res.send(`登录失败 ~~`);
});
```

使用高阶函数

```javascript
app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    let loginUsers = USERS.find((item) => {
        return item.username === username && item.password === password;
    });
    if (loginUsers) {
        res.send(`Hello, ${loginUsers.username}~~`);
    } else {
        res.send('用户名或密码错误~');
    }
});
```

完成注册

```html
<form action="/register" method="post">
    <div>用户名: <input name="username" type="text" /></div>
    <div>密码: <input name="password" type="password" /></div>
    <div>确认密码: <input name="repassword" type="password" /></div>
    <div>
        <input type="submit" value="注册" />
    </div>
</form>
```

```javascript
const express = require('express');
const path = require('path');
const app = express();

// 创建一个数组模拟数据库
const USERS = [
    { username: 'admin', password: '123456' },
    { username: 'jolyne', password: '123123' },
];

app.listen(3000, () => {
    console.log('服务器已经启动了~');
});

// 将绝对路径中的public目录设置为静态资源
app.use(express.static(path.resolve(__dirname, './public')));

// 引入解析请求体的中间件
app.use(express.urlencoded());

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    let loginUsers = USERS.find((item) => {
        return item.username === username && item.password === password;
    });
    if (loginUsers) {
        res.send(`Hello, ${loginUsers.username}~~`);
    } else {
        res.send('用户名或密码错误~');
    }
});

app.post('/register', (req, res) => {
    const { username, password, repassword } = req.body;
    if (password !== repassword) {
        res.send('两次密码不一致，注册失败~');
        return; // 重要：添加 return 语句，避免继续执行
    }
    let users = USERS.find((item) => {
        return item.username === username;
    });
    if (!users) {
        USERS.push({ username, password });
        res.send('注册成功~');
    } else {
        res.send('用户名已存在，注册失败~');
    }
});
```

### 模板引擎

模板，在网页中嵌入变量

模板引擎：EJS

1. 安装 EJS

   ```shell
   npm i ejs
   ```

2. 配置 express 模板引擎为 `ejs`

   ```javascript
   // 将EJS设置为默认模板引擎
   app.set('view engine', 'ejs');
   // 配置模板的路径
   app.set('views', path.resolve(__dirname, 'views'));
   ```

3. 新建 `views` 目录存放模板

   **注意**：模板引擎需要被 express 渲染后才能使用

4. `res.render(path, object)`：渲染模板引擎并返回给浏览器

   ```javascript
   app.get('/students', (req, res) => {
       res.render('students');
   });
   ```

   `render()` 传一个对象作为 `render` 的第二个参数，渲染后，ejs 模板可以直接访问对象中的数据

   ```javascript
   app.get('/students', (req, res) => {
       res.render('students', {msg:'Hello world!'});
   });
   ```

   ```ejs
   <h1><%=msg %></h1>
   ```

   `<%= %>`：转义输出

   `<%- %>`：原样输出

   `<%# %>`：注释

   `<% %>`：直接编写 js 代码

   ```ejs
   <% if(name === 'Jack') {%>
   <h1>Hello Jack!</h1>
   <%} else {%>
   <h1>Fake News</h1>
   <%}%>
   ```



数据持久化







