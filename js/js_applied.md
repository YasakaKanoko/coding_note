# 数组

数组的本质：对象 (引用数据类型)

```javascript
let arr1 = [3, 5, 7, 8, 2];
let arr2 = arr1;
console.log(arr2 === arr1); // true
arr2[0] = 5;
console.log(arr1[0], arr2[0]); // 5, 5
```

## 如何克隆(复制)

`slice(start, end)`：从开始下标到结束下标截取(左闭右开)

> 克隆/复制：`0` 或 不写参数。
>
> **产生的是一个新的对象**

```javascript
let arr1 = [3, 5, 7, 8, 2];
let arr2 = arr1.slice();
console.log(arr1 === arr2); // false
```

## 求和

1. 遍历

   ```javascript
   let arr = [3, 5, 7, 8, 2];
   
   let sum = 0;
   for (let i = 0; i < arr.length; i++) {
       sum += arr[i];
   }
   console.log(sum); // 25
   ```

2. 高阶函数：`reduce()`

   ```javascript
   let arr = [3, 5, 7, 8, 2];
   let res = arr.reduce((x, y) => {
       return x + y;
   });
   console.log(res); // 25
   ```


## 二维数组

```javascript
let arr = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
```

**求和**

1. 遍历

   ```javascript
   let arr = [
       [1, 2, 3],
       [4, 5, 6],
       [7, 8, 9]
   ];
   let sum = 0;
   for (let i = 0; i < arr.length; i++) {
       for (let j = 0; j < arr[i].length; j++) {
           sum += arr[i][j];
       }
   }
   console.log(sum);
   ```

2. 高阶函数

   ```javascript
   // 二维数组转一维数组
   let newArr = function (arr) {
       return arr.reduce((x, y) => {
           return x.concat(Array.isArray(y) ? newArr(y) : y);
       }, []);
   }
   // 二维数组求和
   console.log(newArr(arr).reduce((x, y) => x + y));
   ```

# BOM

浏览器对象模型

BOM 和 DOM 的关系

1. js 通过访问 BOM 对象访问、控制、修改 浏览器

2. BOM 的 `window` 包含了 `document` ，通过 `window` 对象的 `document` 可以访问、检索、修改文档内容和结构

3. `document` 又是 DOM 对象的根节点

   BOM 包含 DOM ，浏览器提供 BOM ，从 BOM 访问到 DOM，从而通过 js 操作浏览器以及浏览器读取到的文档

`window` 是BOM的顶层核心对象

`window` 既是 js 访问浏览器窗口的接口，又是一个全局对象。 

**BOM 组成**

1. `window` 是 js 层级中顶层对象，表示浏览器窗口
2. `Navigator` 包含客户端浏览器信息
3. `History` 包含浏览器访问过的 URL
4. `Location` 包含当前 URL 的信息
5. `Screen` 包含客户端显示器的信息

