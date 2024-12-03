# *Node.js*

**目录**：

- [安装](#安装)
- [异步](#异步)
- [Promise](#Promise)
- [then()](#then())
- [catch()](#catch())
- [finally()](#finally())

[*Node.js*](https://nodejs.org/en) 是一个在 V8 引擎上的 JavaScript 运行环境，可以在浏览器之外的地方运行

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

**解决**：*Promise*：存储数据的**对象**，代替回调函数来返回结果

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

_Promise_：解决异步中的回调函数的问题，是一个存储数据的容器，具有特殊的存储数据的方式

**创建 *Promise***

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

*Promise* 对象中的两个**隐藏属性**：

- `PromiseResult`：存储数据的属性

- `PromiseState`：记录 *Promise* 的状态 ( 三种状态 )

  `PromiseState` 只能修改一次，修改以后无法改变

  - `fulfilled`：完成
  - `rejected`：拒绝、出错
  - `pending`：进行中

**流程**：

- 当 *Promise* 创建时，`PromiseState` 的初始值为 `pending`
  - 当通过 `resolve` 存储数据时，`PromiseState` 变为 `fulfilled` ( 已完成 )，`PromiseResult` 变为存储的数据
  - 当通过 `reject` 存储数据时，`PromiseState` 变为 `rejected` ( 拒绝或出错 )，`PromiseResult` 变为存储的数据或异常对象

- 当通过 `then` 读取数据时，相当于为 *Promise* 设置了两个回调函数
  - 如果 `PromiseState` 变为 `fulfilled` ( 已完成 )，则调用 `then` 的第一个回调函数返回数据
  - 如果 `PromiseState` 变为 `rejected` ( 拒绝或出错 )，则调用 `then` 的第二个回调函数返回数据或异常信息

### `catch()`

`catch()`：和 `then()` 类似，只需一个回调函数作为参数。`catch()` 只会在 *Promise* 被拒绝时调用，_Promise_ 专门用于处理异常的方法

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

## 宏任务和微任务

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

## 手写 Promise

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



