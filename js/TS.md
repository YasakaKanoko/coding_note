# TypeScript

# 简介

1. TypeScript 是 JavaScript 的 **超集**
2. 新增 **静态类型检查**、**接口**、**泛型**等
3. TypeScript 需要先**编译**为 JavaScript ，再运行

# JavaScript 的缺陷

1. **不清楚的数据类型**

   ```javascript
   let welcome = 'hello';
   welcome(); // 报错: TypeError: welcome is not a function
   ```

2. **逻辑漏洞**

   ```javascript
   const str = Date.now() % 2 ? '奇数' : '偶数';
   
   if (str !== '奇数') {
       console.log('hello'); // 永远不会进入 else
   } else if (str === '偶数') {
       console.log('world');
   }
   ```

3. **不存在的属性**

   ```javascript
   const obj = {
       width: 10,
       height: 15
   };
   const area = obj.width * obj.heigth; // 单词拼写错误不会报错, 会将不存在的属性访问 返回 NaN
   ```

4. **拼写错误**

   ```javascript
   const message = 'hello, world';
   message.toUperCase(); // TypeError: message.toUperCase is not a function
   ```

**静态类型检查**：运行时的代码错误前置

# 编译

注意：基于 Vue 或 React 通过 Webpack 或 Vite 进行配置可以跳过此步 

1. 新建  `.ts` 文件

2. 全局安装 TypeScript

   ```bash
   $ npm i typescript -g
   ```

3. 使用命令编译 `.ts` 文件

   ```bash
   $ tsc demo.ts
   ```

**自动化编译**

1. 创建 TypeScript 编译控制文件

   ```bash
   $ tsc --init
   ```

   1. 生成一个 `tsconfig.json` 配置文件，包含很多编译时的配置
   2. 可以手动更改编译的 js 版本，默认 `ES7`

2. 监视 `.ts` 文件变化

   ```bash
   $ tsc --watch
   ```

3. 优化：当编译出错时不生成 `.js` 文件

   ```bash
   $ tsc --noEmitOnError --watch
   ```

   > 修改配置文件 `tsconfig.json` 的   `"noEmitOnError": true`

# 类型声明

`:` 对 **变量** 或 **形参** 进行类型声明

```typescript
let a: number;
let b: string;
let c: boolean;

// 对于函数 可以限制返回值的类型
function count(a: number, b: number): number {
    return a + b;
}
```

**字面量类型**，不推荐使用

```typescript
let a: 'hello'; // a 的值只能存放字符串 'hello'
let b: 100; // b 的值只能是数字 100
```

# 类型推断

根据代码自动推导类型，在复杂的情况时类型推断容易出现问题

```typescript
function count(a: number, b: number) {
    return a + b;
}

// res 的类型被自动推断为 number
let res = count(1, 2);
console.log(res); 
```

# 类型

- JavaScript 中的数据类型

  1. `string`
  2. `number`
  3. `boolean`

  4. `null`

  5. `undefined`

  6. `bigint`

  7. `symbol`

  8. `object`

  > 备注：`object` 中包含 `Array`、`Function`、`Date`、`Error`等

- TypeScript 中的数据类型
  1. 以上 8 个
  2. 6 个新增数据类型 
     - `any`
     - `unknown`
     - `never`
     - `void`
     - `tuple`
     - `enum`
  3. 2 个自定义类型
     - `type`
     - `interface`

> **注意**：JavaScript 中的内置构造函数：`Number`、`String`、`Boolean` ，用于创建对应的包装对象，对内存不太友好，有很少使用。
>
> 因此，在使用 TypeSript 时尽量使用小写的 `number`、`string`、`boolean`

```typescript
let str: string;
str = 'hello';
str = new String('hello');
// 不能将类型“String”分配给类型“string”。
// “string”是基元，但“String”是包装器对象。如可能首选使用“string”。ts(2322)
```

```javascript
"use strict";
const num = new Number(1);
// 字面量可以直接调用
console.log(num.valueOf()); 
```

```typescript
let str1: string = 'hello';

let str2: String;
str2 = new String('hello');

console.log(typeof str1); // string
console.log(typeof str2); // object
```

1. **原始对象** 和 **包装对象**

   - **原始类型**：`number`、`string`、`boolean` 是简单数据类型，内存占用少，处理速度快。

   - **包装类型**：`Number`、`String`、`Boolean` 对象，是复杂数据类型，内存占用大，少用。

2. **自动装箱**：必要时自动将原始类型包装成对象，方便调用方法或访问属性

   ```typescript
   // 自动装箱
   let str = 'hello';
   
   // 如：当需要访问str.length属性时
   let size = (function () {
       // 1. 自动装箱：创建一个临时的String对象包装原始字符串
       let tempStringObject = new String(str);
       // 2. 访问String对象的length属性
       let lengthValue = tempStringObject.length;
       // 3. 销毁临时对象，返回属性值
       return lengthValue;
   })();
   console.log(size); // 5
   ```

## 常用类型

### any

`any`：任意类型。将变量设置为 `any`，意味着放弃对该变量的类型检查

- 显式 `any`
- 隐式 `any`：没有明确变量的类型，TS 主动推导为 `any`

```typescript
// 显式 any
let a: any;
// 均不警告
a = 100;
a = 'hello';
a = false; 

// 隐式 any
let b;
```

> **注意**：`any` 类型的变量可以赋值个任意类型的变量

```typescript
let a: any;
a = 9;

let b: string;
b = a;
console.log(b); // 9
```

### unknown

`unknown`：**未知类型**。安全的 `any`，适用于不确定具体的类型

1. `unknown` 使用前会强制进行类型检查，提供更强的安全性

   ```typescript
   let a: unknown;
   a = 9;
   
   let b: string;
   b = a; // 不能将类型“unknown”分配给类型“string”。ts(2322)
   ```

   ```typescript
   // 第一种: 类型判断
   if (typeof a === 'string') {
       b = a;
   }
   
   // 第二种: 断言
   b = a as string;
   
   // 第三种: 泛型
   b = <string>a;
   ```

2. 读取 `any` 时不会报错，而读取 `unknown` 时反之

   ```typescript
   let str1: any = 'hello';
   str1.toUpperCase();
   
   let str2: unknown = 'hello';
   str2.toUpperCase(); // “str2”的类型为“未知”。
   // 必须通过断言
   (<string>str2).toUpperCase(); // (str2 as string).toUpperCase();
   ```

### never

`never` ：任何值都不是。简而言之：不能有值。`undefined`、`null`、`''`、`0` 都不行

1. 几乎不用 `never`。直接使用 `never` 限制变量，没有意义

   当变量类型指定为 `never` 时，变量不能存储任何数据

2. `never` 通常是由 TS 推导出来的

   ```typescript
   let a: string = 'hello';
   
   if (typeof a === 'string') {
       console.log(a.toUpperCase());
   } else {
       console.log(a); // TS推断此处的a是never，没有任何一个值符合逻辑
   }
   ```

3. `never` 可用于限制函数的返回值

   ```typescript
   function throwError(str: string): never {
       throw new Error("程序异常退出" + str);
   }
   ```

### void

`void` 通常用于函数返回值声明。

1. 函数不返回任何值，调用者不依赖其返回值进行任何操作

   ```typescript
   function logMessage(msg: string): void {
       console.log(msg);
   }
   
   logMessage('Hello world!');
   ```

   > **注意**：函数并没有通过 `return` 指定返回值，即函数没有**显式返回值**，但有**隐式返回值** ( `undefined` )
   >
   > 即：`undefined` 是 `void` 的一种

   ```typescript
   // 显式返回
   function logMessage1(msg: string): void {
       console.log(msg);
       return;
   }
   
   function logMessage2(msg: string): void {
       console.log(msg);
       return undefined;
   }
   ```

2. `void` 和 `undefined`

   ```typescript
   // 显式返回
   function logMessage1(msg: string): void {
       console.log(msg);
   }
   
   let result = logMessage1('hello');
   if(result){} // 无法测试 "void" 类型的表达式的真实性。
   ```

   ```typescript
   function logMessage2(msg: string): undefined {
       console.log(msg);
   }
   let result = logMessage2('hello');
   if(result){} // 不报错
   ```

   `void` 是一个广泛的概念，表示 ' 空 '，`undefined` 是 `void` 的表现形式之一

   总结：

   1. 从语法上看：函数是返回 `undefined` 的
   2. 从语义上看：不应该关心函数的返回值，也不依赖返回值进行操作。即使返回 `undefined`

### object



### tuple

### enum







