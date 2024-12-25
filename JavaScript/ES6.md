# ES6

---

**目录**：

- [严格模式](#严格模式)
- [let 和 const](#let-和-const)
- [字符串](#字符串)
- [数组](#数组)
- [对象](#对象)
- [成员速写](#成员速写)
- [展开运算符](#展开运算符)
- [getter 和 setter](#getter-和-setter)
- [键值对](#键值对)
- [冻结](#冻结)
- [相同性判定](#相同性判定)
- [Set](#set)
- [Map](#map)
- [函数](#函数)

----

## 严格模式

ES5新增，脚本顶部加入：`'use strict;'`

整个文件将以严格模式工作

## let 和 const

- `let`：定义变量

- `const`：定义常量

  > **注意**：
  >
  > - `const` 只是禁止变量重新赋值，对象中的属性仍可以修改
  > - 实际开发中，所有变量均使用 `const` ，如果实在需要修改，才使用 `let`

**特点**：

- 定义的**变量不再作为全局对象的属性**

- **变量提升**：在变量定义前使用会报错

  ```javascript
  for (var i = 0; i < 10; i++) {
      ((i) => {
          setTimeout(() => {
              console.log(i);
          }, 1000);
      })(i);
  }
  ```

- **不能重复声明**同名变量

- 使用 `const` 声明时，必须初始化

- **块级作用域**

  > **注意**：`var` 只有函数作用域

**练习1**：

```javascript
// 【报错】: SyntaxError: Missing initializer in const declaration
// 【原因】: const声明的变量必须初始化
let a;
const b;

// 【报错】: Uncaught TypeError TypeError: Assignment to constant variable.
// 【原因】: const声明的变量不能修改
let a = 1;
const b = 2;
a++;
b++;

// 【报错】: Uncaught ReferenceError ReferenceError: Cannot access 'a' before initialization
// 【原因】: let声明变量不具有变量提升
console.log(a);
let a = 1;

// 【报错】: SyntaxError: Identifier 'a' has already been declared
// 【原因】: let禁止重复声明同名变量
let a = 1;
let a = 2;
```

**练习2**：为所有按钮设置点击事件

```javascript
// const btns = document.querySelectorAll('button');
const btns = document.getElementsByTagName('button');
for (let i = 0; i < btns.length; i++) {
    btns[i].onclick = () => {
        console.log('这是第' + (i + 1) + '个按钮');
    };
}
```

## 字符串

### API

- `String.prototype.includes(s)` ：字符串是否包含某个子串
- `String.prototype.trim()` ：去掉字符串首尾空白字符
- `String.prototype.trimStart()` ：去掉字符串开始处空白字符
- `String.prototype.trimEnd()` ：去掉字符串末尾处空白字符
- `String.prototype.replaceAll(s, t)` ：将字符串中的所有 `s` 替换成 `t`
- `String.prototype.startsWith(s)` ：判断字符串是否以 `s` 开头
- `String.prototype.endsWith(s)` ：判断字符串是否以 `s` 结尾

### 模板字符串

**模板字符串**：<code>``</code>。实现换行、拼接字符串、字符串中嵌入变量

- 嵌入变量：`${}`

- 嵌入 html

  ```javascript
  const user = {
      name: 'Jolyne',
      age: 17,
  };
  const html = `
  <div>
      <p><span>姓名</span><span>${user.name}</span></p>
      <p><span>年龄</span><span>${user.age}</span></p>
  </div>`;
  ```

  **练习**：将数组中的图片嵌入 `container` 中

  ```javascript
  const movies = [
      {
          _id: '60950c5b11faef69c541a2b9', // 电影id
          rate: 7.6, // 电影评分
          title: '肖申克的救赎',
          url: 'https://www.bilibili.com/',
          cover: 'https://www.loliapi.com/acg/',
      },
      // .....
  ];
  let html = '';
  for (let i = 0; i < movies.length; i++) {
      const m = movies[i];
      html += `
          <div class="movie">
              <a href="${m.url}" target="_blank" class="cover">
                  <img src="${m.cover}" alt="" />
              </a>
              <a href="${m.url}" target="_blank">${m.title}</a>
          </div>
      `;
  }
  document.querySelector('.container').innerHTML = html;
  ```

## 数组

### for-of

`for-of`：遍历数组和伪数组

```javascript
const arr = [1, 2, 3, 4, 5];
for (let ele of arr) {
    console.log(ele);
}
```

**应用**：针对网页中的标签做一些操作

```javascript
const elements = document.querySelectorAll('.item');
for(let ele of elements){
    // 针对网页中的标签做一些操作
    // xxx
}
```

### API

- `Array.isArray(target)` ：判断 `target` 是否是一个数组
- `Array.from(source)` ：将某个类数组对象 `source` 转换为数组
- `Array.prototype.fill(x)` ：将数组的项初始化为 `x`
- `Array.prototype.forEach(callback)` ：遍历数组，传入一个回调函数作为参数，返回值是 `undefined`
- `Array.prototype.map(callback)` ：数组映射。数组的每一项都会执行回调函数
- `Array.prototype.filter(callback)` ：数组筛选。筛选出符合条件的项
- `Array.prototype.reduce(callback)` ：数组归约。将结果汇总为单个返回值。可选的第二个参数可作为初始值
- `Array.prototype.some(callback)` ：判断数组中的至少一项符合回调函数的测试
- `Array.prototype.every(callback)` ：判断数组中的所有项符合回调函数的测试
- `Array.prototype.find(callback)` ：判断数组中第一个通过回调函数测试的项
- `Array.prototype.includes(item)` ：判断数组中是否存在 `item` 项，规则使用 `Object.is()` ，类似于 `===`

**练习**：

1. `for-of` 遍历按钮，注册点击事件，点击按钮时输出文本内容

   ```javascript
   const btns = document.querySelectorAll('button');
   for (const btn of btns) {
       btn.onclick = () => {
           console.log(btn.innerText);
       };
   }
   ```

2. 将按钮的文本，映射成数组并打印

   ```javascript
   const btns = document.querySelectorAll('button');
   const arr = Array.from(btns).map((item) => {
       return item.innerText;
   });
   console.log(arr);
   ```

3. 将按钮的文本，映射成对象并打印

   ```javascript
   const btns = document.querySelectorAll('button');
   const obj = Array.from(btns).map((item, i) => {
       return { index: i, text: item.innerText };
   });
   console.log(obj);
   ```

4. 生成一个长度为 10 的数组，范围 0-1

   ```javascript
   const arr = Array(10)
       .fill(0)
       .map(() => {
           return Math.random();
       });
   console.log(arr); 
   ```

5. 生成一个长度为 10 的数组，范围 10-100

   ```javascript
   const arr = Array(10)
       .fill(0)
       .map(() => {
           return Math.floor(Math.random() * 90 + 10);
       });
   console.log(arr);
   ```

6. 判断字符串 `s` 是否为 `.jpg`、`.png`、`.bmp`、`.gif` 中的一个

   ```javascript
   const s = '.js';
   const res = ['.jpg', '.png', '.bmp', '.gif'].includes(s);
   console.log(res);
   ```

7. 数组练习

   ```javascript
   const students = [
       {
           id: 98985,
           name: 'Jack',
           sex: 'female',
           age: 15,
           address: 'LA',
           tel: '12344556677'
       },
       // xxx
   ];
   
   // 1. 遍历得到所有的名字
   // 方法1
   students.forEach((x) => {
       console.log(x.name);
   });
   
   // 方法2
   for (let stu of students) {
       console.log(stu.name);
   }
   
   // 2. 得到所有的女生
   const result = students.filter((x) => {
       return x.sex === 'female';
   });
   console.log(result);
   
   // 3. 遍历得到所有年龄25以下的女性
   const result = students.filter((x) => {
       return x.age < 25 && x.sex === 'female';
   });
   console.log(result);
   
   // 4. 得到所有J开头的
   // 方法1
   const result = students.filter((x) => {
       return x.name[0] === 'J';
   });
   console.log(result);
   
   // 方法2
   const result = students.filter((x) => {
       return x.name.startsWith('J');
   });
   console.log(result);
   
   // 5. 电话号码以1结尾
   const result = students.filter((x) => {
       return x.tel.endsWith('1');
   });
   console.log(result);
   
   // 6. 返回所有姓名组成的数组
   const names = students.map((x) => {
       return x.name;
   });
   console.log(names);
   
   // 7. 得到所有学生姓名组成的字符串, 以逗号分割
   const names = students.map((x) => {
       return x.name;
   }).join(',');
   console.log(names);
   
   // 8. 得到所有学生的姓名以p元素包裹, 形成html片段
   const result = students.map((x) => {
       return `<p>${x.name}</p>`;
   }).join('');
   console.log(result);
   
   // 9. 得到所有女生的姓名的数组
   const girls = students.filter((x) => {
       return x.sex === 'female';
   }).map((x) => {
       return x.name;
   });
   console.log(girls);
   
   // 10. 得到所有女生的姓名和电话的数组 [ {name: 'Alice', tel: '123456789'} ]
   const girls = students.filter((x) => {
       return x.sex === 'female';
   }).map((x) => {
       return { name: x.name, tel: x.tel };
   });
   console.log(girls);
   
   // 11. 得到所有学生年龄的总和
   const age = students.reduce((x, y) => {
       return x + y.age;
   }, 0);
   console.log(age);
   
   // 12. 得到所有学生的平均年龄
   const age = students.reduce((x, y) => {
       return x + y.age;
   }, 0);
   console.log(age / students.length);
   
   // 13. 返回一个对象: { name: ['Alice', ...], age: [17, 25, ...] }
   const result = students.reduce((a, b) => {
       a.name.push(b.name);
       a.age.push(b.age);
       return a;
   }, { name: [], age: [] });
   console.log(result);
   
   // 14. 找到id为98985的对象
   const result = students.find((stu) => {
       return stu.id === 98985;
   });
   console.log(result);
   
   // 15. 是否包含大于28岁的男性
   const result = students.some((stu) => {
       return stu.age > 28 && stu.sex === 'male';
   });
   console.log(result);
   
   // 16. 是否所有的女生的年龄都在28以内
   const result = students.filter((stu) => {
       return stu.sex === 'female';
   }).every((stu) => {
       return stu.age <= 28;
   });
   console.log(result);
   ```

## 对象

### 成员速写

- **成员速写**

  ```javascript
  const name = 'monica';
  const age = 18;
  const sayHello = function () {
      console.log(`my name is ${this.name}`);
  };
  
  // 过去式
  const user = {
      name: name,
      age: age,
      sayHello: sayHello
  };
  
  // 成员速写
  const user = {
      name,
      age,
      sayHello
  };

- **方法速写**

  ```javascript
  // 过去式
  const MyMath = {
      sum: function (a, b) {
          return a + b;
      }
  };
  
  // 方法速写
  const MyMath = {
      sum(a, b) {
          return a + b;
      }
  };
  ```

### 展开运算符

**展开运算符**：`...` 表示

- **展开数组**

  ```javascript
  const arr = [1, 2, 3, 4, 5];
  Math.max(...arr);
  
  // 合并数组
  const arr1 = [2, 3, 4];
  const arr2 = [1, ...arr1, 5];  // [ 1, 2, 3, 4, 5 ]
  ```

- **展开对象**

  ```javascript
  const a1 = {
      a: 1,
      b: 2
  };
  
  const a2 = {
      c: 3,
      d: 4
  };
  
  // 合并对象
  const a3 = {
      ...a1,
      ...a2
  };
  
  // 修改对象的指定属性, 其他属性和源对象一致
  const user1 = {
      name: 'Jack',
      age: 18,
      gender: 'male'
  };
  const user2 = {
      ...user1,
      name: 'John'
  }; // { name: 'John', age: 18, gender: 'male' }
  ```

- 练习

  ```javascript
  // 创建一个函数, 如果未传参, 参数为默认值, 如果传参, 参数修改默认值, 不修改其他属性
  function createOptions(options) {
      options = options || {};
      const defaultOptions = {
          time: 1000,
          speed: 50,
          text: ''
      };
      return {
          ...defaultOptions,
          ...options
      };
  };
  let result = createOptions(); //  { time: 1000, speed: 50, text: '' }
  result = createOptions({
      time: 500,
      text: 'Hello world!'
  });
  console.log(result);
  ```

### 解构

- **对象解构**

  ```javascript
  const user = {
      name: 'Jack',
      age: 18,
      address: {
          province: 'California',
          city: 'LA'
      }
  };
  
  // 过去式
  const name = user.name;
  const age = user.name;
  const city = user.address.city;
  
  // 解构
  const { name, age } = user;
  const { address: { city } } = user;
  ```

- **数组解构**

  ```javascript
  const arr = [1, 2, 3, 4];
  
  // 将数组各项值依次存入变量中
  const [a, b, c, d] = arr;
  
  // 仅取出下标1, 2的值
  const [, a, b] = arr;
  
  // 仅取出下标1, 3的值
  const [, a, , b] = arr;
  
  // 仅取出前两项的值, 剩下的值存放到新数组arr2中
  const arr = [1, 2, 3, 4];
  const [a, b, ...arr2] = arr;
  console.log(arr2); // [ 3, 4 ]
  ```

- **交换变量**

  ```javascript
  let a = 1, b = 2;
  [a, b] = [b, a];
  ```

- **传参时解构**

  ```javascript
  function sum({ a, b }) {
      return a + b;
  };
  
  const obj = {
      a: 1,
      b: 2
  };
  
  sum(obj);
  ```

- **遍历时解构**

  ```javascript
  const users = [
      { name: 'Jack', age: 18 },
      { name: 'Jolyne', age: 20 }
  ];
  for (const { name, age } of users) {
      console.log(name, age);
  }
  ```

- **解构练习**

  ```javascript
  // 调用createUser函数解构获得fullName
  // 创建一个对象
  /*
  {
      firstName: xxx,
      lastName: xxx,
      fullName: xxx,
      sayHello: fn
  }
  */
  function createUser(firstName, lastName) {
      return {
          firstName,
          lastName,
          fullName: `${firstName} ${lastName}`,
          sayHello() {
              console.log(`Hello ${fullName}`);
  
          }
      }
  }
  // 调用createUser函数解构获得fullName
  const { fullName } = createUser('Jolyne', 'Kujo');
  console.log(fullName);
  ```

### 属性描述符

对象中的每个变量，js 会使用属性描述符描述

```javascript
const user = {
    name: 'Jack',
    age: 18
};
```

上述对象，js 内部描述为：

```json
{
    // 属性name的描述符
    name: {
        value: "Jack",
        configurable: true, // 是否可以被重新定义
        enumerable: true, // 是否允许被遍历, 影响for-in循环 
        writable: true // 是否允许被修改
    },
    // 属性age的描述符
    age: {
        value: 18,
        configurable: true, // 是否可以被重新定义
        enumerable: true, // 是否允许被遍历, 影响for-in循环 
        writable: true // 是否允许被修改
    }
}
```

ES5 提供 API 针对属性描述符进行操作：

1. `Object.getOwnPropertyDescriptor(obj, propertyName)` ：获取一个属性的描述符

   ```javascript
   console.log(Object.getOwnPropertyDescriptor(user, 'name'));
   /* { 
       value: 'Jack', 
       writable: true, 
       enumerable: true, 
       configurable: true 
   } */

2. `Object.defineProperty(obj, propertyName, descriptor)` ：定义某个属性的描述符

   ```javascript
   Object.defineProperty(user, 'name', {
       value: 'Jolyne',
       enumerable: false,
       writable: false
   });
   ```

### getter 和 setter

属性描述符中的两个特殊配置，通过 `get` 和 `set` 可以将属性的取值和赋值变为方法调用

```javascript
const obj = {};
let internal;
Object.defineProperty(obj, 'a', {
    get() {
        return internal;
    },
    set(val) {
        internal = val;
    }
});

console.log(obj.a); // undefined
obj.a = 2;
console.log(obj.a); // 2
```

练习

```javascript
const user = {
    name: 'Jolyne',
    age: 17,
    gender: 'female'
};
// 遍历对象user, 将每一个属性变为getter和setter, 读写功能不变
Object.entries(user).forEach(([key, value]) => {
    Object.defineProperty(user, key, {
        // 读取属性时, 输出: 正在读取xxx属性, 值为xxx
        get() {
            console.log(`正在读取${key}属性, 值为${value}`);
            return value;
        },
        // 属性赋值时, 输出: 正在设置xxx属性, xxx为yyy
        set(val) {
            console.log(`正在设置${key}属性, ${key}的值为${val}`);
            value = val;
        }
    })
});
```

### 键值对

- `Object.keys(obj)`：获取对象的属性名组成的数组

- `Object.values(obj)`：获取对象的属性值组成的数组

- `Object.entries(obj)`：获取对象的属性名和属性值组成的数组

- `Object.fromEntries(entries)`：将属性名和属性值的数组转换为对象

  ```javascript
  const user = {
      name: 'Jack',
      age: 18
  };
  
  Object.keys(user); // [ 'name', 'age' ] 
  Object.values(user); // [ 'Jack', 18 ]
  Object.entries(user); // [ [ 'name', 'Jack' ], [ 'age', 18 ] ] 
  Object.fromEntries(Object.entries(user)); // { name: 'Jack', age: 18 }
  
  // 遍历
  for (let [key, value] of Object.entries(user)) {
      console.log(`${key}: ${value}`);
  }
  ```

- 练习

  ```javascript
  const obj = {
      a: 1,
      b: 2,
      c: 3
  };
  
  // 1. 遍历对象的属性名
  // 方法一
  for (let key of Object.keys(obj)) {
      console.log(key);
  }
  // 方法二
  Object.keys(obj).forEach((key) => {
      console.log(key);
  
  });
  
  // 2. 遍历对象的属性值
  for (let value of Object.values(obj)) {
      console.log(value);
  }
  
  // 3. 遍历对象的属性名和属性值
  for (let entry of Object.entries(obj)) {
      console.log(entry);
  }
  
  // 4. 复制obj的所有属性获得一个新对象
  // 方法一
  const newObj = {
      ...obj
  };
  
  // 方法二
  const newObj = Object.fromEntries(Object.entries(obj));
  
  
  // 5. 复制obj除a以外的所有属性得到一个新对象
  // 方法一
  const newObj = {
      ...obj
  };
  delete newObj.a;
  
  // 方法二
  const { a, ...newObj } = obj;
  ```

### 冻结

- `Object.freeze(obj)`：冻结对象，该对象的所有属性均不可更改

  > **注意**：嵌套对象的属性仍可以修改，如需冻结嵌套对象，需要在嵌套的对象中再冻结

  ```javascript
  const obj = {
      a: 1,
      b: {
          c: 3
      }
  };
  Object.freeze(obj);
  obj.a = 2; // 不报错, 代码无效
  obj.d = 4; // 不报错, 代码无效
  delete obj.a; // 不报错, 代码无效
  
  obj.b.c = 5; // b对象未被冻结, 代码生效
  console.log(obj); // { a: 1, b: { c: 5 } }
  ```

- `Object.isFrozen(obj)`：判断一个对象是否被冻结

### 相同性判定

`Object.is`：可以判断两个值是否相同

和 `===` 的区别：

- `NaN` 和 `NaN` 相等

- `+0` 和 `-0` 不相等

  ```javascript
  Object.is(1, 2); // false
  Object.is("1", 1); // false
  Object.is(NaN, NaN); // true
  Object.is(+0, -0); // false
  ```

### Set

`Set` 是一种数据集合，不能存储重复数据

- 初始化集合

  ```jsx
  const set = new Set();
  ```

- `add(data)`：添加数据

- `has(date)`：检查集合中是否包含某个数据

- `delete(data)`：删除元素

- **遍历**

  ```jsx
  for (item of set) {
      console.log(item); // Set(2) {1, 2}
  }
  ```

- **集合转数组**

  ```jsx
  let arr = [...set];
  console.log(arr); // (2) [1, 2]
  
  let arr = Array.from(set);
  console.log(arr); // (2) [1, 2]
  ```

- **数组去重**

  ```jsx
  let arr = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5];
  const set = new Set(arr);
  arr = Array.from(set);
  console.log(arr); // (5) [1, 2, 3, 4, 5]
  ```

### Map

`Map` 是一种数据集合，用于存储一系列的键值对

> **注意**：
>
> 1. 键 ( `key` ) 是唯一的
> 2. `key` 可以是任何属性，`Object` 的 `key` 只能是字符串或符号

- 初始化

  ```jsx
  // 初始化
  let map = new Map();
  ```

- `set(key, value)` ：添加属性

- `get(key)` ：获取属性

- `size`：键值对的数量

- `delete(key)` ：删除指定键值对

- `clear()` ：清空键值对

## 函数

### 箭头函数

**语法**：

- `(参数列表) => { 函数体 }`

- `参数 => { 函数体 }`

- `(参数列表) => 返回语句`

  ```jsx
  const sum = (a, b) => {
  		return a + b;
  }
  ```

**特点**：

1. 不能使用 `new` 调用

2. 没有原型，没有 `prototype` 属性

3. 没有 `arguments`

4. 没有 `this`

   > **注意**：`this` 使用的是外层的 `this`

### 剩余参数

`...args` ：剩余参数收集未知数量的参数，存放在数组中

```jsx
function sum(...args) {
    console.log(args.reduce((x, y) => {
        return x + y;
    }, 0));
}
```

> **注意**：剩余参数只能声明在参数的最后一项

### 参数默认值

当参数没有传递或参数为 `undefined` 时，会使用默认值

```jsx
function sum(a, b = 1) {
    return a + b;
};
console.log(sum(1)); // 2
```

### 类语法

函数的两种调用方式

```jsx
function A() {};

// 直接调用
A();

// 构造函数形式调用
new A();
```

**旧类**

```jsx
function User(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.fullName = `${firstName} ${lastName}`;
}
// 静态方法
User.isUser = function (u) {
    // xxx
}

// 调用静态方法
User.isUser(xxx);

// 原型方法/公共方法
User.prototype.sayHello = function () {
    // xxx
}

// 实例方法
const u = new User(xxx);
u.sayHello();
```

**新类**

```jsx
class User {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = `${firstName} ${lastName}`;
    }
    // 静态方法
    static isUser = function (u) {
        // xxx
    }
    // 公共方法
    sayHello() {
        // xxx
    }
}
```

**类的继承**

```jsx
// 旧类的继承
function Animal() { }
function Dog() { }
// 设置继承关系
Dog.prototype = Object.create(Animal.prototype);

// 新类的继承
class Animal { }
class Dog extends Animal { }
```

### 函数 API

| API                                      | **含义**                                             |
| ---------------------------------------- | ---------------------------------------------------- |
| `Function.prototype.call(obj, ...args)`  | 调用函数，绑定 `this` 为 `obj`                       |
| `Function.prototype.apply(obj, ...args)` | 调用函数，绑定 `this` 为 `obj`，以**数组**的形式传参 |
| `Function.prototype.bind(obj, ...args)`  | 将函数 `this` 绑定为 `obj`                           |

## 异步





