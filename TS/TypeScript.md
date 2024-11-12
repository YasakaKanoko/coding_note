# TypeScript

- [编译](#编译)
- [类型声明](#类型声明)
- [类型推断](#类型推断)
- [类型断言](#类型断言)
  - [双重断言](#双重断言)
  - [as const](#as-const)

- [类型](#类型)
  - [any](#any)
  - [unknown](#unknown)
  - [never](#never)
  - [void](#void)
  - [object](#object)
  - [tuple](#tuple)
  - [enum](#enum)
  - [type](#type)
  - [interface](#interface)
- [class](#类)
  - [属性修饰符](#属性修饰符)
    - [public](#public)
    - [protected](#protected)
    - [private](#private)
    - [readonly](#readonly)
  - [abstract class](#抽象类)
- [泛型](#泛型)
- [类型声明文件](#类型声明文件)

# 简介

1. TypeScript 是 JavaScript 的 **超集**
2. 新增 **静态类型检查**、**接口**、**泛型**等
3. TypeScript 需要先**编译**为 JavaScript ，再运行

> **静态类型检查**：运行时的代码错误前置

# 编译

注意：基于 Vue 或 React 通过 Webpack 或 Vite 进行配置可以跳过此步 

1. 新建  `.ts` 文件

2. 全局安装 TypeScript

   ```bash
   npm i typescript -g
   ```

3. 使用命令编译 `.ts` 文件

   ```bash
   tsc demo.ts
   ```

**自动化编译**

1. 创建 TypeScript 编译控制文件

   ```bash
   tsc --init
   ```

   1. 生成一个 `tsconfig.json` 配置文件，包含很多编译时的配置
   2. 可以手动更改编译的 js 版本，默认 `ES7`

       > **注意**：如果运行 `tsc --init` 遇到错误提示 " 无法加载文件 C:\Users\20681\AppData\Roaming\npm\tsc.pc1 "，这是由于 PowerShell 执行策略设置导致的。
       >
       > 1. **检查当前执行策略**：`Get-ExecutionPolicy`，如果执行策略是 `AllSigned` 或 `Restricted`，更改策略为 `RemoteSigned` 或 `Unrestricted`
       > 2. **更改执行策略**：`Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`
       > 
       >    - `RemoteSigned`：允许本地脚本运行，但需要从互联网下载的脚本进行签名。
       > 
       >    - `Unrestricted`：允许所有脚本运行，但会提示确认。
       > 
       > 4. 确认策略更改后，输入 `Get-ExecutionPolicy` 检查策略是否更改

2. 监视 `.ts` 文件变化

   ```bash
   tsc --watch # tsc -w
   ```

3. 优化：当编译出错时不生成 `.js` 文件

   ```bash
   tsc --noEmitOnError --watch
   ```

   > 修改配置文件 `tsconfig.json` 的   `"noEmitOnError": true`

`tsc` **参数**：

- `--outFile`：将多个 TS 脚本编译成一个 JS 脚本
- `--ourDir`：指定保存的目录
- `--target`：指定编译的 ES 版本

- `--noEmitOnError`：报错停止编译，不生成文件
- `--noEmit`：只检查类型是否正确

```json
{
    "compilerOptions": {
        "outFile": "./dist/bundle.js", // 所有文件都被编译到一个文件中
        "outDir": "./dist", // 所有文件编译到dist目录
        "target": "es2015", // 指定ES版本
        "noEmitOnError": true, // 编译出错不生成文件
        "noEmit":false // true不生成文件, false生成文件(默认)
    }
}
```

> `outFile` 的优先级大于 `outDir`，如果设置了 `outFile` 会忽略 `outDir`
>
> `noEmit` 的优先级大于 `noEmitOnError`，如果设置了 `noEmit` 会忽略 `noEmitOnError`

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

# 类型断言

类型断言 ( Type Assertion )：手动指定一个值的类型。覆盖类型检查

- `value as Type`
- `<Type>value`

> tsx 语法 React 的 jsx 语法的 ts 版中必须使用 `value as Type`

**场景**：

1. 对象的严格字面量检查，存在额外属性报错

   ```typescript
   // 【警告】: 对象字面量只能指定已知属性，并且“y”不在类型“{ x: number; }”中。
   const p: { x: number } = { x: 0, y: 0 };
   
   // 修改
   const p: { x: number } =
       { x: 0, y: 0 } as { x: number };
   const p: { x: number } =
       { x: 0, y: 0 } as { x: number, y: number };
   ```

2. 类型断言可以**让错误的代码通过编译**。对象没有数组的方法，可以通过类型断言为数组，使用数组的方法。如：`length`

   ```typescript
   const data: object = {
       a: 1, b: 2, c: 3
   };
   console.log((data as Array<string>).length); // undefined
   ```

3.  `any` 和 `unknown` 的类型断言为其他类型，使其可以赋值

   ```typescript
   const value:unknown = 'Hello World';
   const s2:string = value; // 【警告】
   const s2:string = value as string;
   ```

**断言条件**：

值的实际类型和断言的类型必须满足：实际值可以断言为其父类型，也可以断言为其子类型

## 双重断言

断言成一个无关的类型：双重断言，第一次断言为 `unknown`

```typescript
const n = 1;
// <Type><unknown>expr 或 as unknown as type
const m: string = n as unknown as string;
```

## as const

`as const` ：告诉编辑器将表达式视为字面量类型，而不是提升为更通用的类型，主要用于创建只读对象和元组

- **阻止类型提升 ( Type Widening )**：阻止字面量推断类型。

  ```typescript
  const str = 'hello'; // 类型推断为: string
  const strConst = 'hello' as const; // 类型推断为'hello'
  ```

- **创建只读对象 ( Readonly Objects )**：整个**对象**属性变为**只读属性**，无法修改属性值。也可**断言对象的单个属性**

  ```typescript
  const obj = { name: 'John', age: 30 }; // 类型推断为: { name: string; age: number; }
  const objConst = { name: 'John', age: 30 } as const; // 类型推断为: { readonly name: "John"; readonly age: 30; }
  obj.age = 31; // 可以修改
  
  objConst.age = 31; // 【警告】: 无法为“age”赋值，因为它是只读属性。ts(2540)
  ```

- **创建只读元组 ( Readonly Tuples )**：数组字面量变为只读元组，无法修改元组元素，也不能添加或修改。

  ```typescript
  const arr = [1, 2, 3]; // 类型推断为: const arr: number[]
  const arrConst = [1, 2, 3] as const; // 类型推断为: const arrConst: readonly [1, 2, 3]
  
  arr.push(4); // 可以修改
  arrConst.push(4); // 【警告】: 类型“readonly [1, 2, 3]”上不存在属性“push”。ts(2339)
  
  arr[0] = 0; // 可以修改
  arrConst[0] = 0; // 【警告】: 无法为“0”赋值，因为它是只读属性。ts(2540)
  ```

> **注意**：
>
> 1. `as const` 只能应用于字面量，**不能应用于变量**。
> 2. `as const` **不能应用于表达式**
> 3. `expr as const` 前置形式：`<const>expr`

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

> **注意**：
>
> JavaScript 中的内置构造函数：`Number`、`String`、`Boolean` ，用于创建对应的包装对象，对内存不太友好，很少使用。
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

> `object` 和 `Object` 实际中使用较少，因为范围太大

- `object`：**非原始类型**，可存储对象、函数、数组等，**限制范围广泛**，**实际中使用较少** 

  ```typescript
  let a: object;
  
  // 对象
  a = {};
  // 数组
  a = [1, 2, 3, 4, 5];
  // 函数
  a = function () { };
  // 包装类对象
  a = new String('123');
  // 类
  class Person { };
  a = new Person();
  
  // object不能存储【原始类型】, 以下会【警告】
  a = 1; // 不能将类型“number”分配给类型“object”。
  a = true; // 不能将类型“boolean”分配给类型“object”。
  a = 'hello'; // 不能将类型“string”分配给类型“object”。
  a = null; // 不能将类型“null”分配给类型“object”。
  a = undefined; // 不能将类型“undefined”分配给类型“object”。
  ```

- `Object`：所有可以调用 `Object` 方法的类型，如：`toString()`。简单来说，除了 `undefined` 和 `null` 以外任何值

  ```typescript
  let a: Object;
  
  // 对象
  a = {};
  // 数组
  a = [1, 2, 3, 4, 5];
  // 函数
  a = function () { };
  // 包装类对象
  a = new String('123');
  // 类
  class Person { };
  a = new Person();
  // number
  a = 1; 
  // boolean
  a = true; 
  // string
  a = 'hello';
  
  // Object不能存储【null】和【undefined】, 以下会【警告】
  a = null; // 不能将类型“null”分配给类型“object”。
  a = undefined; // 不能将类型“undefined”分配给类型“object”。
  ```

**声明对象类型**

1. **限制对象类型**

   - 在 `{}` 限制属性的类型

     ```typescript
     let person: { name: string, age: number }
     ```

   - 属性名称后加上 `?` 表示可选属性

     ```typescript
     let person: { name: string, age?: number }
     ```

   - 可以使用**逗号** ( `,` )、**分号** ( `;` )、**换行**作为分隔

     ```typescript
     // 逗号
     let person: { name: string, age?: number }
     
     // 分号
     let person: { name: string; age?: number }
     
     // 换行
     let person: {
         name: string
         age?: number
     }
     ```

   - 不能给对象中没有的属性赋值

     ```typescript
     // 【警告】对象字面量只能指定已知属性，并且“gender”不在类型“{ name: string; age?: number | undefined; }”中。
     person = { name: 'Jack', gender: 'male' };
     ```

2. **索引签名**：允许对象定义**任意数量的属性**，**键**和**类型**是**可变的**，用于：**描述不确定的属性(具有动态属性的对象)**

   `[key: string]: any`

   ```typescript
   let person: {
       name: string
       age?: number
       [key: string]: any // 索引签名, 单词可以使用index、key等其他单词
   }
   person = {
       name: 'Jack',
       age: 18,
       gender: 'male'
   }
   ```

**声明函数类型**

TS 中使用

1.  `=>` 在声明函数表达式时，表示**函数类型**，描述**参数类型**和**返回类型**
2. `=>` 在定义箭头函数表达式，表示箭头函数

```typescript
let count: (x: number, y: number) => number;
count = (x, y) => {
    return x + y;
}

// 等价于【箭头函数】
let count = (x: number, y: number) => x + y;
```

**声明数组类型**

1. 数组字面量：`类型[]`
2. 数组类 + 泛型：`Array<类型>`

```typescript
let arr1: string[];
let arr2: Array<string>;
arr1 = ['a', 'b', 'c'];
```

### tuple

元组 ( `tuple` )：一种特殊的**数组类型**，存储**固定数量**的元素，每个元素的**类型是已知的且可以不同**

- `?`：表示可选元素
- `rest` 参数：表示任意数量的某种类型的元素

```typescript
// 表示第一个参数必须是string类型, 第二个参数必须是number类型
let arr1: [string, number]
arr1 = ['hello', 1];

// 表示第一个参数必须是string类型, 第二个参数是可选的【如果存在, 则必须是boolean类型】
let arr2: [string, boolean?]
arr2 = ['hello', true];

// 第一个参数必须是number类型, 后面参数是任意数量的string类型
let arr3: [number, ...string[]];
arr3 = [1, 'a', 'b', 'c'];
```

### enum

枚举 ( `enum` ) ：定义**一组命名常量**，增强代码可读性和可维护性，提供类型安全

1. **数字枚举**：枚举成员的默认值从 0 开始自动递增，也可以手动指定成员的值

   **反向映射**：可以**通过值来获取成员名称**

   ```typescript
   enum Color {
       Red, // 0
       Green, // 1
       Yellow // 2
   }
   ```

   手动指定值

   ```typescript
   enum Color {
       Red = 1, // 1
       Green, // 默认值为2
       Yellow = 5 // 5
   }
   ```

2. **字符串枚举**：枚举成员值必须是字符串字面量

   ```typescript
   enum Color {
       Red = 'red',
       Green = 'green',
       Yellow = 'yello'
   }
   let myColor: Color = Color.Green;
   console.log(myColor); // green
   ```

3. **常量枚举**：特殊的枚举类型，使用 `const` 关键字定义，**编译时内联**，即枚举**成员引用**替换为**实际值**，而不生成额外的枚举对象。减少代码量，提升性能

   ```typescript
   const enum Color {
       Red,
       Green,
       Blue
   }
   console.log(Color.Red);
   ```

   编译生成的 `.js` 文件

   ```javascript
   "use strict";
   console.log(0 /* Color.Red */);
   ```

### type

`type` 可以为任意类型创建别名，增加可读性，方便类型复用和扩展

- **创建类型别名**

  ```typescript
  type StringArray = string[];
  let myArray = ['Hello', 'World'];
  ```

- **联合类型 ( Union Types )**：一个值可以是几个类型的一种。用 `|` 表示

  ```typescript
  type stringOrNumber = string | number;
  let myVal: stringOrNumber = 'Hello World';
  myVal = 123;
  
  type Gender = 'Male' | 'Female';
  function logGender(str: Gender) {
      console.log(str);
  }
  logGender('Male'); // Male
  ```

- **交叉类型 ( Interface Types )**：一个值必须同时满足多种类型，通常用于对象类型。用 `&` 表示

  ```typescript
  type Area = {
      width: number,
      height: number
  };
  type Address = {
      address: string,
      cell: number,
      tel: number
  };
  
  type House = Area & Address;
  const house: House = {
      width: 75,
      height: 100,
      address: 'Kangawa',
      cell: 7,
      tel: 110
  }
  ```

  > **注意**：交叉类型对于**原始类型**，会被推断为 `never`
  
  **特殊的** `type`：当**类型声明**的函数返回值为 `void`，TypeScript **不会严格要求函数返回值为空** ( 原返回值应为 `undefined` 或 `void` )
  
  ```typescript
  type LogFunc = () => void;
  
  // 【允许返回非空值】
  const f1: LogFunc = function () {
      return 1;
  }
  const f2: LogFunc = () => 1;
  ```
  
  > **原因**：`Array.prototype.push` 的返回值是一个数字，而 `Array.prototype.forEach()` 期望回调函数的返回类型是 `void`
  >
  > 换而言之，`forEach()` 回调函数的返回值是 `undefined`，当箭头函数简写时回调函数函数体 `push` 的返回值是一个数字 
  >
  > ```typescript
  > const src = [1, 2, 3];
  > const dst = [0];
  > 
  > src.forEach((el) => dst.push(el));
  > ```

### interface

接口 ( `interface` )：**定义结构**。作用于**类**、**对象**、**函数**，确保类型安全

> **注意**：`interface` **只能定义格式，不包含任何实现**

- **定义类**

  ```typescript
  interface PersonInterface {
      name: string,
      age: number,
      speak(n: number): void
  }
  class Person implements PersonInterface {
      constructor(
          public name: string,
          public age: number
      ) { }
      speak(n: number) {
          for (let i = 0; i < n; i++) {
              console.log(`我叫${this.name}, ${this.age}岁`);
          }
      }
  }
  const p1 = new Person('Tom', 18);
  p1.speak(3); // 打印三次: 我叫Tom, 18岁
  ```

- **定义对象**

  ```typescript
  interface User {
      name: string,
      // 只读属性
      readonly gender: string,
      // 可选属性
      age?: number,
      run: (n: number) => void
  }
  const user: User = {
      name: 'Jack',
      gender: 'male',
      age: 18,
      run(n) {
          console.log(`跑了${n}m`);
      }
  }
  ```

  > `readonly`：只读属性
  >
  > `?`：可选属性

- **定义函数**

  ```typescript
  interface CountInterface {
      (a: number, b: number): number
  }
  const count: CountInterface = (x, y) => {
      return x + y;
  }
  ```

- **接口继承**：接口之间可以继承，实现代码复用

  ```typescript
  interface PersonInterface {
      name: string,
      age: number,
  }
  interface StudentInterface extends PersonInterface {
      gender: string
  }
  const stu: StudentInterface = {
      name: 'Jack',
      age: 18,
      gender: 'Male'
  }
  ```

- **接口自动合并 ( 可重复定义 )**

  ```typescript
  interface PersonInterface {
      name: string,
      age: number,
  }
  interface PersonInterface {
      gender: string
  }
  const person: PersonInterface = {
      name: 'Jack',
      age: 18,
      gender: 'Male'
  }
  ```

  **总结**：

  1. **定义对象格式**：描述数据模型、API 响应格式、配置对象......
  2. **类的契约**：规定一个类实现的属性和方法
  3. **自动合并**：用于第三方库，大型项目中使用

> `interface` 与 `type`：
>
> - **相同点**：两者都可以用于定义**对象结构**，许多场景中可以相互替换
> - **不同点**：
>   - `interface`：更专注定义**对象**和**类**的结构，支持**继承**、**合并**
>   - `type`：定义**类型别名**、**联合类型**、**交叉类型**，不支持继承、合并 

# 类

```typescript
class Person {
    // 属性声明
    name: string
    age: number

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
    
    speak() {
        console.log(`我叫${this.name}, 今年${this.age}岁`);
    }
}
```

> **属性声明**：类的成员变量声明，表示类所具有的属性及类型
>
> **构造函数参数声明**：用于接收外部传入的值及执行时的类的属性

```typescript
class Person {
    constructor(public name: string, public age: number) { }
    
    speak() {
        console.log(`我叫${this.name}, 今年${this.age}岁`);
    }
}

const p1 = new Person('Jolyne', 18);
console.log(p1); // Person {name: 'Jolyne', age: 18}
p1.speak(); // 我叫Jolyne, 今年18岁
```

> **属性修饰符**：`public` 不仅**声明参数**，**并自动将参数作为类的属性**，**不必在类中单独声明属性**

**类的继承**

```typescript
class Student extends Person {
    constructor(name: string, age: number, public grade: string) {
        super(name, age);
    }
    
    // 重写speak()
    override speak() {
        console.log(`我叫${this.name}, ${this.age}岁, 今年${this.grade}`);
    }
}

const s1 = new Student('Kim', 20, 'High School');
console.log(s1); // Student {name: 'Kim', age: 20, grade: 'High School'}
s1.speak(); // 我叫Kim, 20岁, 今年High School
```

### 属性修饰符

| 修饰符      | 含义     | 规则                                          |
| ----------- | -------- | --------------------------------------------- |
| `public`    | 公开的   | **类内部**、**子类**、**类外部**访问 ( 默认 ) |
| `protected` | 受保护的 | **类内部**、**子类**访问                      |
| `private`   | 私有的   | **类内部**访问                                |
| `readonly`  | 只读属性 | 属性无法修改                                  |

#### public

`public` 修饰符表示属性可以在类的内部和外部访问。默认情况下，类的属性都是 `public`。

```typescript
class Person {
    constructor(public name: string) { }
    public greet(): void {
        // 在【类内部】访问public修饰的属性
        console.log(`Hello, my name is ${this.name}.`);
    }
}

class Student extends Person {
    study() {
        // 在【子类】访问public修饰的属性
        console.log(`Person的 ${this.name} 被子类Student访问`);
    }
}

const p1 = new Person("Alice");
// 在【类外部】访问public修饰的属性
console.log(p1.name);
p1.greet(); 
```

#### protected

`protected` 修饰符表示属性可以在类的内部和子类中访问，但外部无法访问。

```typescript
class Person {
    constructor(
        protected name: string,
        protected age: number
    ) { }

    protected getDetails() {
        // 【protected属性】在【类内部】被访问
        return `我叫${this.name}, ${this.age}岁`
    }
}

const p1 = new Person('Alice', 18);
// 【protected属性】不能在【类外部】被访问
p1.name; // 【警告】: 属性“name”受保护，只能在类“Person”及其子类中访问。ts(2445)
// 【protected方法】不能在【类外部】被访问
p1.getDetails(); // 【警告】: 属性“getDetails”受保护，只能在类“Person”及其子类中访问。ts(2445)

class Student extends Person {
    study() {
        // 【protected方法】可以在子类中被访问
        this.getDetails(); // 我叫Alice, 18岁
        // 【protected属性】可以在子类中被访问
        console.log(`${this.name}在子类被访问`);
    }
}

const s1 = new Student('Alice', 18);
s1.study(); // Alice在子类被访问
```

#### private

`private` 修饰符表示属性只能在类的内部访问，外部无法访问。

在公共方法中无法访问

```typescript
class Person {
    constructor(private age: number) {
    }

    private getAge(): number {
        return this.age; // 可以在类内部访问
    }
}

const p = new Person(30);
// 【警告】: 属性“getAge”为私有属性，只能在类“Person”中访问。ts(2341)
p.age;
p.getAge();
```

#### readonly

`readonly` 定义只读属性，一旦属性被初始化，就不能再修改，可用于**类的属性**、**接口属性**、**数组属性**

```typescript
class Person {
    constructor(
        public readonly name: string,
        public readonly age: number) {
    }
}
const p1 = new Person('Alice', 30);
p1.name = 'Jack'; // 【警告】: 无法为“name”赋值，因为它是只读属性。ts(2540)

// 数组
const nums: readonly number[] = [1, 2, 3];
nums.push(4); // 【警告】: 类型“readonly number[]”上不存在属性“push”。ts(2339)
```

### 抽象类

**抽象类** 是一种**无法被实例化**的类，通常用于定义类的**基础结构和行为**，类中可以写**抽象方法**，也可以写**具体实现**，主要为其派生类提供一个**基础结构**，要求其派生类**必须实现**其中的抽象方法

**简化**：抽象类**不能被实例化**，其意义是**类的模板**，其**抽象方法**必须被子类**重写**

```typescript
abstract class Package {
    // 构造函数
    constructor(public weight: number) { }
    // 抽象方法
    abstract calculate(): number;
    // 具体方法
    printPackage() {
        console.log(`包裹重量: ${this.weight}kg, 运费: ${this.calculate()}元`);
    }
}

class StandardPackage extends Package {
    constructor(
        weight: number,
        public unitPrice: number
    ) { super(weight) }
    calculate(): number {
        return this.weight * this.unitPrice;
    }
}

const s1 = new StandardPackage(10, 5);
s1.printPackage(); // 包裹重量: 10kg, 运费: 50元
```

**总结**：

1. **定义通用接口**：为一组相关类定义通用行为 ( 方法或属性 )
2. **提供基础实现**：为抽象类中的某些方法或为其提供基础实现，派生类可以继承这些实现
3. **确保关键行为**：强制派生类实现一些关键行为
4. **共享代码逻辑**：当多个类需要共享部分代码时，避免代码重复

> `interface` 与 **抽象类**：
>
> - **相同点**：都可以定义**类的格式**
> - **不同点**：
>   - **接口**：**只能描述结构，不能有任何实现方法，一个类可以实现多个接口**
>   - **抽象类**：既可以包含**抽象方法**，也可以包含**具体方法**，一个类**只能继承一个**抽象类

# 泛型

泛型允许定义函数、类或接口时，使用类型参数表示**未指定类型**，这些参数在**使用时**才被指定为**具体类型**

泛型可以让同一段代码适用于多种类型，同时仍保持类型安全性。

- **泛型函数**：使用 `<T>` 表示泛型 ( 字母自定义 )，设置泛型后可以在调用时指定类型

  ```typescript
  function logData<T>(data: T) {
      console.log(data);
  }
  logData<number>(100);
  logData<string>('Hello world!');

- **泛型可以有多个**

  ```typescript
  function logData<T, U>(data1: T, data2: U): T | U {
      return Date.now() % 2 ? data1 : data2;
  }
  logData<number, string>(100, 'Hello world!');
  logData<string, boolean>('Hello world!', true);
  ```

- **泛型接口**

  ```typescript
  interface PersonInterface<T> {
      name: string,
      age: number,
      extraInfo: T
  }
  type JobInfo = {
      title: string
  }
  let p: PersonInterface<JobInfo> = {
      name: 'Tom',
      age: 18,
      extraInfo: {
          title: 'Auth'
      }
  }
  ```

- **泛型约束**

  ```typescript
  interface PersonInterface {
      name: string,
      age: number,
  }
  function logPerson<T extends PersonInterface>(info: T): void {
      console.log(`我叫${info.name}, ${info.age}岁`);
  }
  logPerson({ name: 'Jack', age: 20 });
  ```

- **泛型类**

  ```typescript
  class Person<T> {
      constructor(
          public name: string,
          public age: number,
          public extraInfo: T
      ) { }
      speak() {
          console.log(`我叫${this.name}, ${this.age}岁`);
          console.log(this.extraInfo);
      }
  }
  const p1 = new Person<number>('Tom', 30, 20);
  ```

# 类型声明文件

类型声明文件是 TS 中的特殊文件，以 `.d.ts` 作为扩展名，作用是为现有的 JS 文件**提供类型信息**，使 TS 能在访问 JS 库或模块时进行**类型检查**和**提示**

实际开发中，类型声明文件通常存放在 `@types` 文件目录中，在 https://www.npmjs.com/ 中下载

- `demo.js`

  ```typescript
  import { add, mul } from './demo.js'
  console.log(add(3, 4));
  console.log(mul(4, 5));
  ```

- `demo.d.ts`

  ```typescript
  declare function add(a: number, b: number): number;
  declare function mul(a: number, b: number): number;
  export { add, mul };
  ```

- `index.html`

  ```html
  <script type="module" src="./TS/index.js"></script>
  ```

> **注意**：
>
> - `script` 标签导入时，`type` 必须指定为 `module`，表示指定为 ES 模块，在模块作用域运行，可以使用 `import` 或 `export`导入或导出；`type` 指定为 `text/javascript` 或省略 `type` 属性，表示指定全局作用域运行，不具有导入/导出机制
> - 在浏览器中导入脚本时， `tsconfig.json` 中的 `module` 必须指定浏览器环境，即 `ES6`；而非 Node 环境的 `commonjs`，且环境 `module` 需要与 `target` 兼容。

[↑回到顶部](#)
