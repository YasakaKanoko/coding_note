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

## 拼接

