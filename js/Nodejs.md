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

## *Promise*

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

_Promise_：解决异步中的回到函数的问题，存储数据的容器，特殊存储数据的方式

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

- 通过 `reject` 存储的数据或出现异常时，调用第二个回调函数

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

`catch()`：和 `then()` 类似，只需一个回调函数作为参数。`catch()` 只会在 *Promise* 被拒绝时调用，__Promise_ 专门用于处理异常的方法

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

