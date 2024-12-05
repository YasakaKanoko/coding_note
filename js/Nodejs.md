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
- [手写Promise](#手写-promise)
- [async 与 await](#async-与-await)

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

**同步**：代码自上而下执行；同步会出现阻塞问题，一行代码执行慢会影响整个程序的执行

> 解决同步问题：
>
> - 多线程：Java、Python
> - 异步：Node.js

**异步**：一段代码执行不会影响其他程序的运行；异步的代码无法通过 `return` 返回

> 特点：
>
> 1. 不会阻塞其他代码执行
> 2. 需要通过回调函数返回结果

> 基于回调函数的异步带来的问题：
>
> 1. 可读性差
> 2. 可调式性差

**解决**：Promise。存储数据的**对象**，代替回调函数来返回结果

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

异步必须通过回调函数返回数据，进行复杂调用时，会出现 " 回调地狱 "

```javascript
// 回调地狱或死亡金字塔
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

Promise：解决异步中的回调函数的问题，是一个存储数据的容器，具有特殊的存储数据的方式

**创建 Promise**

- 创建 *Promise* 时，构造函数中需要一个函数作为参数

- *Promise* 构造函数的回调函数，**在创建时调用**，调用时需要两个参数： `resolve` 和 `reject` 两个函数都可以向 *Promise* 中存储数据

  - `resolve`：执行正常时存储

  - `reject`：执行错误时存储

    > `resolve` 和 `reject` 并不是在创建时调用，而是根据需要时调用

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

**读取数据**：通过 *Promise* 实例方法 `then` 读取数据，`then` 方法需要两个回调函数作为参数

- 通过 `resolve` 存储的数据，调用第一个回到函数

- 通过 `reject` 存储的数据或发生异常时，调用第二个回调函数

  ```javascript
  promise.then((result) => {
      console.log(result);
  }, (reason) => {
      console.log(reason);
  });
  ```

  > **注意**：`then` 中的两个函数和 `Promise` 对象中的两个函数，并不是一回事。
  >
  > - `Promise` 对象本身创建的函数是用来存储数据
  > - `then` 中的第一个函数用来编写处理数据的代码，第二个函数用于编写处理异常的代码

Promise 对象中的两个**隐藏属性**：

- `PromiseResult`：存储数据的属性

- `PromiseState`：记录 *Promise* 的状态 ( 三种状态 )

  `PromiseState` 只能修改一次，修改以后无法改变

  - `fulfilled`：完成
  - `rejected`：拒绝、出错
  - `pending`：进行中

**流程**：

- 当 Promise 创建时，`PromiseState` 的初始值为 `pending`
  - 当通过 `resolve` 存储数据时，`PromiseState` 变为 `fulfilled` ( 已完成 )，`PromiseResult` 变为存储的数据
  - 当通过 `reject` 存储数据时，`PromiseState` 变为 `rejected` ( 拒绝或出错 )，`PromiseResult` 变为存储的数据或异常对象

- 当通过 `then` 读取数据时，相当于为 *Promise* 设置了两个回调函数
  - 如果 `PromiseState` 变为 `fulfilled` ( 已完成 )，则调用 `then` 的第一个回调函数返回数据
  - 如果 `PromiseState` 变为 `rejected` ( 拒绝或出错 )，则调用 `then` 的第二个回调函数返回数据或异常信息

### `catch()`

`catch()`：和 `then()` 类似，只需一个回调函数作为参数。`catch()` 只会在 Promise 被拒绝时调用，Promise 专门用于处理异常的方法

```javascript
promise.catch((reason) => {
    console.log('程序异常');
});
```

> `catch()` 相当于 `then(null, reason => {})`

### `finally()`

`finally()`：无论正常数据还是异常数据，`finally()` 都会执行

`finally()` 中不会接收任何数据作为参数；`finally()` 中编写无论成功与否都将执行的代码

```javascript
promise.finally(() => {
    console.log('没有什么可以阻止finally执行!');
});
```

> **注意**：
>
> 1. `Promise()` 对象中的 `then`、`catch`、`finally` 方法调用时返回的都是一个新的 `Promise()`
> 2. `then` 中的代码是异步的，要比其他代码执行晚

### 链式调用

- Promise 对象中的方法每次调用函数返回的是上一次调用的结果

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

- Promise 的链式调用：`then` 和 `catch` 执行的结果不是当前所需要的结果会被直接跳过当前方法

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

- 如果 Promise 出现异常，整条链上没有 `catch`，异常会直接抛出，因此只需在最后一行中设置 `catch` 即可

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

- `Promise.resolve()`：创建一个立即完成的 Promise

  ```javascript
  Promise.resolve('Hello world!').then(res => { console.log(res); }); // Hello world!
  ```

- `Promise.reject()`：创建一个立即拒绝的 Promise

  ```javascript
  Promise.reject('New Error!').then(null, (res) => { console.log(res); }); // New Error!
  ```

- `Promise.all(iterable)`：需要一个可迭代对象作为参数，返回一个新的 Promise 对象，同时返回多个 Promise 的执行结果

  如果其中有一个 Promise 报错了，返回错误信息

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

- `Promise.allSettled()`：需要一个可迭代对象作为参数，和 `all` 类似，返回的结果是以**对象**形式返回 ( `status` 保存状态，`value` 保存值 )

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

- `Promise.race()`：需要一个可迭代对象作为参数，返回执行最快的 Promise ，

  不考虑对错

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

- `Promise.any()`：需要一个可迭代对象作为参数，返回执行最快的 Promise 

  只有当所有的 Promise 对象都出错时，才返回错误信息

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
> - 栈，是一种后进先出的数据结构
> - 调用栈中，存放的是准备执行的代码
>
> **任务队列**：
>
> - 队列，是一种先进先出的数据结构
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

Promise 执行原理：Promise 执行时，`then` 相当于给 Promise 绑定一个回调函数，`promiseState` 的状态从 `pending` 变为 `fulfilled` ，`then` 的回调函数放入**任务队列**

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

- `async`：快速创建异步函数，异步函数的返回值会封装到一个 Promise 中返回。即 `async` 封装的函数，需要调用 `then` 方法访问

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

- `await`：调用异步函数。暂停代码运行，直到异步代码有结果时才返回

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
  >   唯一的区别在于 `async` 返回的是一个 Promise 对象
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

**问题**：

1. **空间浪费**：无法指定引入模块的内容
2. 引入模块必须按照既定的顺序，容易出错

**解决**：模块化

- **Nodejs**：**CommonJS** 规范
- **ES 模块化规范**

> **注意**：Node 会将扩展名为 `.js`、`.cjs`、`.json`、`.node` 视为 CommonJS 模块 

### CommonJS

在定义模块时，模块中的内容是禁止外部访问的，使用前需**导出模块**

**导出模块**

- 访问 `exports` 的方式：`exports`、`module.exports`

- `exports` 实际上是 `require` 函数的返回值

  导出单个属性

  ```javascript
  exports.a = 10;
  ```

  `module.exports`：同时导出多个值

  ```javascript
  let a = 10;
  let b = 20;
  module.exports = {
      a, b
  };
  ```

  > **注意**：`module.exports = {}` 与 `exports = {}`
  >
  > - `module.exports = {}` 是在修改对象的属性值 ( √ )
  > - `exports = {}` 是在给对象赋值 ( × )

**引入模块**

- `require('./path')`：引入自定义模块，使用 `./` 或 `../`

  `.js` 扩展名可以省略 

  ```javascript
  const m1 = require('./m1'); // 等价于 './m1.js'
  console.log(m1.a); // 10
  ```

  > node 自动补全文件扩展名机制：
  >
  > - node 识别引入模块文件时，会优先寻找目录中的 `.js` 文件，如果文件不存在，则会寻找 `.json` 文件，如果 `.json` 文件也不存在，则会寻找 `.node` 文件
  > - 如果 `.js` 和 `.json` 文件同名，则优先使用 `.js` 文件

- `require()` 引入第三方模块

  路径直接写模块名称

  在模块前加上 `node:`：指定模块为核心模块

  ```javascript
  const path = require('path');
  // 等价于 const path = require('node:path');
  ```

- `require()` 引入文件夹作为模块

  文件夹中需要一个模块的主文件： `index.js`

  如果主文件不存在，则需要在 `package.json` 中指定 `main` 属性的文件作为主文件

  `node_modules`：如果引入模块是 `node_modules`，且路径没有以 `./` 或 `../` 开头，会从根目录开始向上查找，直到找到模块

  ```javascript
  // 文件目录中存在index.js则会自动识别 ./hello/index.js
  const hello = require('./hello');
  ```

- 按需引入

  ```javascript
  // 只引入'./m3.js'中的name属性
  const name = require('./m3').name;
  ```

- 解构赋值

  ```javascript
  const {name} = require('./m3');
  ```

- **原理**：所有 CommonJS 的模块都会被包装到一个函数中

  ```javascript
  (function(exports, require, module, __filename, __dirname) {
      
  };
  ```

### ES 模块

ES6 标准

在 Node 环境中，默认模块化标准是 CommonJS，如果想要使用 ES 标准

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
  export let a = 10;
  export const b = 20;
  
  // 等价于
  let a = 10;
  const b = 20;
  export {a, b};
  ```

  > **注意**：`export` 是对外的接口，必须使用解构赋值 `{}` ，必须与模块内部变量建立一一对应的关系

- 默认导出：`export default`

  **注意**：一个模块中，只能有一个默认导出

  ```javascript
  function sum(a, b) {
      return a + b;
  }
  export default sum;
  ```

- 导出函数和类

  ```javascript
  // 写法一
  export function fn() {}
  
  // 写法二
  function fn() {}
  export {fn}
  ```

- `export * from`：将另一个模块的所有内容导出，而不导出默认导出。可以在一个模块集中管理多个模块

  ```javascript
  // utils.js
  export function add(a, b) { return a + b; }
  export function subtract(a, b) { return a - b; }
  export function multiply(a, b) { return a * b; }
  
  // math.js
  export * from './utils.js';
  
  // main.js
  import { add, subtract, multiply } from './math.js';

**引入模块**

- `*`：导入所有 

  前端慎用 `import *`：前端使用 webpack 打包时，最终打包后的文件很臃肿，性能会受影响

  ```javascript
  import * as m1 from "./m1.js"
  console.log(m1.a); // 10
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

  

- `fs.mkdir()`：创建目录

- `fs.rmdir()`：删除目录

- `fs.rename()`：重命名

- `fs.copyFile()`：复制文件

