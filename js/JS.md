# JavaScript

**目录**

- [变量](#变量)
- [标识符](#标识符)
- [number](#数值)
- [bigInt](#bigint)
- [string](#字符串)
- [boolean](#布尔值)
- [null](#null)
- [undefined](#undefined)
- [symbol](#symbol)
- [类型转换](#类型转换)
- [算术运算符](#算术运算符)
- [赋值运算符](#赋值运算符)
- [单目运算符](#一元的正负)
- [自增和自减](#自增和自减)
- [逻辑运算符](#逻辑运算符)
- [空值合并运算符](#空值合并运算符)
- [关系运算符](#关系运算符)
- [相等运算符](#相等运算符)
- [条件运算符](#条件运算符)
- [运算符优先级](#运算符的优先级)
- [代码块](#代码块)
- [流程控制语句](#流程控制语句)
- [循环语句](#循环语句)
- [对象](#对象)
- [原型](#原型)
- [旧类](#旧类)
- [类](#类)
- [new 运算符](#new)
- [函数](#函数)
- [箭头函数](#箭头函数的-this)
- [高阶函数](#高阶函数)
- [闭包](#闭包)
- [数组](#数组)
- [数组遍历](#数组遍历)
- [数组方法](#数组方法)
- [数组去重](#数组去重)
- [排序](#冒泡排序)
- [rest 参数](#rest-参数)
- [箭头函数](#箭头函数的-this)
- [作用域](#scope)
- [window 对象](#window)
- [严格模式](#严格模式)

**HelloWorld**

```javascript
console.log('Hello World!');
```

**书写位置**：

1. 网页内部的 `script` 标签内
2. 外部 `.js` 文件
3. 指定属性中，如 `button`、`a`

**语法：**

1. 多行注释
   - `/**/`
   - `shift` + `alt` + `a`

2. 单行注释：
   - `//`
   - `Ctrl` + `/`

   折叠代码：`// #region` - `// #endregion`

3. 严格区分大小写

4. 多个空格和换行会被忽略

5. 以分号 ( `;` ) 结尾

## 变量

**字面量**：值

**变量**：存储字面量。对字面量的描述

**变量声明**：`let`、`const`、`var`

> **注意**：变量不存储任何值，而是存放的内存地址！

**常量**：使用 `const` 关键字声明的变量，常量只能赋值一次

```javascript
const PI = 3.1415926;
```

## 标识符

**标识符**：自主命名的部分，就称标识符。如：函数名、变量名、类名

1. 只能是字母、数字、下划线 ( `_` ) 、`$`
2. 不能以数字开头
3. 不能是关键字或保留字，也不使用内置的函数或类名
4. 驼峰命名
   - 变量名：首字母小写，每个单词开头首字母大写
   - 类名：首字母大写，每个单词开头首字母大写
5. 常量的字母全大写

## 类型

- `number`
- `bigInt`
- `string`
- `boolean`
- `null`
- `undefined`
- `symbol`

> **注意**：尽量避免使用构造函数创建对应的包装对象

**类型检查**：`typeof` 运算符。返回值的数据类型，返回的是**字符串**

### 数值

`Number`：整数、浮点数

- `Infinity`：正无穷
- `NaN`：特殊数值。表示非法数值。不等于任何值，包括本身

- `MAX_VALUE`：最大值。`1.7976931348623157e+308`
- `MIN_VALUE`：最小值。`5e-324`

**进制**：

- 二进制：`0b` 或 `0B`
- 八进制：`0o` 或 `0O`
- 十六进制：`0x` 或 `0X`

### `BigInt`

`BigInt`：大整数

- 表示比较大的整数
- 以 `n` 结尾，可以表示范围无限大 ( 根据内存范围而言 )

### 字符串

`string`：使用单引号或双引号创建字符串

**转义字符：**

- `\"`：表示 `"`
- `\'`：表示 `'`
- `\\`：表示 `\`
- `\t`：表示制表符
- `\n`：表示换行符

**模板字符串：** 使用反引号 <code>``</code> 表示模板字符串

- 跨行
- 嵌入变量

```javascript
let name = 'JS';
console.log(`Hello ${name}`); // Hello JS
```

### 布尔值

`boolean`：表示布尔值，`true` 和 `false`

###  `null`

`null`：空对象

> **注意**：使用 `typeof` 检查 `null` 时会返回 `object`

### `undefined`

`undefined`：未定义。当声明一个变量未赋值返回 `undefined`

### `symbol`

`symbol`：符号。用于创建对象的唯一标识

## 类型转换

> **思考**：**类型转换函数**转换的数据和**构造函数创建的包装类对象**是同类型的数据吗？
>
> - 不是。包装类型在运算时会自动转回原始值，但本质不是同类型的数据

### 字符串

1. `toString()`：方法
2. `String()` 函数
3. `变量+''`

### 数值

1. `Number()` 
   - 字符串
     - 数字字符串：直接转换
     - 非数字字符串：返回 `NaN`
     - 空串或空格：返回 `0`
   - 布尔值
     - `true` 返回 `1`
     - `false` 返回 `0`
   - `null` 返回 `0`
   - `undefined` 返回 `NaN`

2. `parseInt()`：字符串转整数
   - 从左往右转读取字符串，直到字符串中止
   - 对数字取整
   - 第二个可选参数，表示进制：2~36
3. `parseFloat()`：字符串转浮点数
4. `+`

### 布尔值

1. `Boolean()`：将其他类型转布尔值

   - 数字：
     - `0` 或 `NaN` ： `false`
     - 其余为 `true`

   - 字符串
     - 空串：`false`
     - 其余为 `true`

   - `null` 和 `undefined` ：`false`

   - 对象：`true`

2. `!!`

## 运算符

### 算术运算符

- `+`：加法
- `-`：减法
- `*`：乘法
- `/`：除法
- `**`：幂运算
- `%`：求模 ( 取余 )

> **注意**：
>
> - 除了加法运算符以外，其他运算的**操作数为非数值**时，会先转数值再运算
>
> - **隐式类型转换**：`变量+''` 可以直接转换成字符串类型，原理与 `String()` 函数相同

### 赋值运算符

- `=`：赋值运算符

- `??=`：空值合并运算符。`x ??= y` 等价于当 `x` 为 `null` 或 `undefined` 时， `x = y`

  ```javascript
  // 等价于
  if(x === null || x === undefined) {
      x = y;
  }
  ```

- `+=`：`x += y` 等价于 `x = x + y`

- `-=`：`x -= y` 等价于 `x = x - y`

- `*=`：`x *= y` 等价于 `x = x * y`

- `/=`：`x /= y` 等价于 `x = x / y`

- `%=`：`x %= y` 等价于 `x = x % y`

- `**=`：`x **= y` 等价于 `x = x ** y`

### 一元的正负

- `+`：将操作数转数值类型
  - 负数：正数
  - 字符串
    - 非数字：`NaN`
    - 数字：返回数字
  - 布尔值
    - `true`：`1`
    - `false`：`0`
  - `null`：`0`
  - `undefined`：`NaN`
  - 对象
    - 具有 `ValueOf()` 返回该数字
    - 具有 `toString()` 转成可转成数字的字符串再返回数字
    - 上述两种都失败，返回 `NaN`
  - `BigInt`：抛出 `TypeError`
- `-`：取反

### 自增和自减

- `++`：原来变量立刻加 `1`
  - 前自增 ( `a++` ) ：返回自增前的值
  - 后自增 ( `++a` ) ：返回自增后的值

- `--`：原来的值立刻减 `1`
  - 前自增 ( `a--` ) ：返回自减前的值
  - 后自增 ( `--a` ) ：返回自减后的值

### 逻辑运算符

- `!`：非。对布尔值进行取反。

  - `true`：`false`
  - `false`：`true`

  > **注意**：如果对非布尔值进行取反，转成布尔值后再取反。就可以利用这个特性对非布尔值的数据进行转换布尔值

- `&&`：与

  - 当左右两侧都为 `true`， 返回 `true`
  - 短路：
    - 如果第一个值为 `false`，返回第一个值
    - 如果第一个值为 `true`，返回第二个值

- `||`：或

  - 当左右两侧有一侧为 `true`， 返回 `true`
  - 短路：
    - 如果第一个值为 `false`，返回第二个值
    - 如果第一个值为 `true`，返回第一个值

### 空值合并运算符

`??` ：当一个值既不是 `null` 或 `undefined` ，就返回一个已定义的值

```javascript
let result = a ?? b; .// a ??= b;
// 等价于
let result = (a !== null && a !== undefined) ? a : b;
```

> `??` 与 `||`
>
> - `||` 无法区分 `false`、`0`、空字符串 `""`、`null`、`undefined`
> - 如：`0` 可以作为一个有效值，但 `||` 无法判断，所以引入了 `??`

### 关系运算符

检查两侧关系是否成立

- `>`：大于
- `>=`：大于等于
- `<`：小于
- `<=`：小于等于

> 注意：
>
> - 如果两侧是非数值，会先转数值进行比较
> - 如果两侧是字符串，则不会转数值，而是比较字符的 Unicode 编码

### 相等运算符

- `==`：相等运算符
  - 比较时，会将两个值转成相同的类型进行比较
  - `null` 和 `undefined` 比较时，返回 `true`
  - `NaN` 不等于任何值，包括自身
- `===`：全等运算符
  - 比较时，不会将两个值转成相同的类型进行比较
  - `null` 和 `undefined` 比较时，返回 `false`
- `!=`：不等
- `!==`：不全等

### 条件运算符

`?`：条件运算符

**语法**：`条件表达式 ? 表达式1 : 表达式2`

### 运算符的优先级

1. 先乘除，后加减

2. 使用 `()` 提升优先级

## 代码块

使用 `{}` 声明代码块，对代码进行分组

`let` 和 `var`

- `let` 具有块级作用域
- `var` 不具有块级作用域

## 流程控制语句

1. 条件判断语句
2. 条件分支语句
3. 循环语句

### `if`

`if(条件语句) {}`

- 如果结果为 `true`，执行 `if` 语句；如果为 `false`，不执行
- 如果代码只有一句，可以直接 `return` 不写 `{}`
-  如果 `if` 语句中的表达式不是布尔值，会先转布尔值，再运算

### `if...else...`

`if(条件语句) {} else {}`

- 如果结果为 `true`，执行 `if` 语句
- 如果为 `false`，执行 `else if` 语句
- 如果条件都为 `false`，执行 `else` 语句

### `switch`

```pseudocode
switch(表达式) {
	case 表达式1:
		...
		break;
	case 表达式2:
		...	
		break;
	case 表达式3:
		...
		break;
	case 表达式4:
		...
		break;
	case 表达式5:
		...
		break;
    default:
    	...
    	break;
}
```

`switch` 表达式和 `case` 的表达式进行全等比较

- 如果结果为 `true`，执行当前 `case` 处的代码
- 如果结果为 `false`，向下比较其他的 `case`，直到 `true` 为止
- 如果所有都为 `false`，执行 `default` 处的语句

## 循环语句

1. `while`
2. `do...while`
3. `for`

### `while`

```pseudocode
while(条件表达式) {
	语句
}
```

1. 如果结果为 `true`，执行循环体，继续判断
2. 如果条件表达式的最终结果为 `false`，循环结束

> **注意**：如果条件表达式恒为 `true` 时，是死循环。可以在循环语句中添加判断，当执行次数到达条件时，``break`

### `do...while`

```pseudocode
do {
	语句
}while(条件表达式)
```

在执行循环前，会先执行一遍 `do` 的循环体

再进行 `while` 判断

> `do...while` 和 `while` 的区别：
>
> 1. `do...while` 是先执行后判断。至少执行一次
> 2. `while` 是先判断后执行

### `for` 

```pseudocode
for(初始化表达式; 条件表达式; 更新表达式) {
	语句...
}
```

1. 执行初始化表达式，初始化变量
2. 执行条件表达式，判断循环是否执行
3. 结果为 `true`，执行循环体
4. 执行更新表达式，更改初始化变量
5. 重复执行条件表达式，直到 `false` 停止

> 注意：
>
> 1. 初始化表达式，整个循环周期只会执行 1 次
> 2. `for` 循环中的三个表达式都可以省略
> 3. `let` 在 `for` 循环中声明变量是局部变量，只能在内部访问；`var` 声明的是变量，可以在 `for` 循环外部访问
> 4. 死循环：
>    - `while(1) {}`
>    - `for( ; ; ) {}`

**循环嵌套**：当外层循环执行一次，内层循环执行一个周期 ( n 次 )

`break` 和 `continue`：

- `break` ：终止循环
- `continue`：跳过此次循环

## 对象

对象是一种复合数据类型，相当于一个容器，用于存储各种不同的数据类型

**创建对象**：

- `let obj = Object();`
- `let obj = {};`

**添加属性**：`obj.属性名 = 属性值;`

**读取属性**：`obj.属性名`

- 如果读取不存在的属性，返回 `undefined`

**修改属性**：`obj.属性名 = 新值;`

当属性名比较特殊时，需要使用 `[]` 访问属性名

`.` 和 `[]` 区别

- 属性名：
  - `.` 只能访问有效命名的属性。如：必须以字母、数字、下划线 ( `_` )、`$` 开头
  - `[]`：可以是任意类型，包含空格、特殊字符、无效标识符
- 动态属性名：
  - `.`：属性名必须是字面量
  - `[]`：属性名可以是变量、表达式

### `for...in`

`for...in`：枚举属性

```javascript
for(let propName in obj) {
    console.log(propName, obj[propName]);
}
```

> **注意**：并不是所有的属性都可以枚举。如：符号添加的属性不可枚举

### 可变类型

**原始类型**：不可变类型

> 修改变量，只影响当前变量

**对象**：可变类型

> - 进行相等或全等比较时，比较的是内存的地址
> - 如果其他变量指向当前对象，修改对象时，相应指向对象的变量都会受到影响

**注意**：`const` 只禁止变量重新赋值，对于对象的修改不受影响

### 方法

**方法** ( method )：当一个对象的属性指向一个函数，该函数就是对象的方法，调用函数就是调用对象的方法

```javascript
let obj = {
    name: 'Jack',
    sayHello: function () {
        console.log(`hello, ${obj.name}`);
    }
};
obj.sayHello(); // hello, Jack
```

### 对象结构

**对象属性**：

1. 对象自身的属性
2. 原型对象 `prototype`：对象中的某些内容，会存储在原型对象中 ( `prototype` )
   - 对象中有一个属性 ( `__proto__` ) 用来存储原型对象
   - 原型对象也负责为对象存储属性：访问对象属性时，优先在自身中寻找；当该对象自身不包含该属性时，才会去原型中寻找
   - 在原型中的情况：
     - 类的方法
     - 主动向原型添加的方法

#### 原型

**访问原型对象**

- `对象.__proto__`
- `Object.prototype(对象)`

**原型对象中的数据**：

1. 对象中的数据 ( 属性、方法等 )
2. 对象的构造函数 ( `constructor` )

> **注意**：原型对象也有原型，构成一条原型链；根据对象复杂程度的不同，原型链的长度也不同。
>
> ```pseudocode
> // 类的原型链
> 实例 -> 类 -> Object -> null
> 
> // 对象的原型链
> 对象 -> Object -> null
> ```
>
> **原型链**：
>
> - 读取对象属性时，优先检查自身属性
>   - 如果自身存在属性，则使用，反之没有去原型对象中查找
>   - 如果原型对象中也不存在，再去原型的原型中查找
>   - 直到找到 `Object` 的原型：`null`，则返回 `undefined`
>
> **作用域链**：如果找不到变量，会直接报错

**原型的作用**

所有同类型对象的原型对象是一样的，这意味着同类型对象的原型链也是一样的。

- 原型是一个公共的区域，可以将该类的公共属性或方法存储在一个原型中，被所有同类的实例访问
- 继承是通过原型实现，子类的原型就是一个父类的实例。

> - 函数的原型链是什么样？
> - `Object` 的原型链是什么样？

#### 修改原型

1. 在原型中添加方法，修改后同类实例都可以访问该方法

   ```javascript
   class Person {
       constructor(name, age) {
           this.name = name;
           this.age = age;
       }
   }
   const p1 = new Person('Alice');
   const p2 = new Person('Jack');
   p1.__proto__.run = () => {
       console.log('keep running');
   }
   p2.run(); // keep running
   ```

   > 注意：不要通过实例去修改原型
   >
   > 1. 一个对象会影响其他同类对象，危险
   >
   > 2. 修改原型都需要创造实例，麻烦
   >
   > 3. 对象直接赋值新的原型，相当于把它的指针指向了一个新的原型，这样做没有意义
   >
   >    ```javascript
   >    const p = new Person();
   >    p.__proto__ = new Animal(); // 原型从Object变为了Animal
   >    ```

2. 最好通过类的 `prototype` 属性访问实例的原型

   ```javascript
   Person.prototype.run = () => {
       console.log('Keep running!');
   }
   ```

   **优点**：无需创建实例即可完成对类的修改

   注意：

   1. 不要手动修改原型
   2. 不要通过实例对象修改，要通过类修改
   3. 通过 `类.prototype` 属性修改
   4. 不要给 `prototype` 属性赋值

#### `instanceof`

`instanceof`：检查一个对象是否是另一个对象的实例

> - `instanceof` 检查的是该原型链上是否有该类的实例，如果存在，就返回 `true`
>
> - `Object` 是所有对象的原型，任何对象和 `Object` 进行 `instanceof` 运算都会返回 `true`

```javascript
class Animal { }
class Dog extends Animal { }
const d = new Dog();

console.log(d instanceof Dog); // true
console.log(d instanceof Animal); // true
console.log(d instanceof Object); // true
```

```pseudocode
dog -> Animal -> Object
```

#### `in` 、 `hasOwnProperty()` 和 `hasOwn()`

- `in`：使用 `in` 运算符检查对象或原型链中是否具有指定的属性

- `hasOwnProperty()`：检查对象本身是否具有指定的属性，不检查原型链

```javascript
let obj = { a: 1 };
console.log('a' in obj); // true
console.log('toString' in obj); // true

console.log(obj.hasOwnProperty('a')); // true
console.log(obj.hasOwnProperty('toString')); // false
```

`Object.hasOwn(obj, prop)`：建议用此方法替代 `hasOwnProperty()`，检查对象自身是否包含某个属性

```javascript
console.log(Object.hasOwn(obj, 'a')); // true
console.log(Object.hasOwn(obj, 'toString')); // false
```

## 面向对象

OOP ：面向对象，一切皆为对象，所有的操作都通过对象来完成

特点：**封装**、**继承**和**多态**

### 旧类

早期 JS 中，直接使用函数定义类

- 直接调用 `xxx()` 是一个普通函数
- 通过 `new xxx()` 调用函数，是一个构造函数

```javascript
function Person(name, age) {
    // 构造函数, this 表示新建对象
    this.name = name;
    this.age = age;

    // 方法、静态属性、静态方法 建议写在原型中
    // this.sayHello = () => {
    //     console.log(`hello ${this.name}`);

    // }
}
const p = new Person('Jolyne', 18);
console.log(p); // Person {name: 'Jolyne', age: 18}


// 方法
// 这里的方法不能使用箭头函数, this会指向window对象
Person.prototype.sayHello = function () {
    console.log(`hello ${this.name}`);
}
p.sayHello(); // Hello Jolyne

// 静态属性
Person.staticProperty = ''

// 静态方法
Person.staticMethod = function () { }
```

代码太过分散，通常使用立即执行函数定义类

```javascript
var Person = (function () {
    function Person(name, age) {
        // 构造函数
        this.name = name;
        this.age = age;
    }

    // 方法
    Person.prototype.sayHello = function () {
        console.log(`hello ${this.name}`);
    }

    // 静态属性
    Person.staticProperty = ''

    // 静态方法
    Person.staticMethod = function () { }

    return Person;
})();

const p = new Person('Jolyne', 18);
console.log(p); // Person {name: 'Jolyne', age: 18}

p.sayHello(); // Hello Jolyne
```

**继承**

继承，只需要对象的父类赋值给对象的原型

```javascript
var Animal = (function () {
    function Animal() { }
    return Animal;
}
)();
var Cat = (function () {
    function Cat() {

    }
    // 继承, 就是将父类赋值给对象的原型
    Cat.prototype = new Animal();
    return Cat;
}
)();

var cat = new Cat();
console.log(cat); /* Cat -> Animal -> Object */
```

### 类

`class`：类是对象的模板，对象的属性和方法可以直接定义在类中

- 使用同一个类创建的对象就是同类对象，通过 `instanceof` 检查对象是否是同一个类创建的

- 如果一个对象是某个类创建的实例，那这个对象就是这个类的实例

**类名**：大驼峰命名法

- `class 类名 {}`
- `const 类名 = class {}`

`constructor()` 初始化对象

**实例化**：`new 类名()`，会自动调用 `constructor()` 方法

```javascript
class Person {
    constructor(name) {
        this.name = name;
    }
    // 类方法
    sayHello() {
        console.log(`hello, ${this.name}`);
    }
}
const p = new Person('Jack');
p.sayHello(); // hello, Jack
```

#### 属性

`static` 用来声明静态属性和静态方法，**实例不能访问**静态属性和静态方法，只有**类本身**可以访问

```javascript
class Person {
    static staticProp = '静态属性';
    static staticMethod() {
        return '静态方法';
    }
    constructor() {

    }
}
const p = new Person();
console.log(p.staticProp); // undefined
console.log(p.staticMethod); // undefined

console.log(Person.staticProp); // 静态属性
console.log(Person.staticMethod()); // 静态方法
```

`this` 的指向:

- `static` 创建的静态方法，this 指向当前类
- 实例方法指向当前实例

```javascript
class Person {
    static staticMethod() {
        return this;

    }
    constructor() {

    }
    sayHello() {
        return this;
    }

}
console.log(Person.staticMethod()); // 返回构造函数

const p = new Person();
console.log(p.sayHello()); // 返回实例对象p
```

#### 封装

- **私有化数据**。将需要保护的数据私有化，只在内部使用，确保数据安全。
- 提供 `setter` 和 `getter` 方法。控制属性的读写权限，对方法中的属性值进行验证

**私有属性**：用下划线 ( `_` ) 表示；ES2019 中用 `#` 表示。表示该属性不能从外部直接访问或修改

 ```javascript
class Person {

    constructor(name) {
        this.name = name;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

}

let p = new Person("John");
console.log(p.name); // John
p.name = 'Alice';
console.log(p.name); // Alice

// ES2019
class Person {
    #name
    constructor(name) {
        this.#name = name;
    }

    get name() {
        return this.#name;
    }

    set name(value) {
        this.#name = value;
    }

}

let p = new Person("John");
console.log(p.name); // John
p.name = 'Alice';
console.log(p.name); // Alice
 ```

#### 多态

通过相同接口或方法进行不同操作，多态通常是继承和接口

- **方法重写**：重写父类的方法，提供特定的实现，将根据对象类型执行相应实现
- **方法重载**：JavaScript 不支持方法重载，但可以通过检查参数数量或类型来表现在单个方法内部实现不同的行为
- **鸭子类型**：如果对象拥有相同的属性和方法，那么就被认为是相同的类型，而不管实际构造函数是什么
- **抽象类和接口**：JavaScript 中没有抽象类和接口机制，TypeScript 中有。尽管如此，可以创建抽象方法 ( 即没有实现的方法 ) 的类去模拟，让子类实现。

- **混合 ( Mixins )**：混合就是将一个类组合到另一个类。通过复制方法，如：`Object.assign()` 实现

```javascript
class Animal {
    speak() {
        console.log('Animal make a sound.');
    }
}

class Dog extends Animal {
    // 重写
    speak() {
        console.log('Dog barks');
    }
}

class Cat extends Animal {
    speak() {
        console.log('Cat meows');
    }
}
// 多态: 通过相同接口调用不同的实现
const animals = [new Dog(), new Cat(), new Animal()];
animals.forEach((animal) => { animal.speak() });
/* 
Dog barks
Cat meows
Animal make a sound. */
```

#### 继承

继承就是通过 `extends` 关键字通过一个类扩展到另一个类，可以在现有功能中添加新的功能

```javascript
class Animal {
    constructor(name) {
        this.speed = 0;
        this.name = name;
    }
    run(speed) {
        this.speed = speed;
        console.log(`${this.name} runs with speed ${this.speed}`);
    }
}
class Rabbit extends Animal {
    hide() {
        console.log(`${this.name} hides`);
    }
}
let r = new Rabbit('White');
r.run(5);
r.hide();
/* 
White runs with speed 5
White hides */
```

查找 `r.run` 方法

1. 查找对象 `r` 自身 ( 没有 `run` )
2. 查找它的原型，`Rabbit.prototype` ( 有 `hide` 没有 `run` )
3. 查找它原型的原型，即 `extends` 继承的 `Animal.prototype`，找到了 `run`

**方法重写**：允许子类调用父类的构造函数、方法或属性，重用父类的功能，同时添加或修改自身的行为

1. **调用构造函数**：使用 `super()` 调用父类的构造函数，并传递必要的参数
2. **调用父类方法**：使用 `super.methodName()` 调用父类的同名方法，重用的基础添加或修改行为

```javascript
class Animal {
    constructor(name) {
        this.speed = 0;
        this.name = name;
    }
    run(speed) {
        this.speed = speed;
        console.log(`${this.name} runs with speed ${this.speed}`);
    }
}
class Rabbit extends Animal {
    constructor(name, speed, age) {
        super(name, speed);
        this.age = age;
    }
    hide() {
        console.log(`${this.name} hides`);
    }
    // 重写父类方法: 并不希望完全替换父类方法, 想要在父类的方法基础之上调整或扩展功能
    run(speed) {
        super.run(speed);
        this.hide();
    }
}
let r = new Rabbit('White');
r.run(5);
/* 
White runs with speed 5
White hides */
```

### `new`

`new`：创建对象时使用的标识符

`new` 运算符的步骤：

1. 当使用 `new` 运算符调用一个函数时，会将这个函数作为构造函数使用

   创建一个普通的 js 对象 ( Object {} )，称其为新对象 ( `newInstance` )

   ```javascript
   function MyClass() {
       var newInstance = {};
   }
   ```

2. 将构造函数的 `prototype` 属性设置为新对象的原型

   ```javascript
   function MyClass() {
       var newInstance = {};
       newInstance.__proto__ = MyClass.prototype;
   }
   ```

3. 使用实参执行构造函数，并将新对象设置为函数的 `this`

   ```javascript
   function MyClass() {
       var newInstance = {};
       newInstance.__proto__ = MyClass.prototype;
   }
   var mc = new MyClass();
   ```

4. 如果构造函数返回的是一个非原始值，那么该值就将作为 `new` 运算符的返回值返回;

   如果构造函数返回的是一个原始值或没有指定返回值，那么就返回新对象

   ```javascript
   function MyClass() {
       var newInstance = {};
       newInstance.__proto__ = MyClass.prototype;
       return 1;
   }
   
   var mc = new MyClass();
   console.log(mc); // MyClass {}
   ```

在构造函数中执行步骤也是如此

```javascript
class MyClass {
    constructor() {

    }
}
const p = new MyClass();
// 1. 创建一个新对象
// 2. 将Person的prototype属性设置为新对象的原型
// 3. 执行constructor, 将新对象设置为constructor的this
// 4. 查看返回值, 如果没有设置返回值, 就返回新对象; 如果设置了返回值, 这个类就废了
```

### 总结

1. 面向对象的本质就是，所有操作都是通过对象进行
2. 面向对象编程：找对象、搞对象

3. 明确对象的作用：如何获取对象、如何使用对象的属性和方法

**对象的方法**：

- **内建对象**：由 ES 标准定义的对象，如：`Object`、`Function`、`String`、`Number` ...
- **宿主对象**：浏览器提供的对象，如：`BOM`、`DOM`
- **自定义对象**：开发人员自定义的对象

## 函数

- **声明式**

  ```javascript
  function fn() {
      // ...
  }
  ```

- **表达式**

  ```javascript
  const fn = function() {
      // ...
  }
  ```

- **箭头函数**

  ```javascript
  () => {
      // ...
  }
  ```

**参数**：

- **形式参数**
  - 定义函数，可以在函数内部指定数量不等的形式参数
  - 定义形参，就相等于声明变量但未赋值
- **实际参数**
  - 调用函数，在 `()` 内部可以传入数量不等的实际参数。
    1. 如果实参数量**等于**形参，则将实参赋值给形参
    2. 如果实参数量**小于**形参，则多余形参为 `undefined`
    3. 如果实参数量**大于**形参，则多余实参不会使用

**参数类型**：JS 不会检查参数类型，可以传递任何参数类型的值作为参数

**默认值**：定义型参时，可以指定默认值，在没有对应实参时生效

**箭头函数**：

- 参数只有一个时，可以省略 `()`

  ```javascript
  const fn = a => {
      return a;
  };
  console.log(fn(1)); // 1
  ```

- 返回语句只有一条时，可以省略 `{}` 和 `return`

  ```javascript
  const fn = a => a;
  console.log(fn(1));
  ```

### 对象作为参数

- **全局变量**：外部声明

  ```javascript
  let obj = {
      name: 'Jack'
  };
  function fn(a = obj) {
      console.log(a);
      a.name = 'Jolyne';
      console.log(a);
  }
  fn();
  fn();
  /* 
  { name: 'Jack' }
  { name: 'Jolyne' }
  { name: 'Jolyne' }
  { name: 'Jolyne' } */
  ```

- **局部变量**：内部声明的变量，函数执行完，释放空间

  ```javascript
  function fn(a = { name: 'Jack' }) {
      console.log(a);
      a.name = 'Jolyne';
      console.log(a);
  }
  fn();
  fn();
  /* 
  { name: 'Jack' }
  { name: 'Jolyne' }
  { name: 'Jack' }
  { name: 'Jolyne' } */
  ```

### 函数参数

将函数作为函数的参数传递

```javascript
function greet(name, callback) {
    const msg = `hello, ${name}`;
    callback(msg);
}
let printMsg = function (msg) {
    console.log(msg);
}
greet('JavaScript', printMsg); // hello, JavaScript
```

**箭头函数**：

```javascript
function greet(name, callback) {
    const msg = `hello, ${name}`;
    callback(msg);
}
greet('JavaScript', (msg) => {
    console.log(msg);
}); // hello, JavaScript
```

### 函数返回值

- 使用 `return` 关键字指定函数的返回值

  - 任何值都可以作为函数的返回值

  - 没有指定函数的返回值，将返回 `undefined`

  - `retrun` 一执行即表示函数的结束

### dubug

`debugger`：浏览器或 Node.js 遇到 `debugger` 语句时，会停止执行

1. `debugger`

   ```javascript
   function debugExample() {
       var x = 5;
       var y = 10;
       debugger; // 在这里暂停
       console.log(x + y);
   }
   debugExample();
   ```

2. 断点

3. `console` 对象：如，`console.log()`、`console.error()`、`console.warn()`

### 立即执行函数

立即执行函数 ( IIFE )：

- 匿名函数
- 一次性作用域

```javascript
(function () {
    console.log('hello world!');
}());
```

### 函数的 `this`

函数执行时，会传递一个隐藏参数，叫做 `this`

`this` 通常指向一个对象，根据调用方式的不同而不同

- 以**函数**的形式调用时，指向的是 `window`
- 以**方法**的形式调用时，指向的当前对象

### 箭头函数的 `this`

箭头函数是词法作用域，`this` 由上下文决定

大部分情况下指向 `window`

- 第一种解法：在普通函数中返回箭头函数，箭头函数的指向就是由方法决定

  ```javascript
  let obj = {
      sayHello() {
          let fn = () => {
              console.log(this);
          }
          return fn();
      }
  };
  obj.sayHello();
  ```

- 第二种解法：通过变量保存 `this`

  ```javascript
  let obj = {
      method: function () {
          let that = this;
          const fn = () => {
              console.log(that);
          }
          return fn();
  
      }
  };
  obj.method();
  ```

### Scope

**全局作用域**

- 全局作用域，在网页运行时创建，网页关闭时销毁
- 全局作用域声明的变量，可以在任意位置访问

**局部作用域**

- 块级作用域：局部作用域。代码执行时创建，执行完销毁
- 块级作用域声明的变量是局部变量，只在快的内部访问，外部无法访问

**函数作用域**

- 函数作用域是局部作用域。只在函数内部访问，函数外部无法访问
- 在函数调用时产生，调用结束后销毁
- 每次调用会产生一个新的函数作用域

**作用域链**

- 使用变量时，会在当前作用域中寻找，没有找到再往上一层的作用域中寻找
- 最终到全局作用域中寻找，如果全局作用域中不存在，则返回 `xxx is not defined`

### 高阶函数

- `map()`：传入一个函数依次作用于数组中的每个元素，并返回一个新数组

  ```javascript
  let arr = [1, 2, 3, 4, 5];
  let result = arr.map((x) => x ** 2);
  console.log(result); // (5) [1, 4, 9, 16, 25]
  
  // 传入包装对象String, 对数组的元素进行字符串转换的操作
  let arr = [1, 2, 3, 4, 5];
  let result = arr.map(String);
  console.log(result); // (5) ['1', '2', '3', '4', '5']
  ```

- `filter()`：传入一个函数依次作用于数组中的每个元素，符合条件的元素返回一个新数组

  ```javascript
  let arr = [1, 5, 10, 15, 20];
  let result = arr.filter((x) => x > 10);
  console.log(result); // (2) [15, 20]
  ```

- `reduce()`：数组归约，将结果汇总为单个返回值。可以传入第二个参数作为它的初始值

  ```javascript
  let arr = [1, 2, 3, 4, 5];
  // 求和
  let result = arr.reduce((x, y) => x + y, 0);
  console.log(result); // 15
  
  // 求积
  let result = arr.reduce((x, y) => x * y);
  console.log(result); // 120
  
  // 数组转整数
  let result = arr.reduce((x, y) => x * 10 + y);
  console.log(result); // 12345
  ```

- `sort()`

  ```javascript
  let arr = [1, 3, 2, 5, 4];
  // 升序
  arr.sort((a, b) => a - b);
  console.log(arr); // (5) [1, 2, 3, 4, 5]
  
  // 降序
  arr.sort((a, b) => b - a);
  console.log(arr); // (5) [5, 4, 3, 2, 1]
  ```

- `every()`：测试数组的每个元素是否满足条件

  ```javascript
  let arr = [1, 2, 3, 4, 5];
  let result = arr.every((x) => x > 0);
  console.log(result); // true
  ```

- `find()`：返回第一个满足条件的元素

  ```javascript
  let arr = [1, 5, 10, 15, 20];
  let result = arr.find((x) => x > 18);
  console.log(result); // 20
  ```

- `findIndex()`：返回第一个满足条件的元素索引

  ```javascript
  let arr = [1, 5, 10, 15, 20];
  let result = arr.findIndex((x) => x > 18);
  console.log(result); // 4
  ```

- `forEach()`：遍历数组。

  > **注意**：这个函数没有返回值，每次都会返回 `undefined`

  ```javascript
  let arr = [1, 5, 10, 15, 20];
  let result = arr.forEach((x) => console.log(x));
  console.log(result);
  /* 
  1
  5
  10
  15
  20
  undefined 
  */
  ```

### 闭包

## 数组

数组 ( *Array* ) ：是一种复合数据类型，数组中可以存储多个不同类型的数据

> 数组中存储的是有序的数据，数组中的每个数据都有一个唯一的 索引 ( *index* )，通过索引访问数据

**创建数组**

- 构造函数：`new Array()`

  ```javascript
  const arr = new Array(5).fill(0);
  console.log(arr); // [ 0, 0, 0, 0, 0 ]

- 数组字面量：`[]`

  ```javascript
  const arr = [1, 2, 3, 4, 5];
  ```

- `Array.from()` 方法

  ```javascript
  const set = new Set([1, 2, 3]);
  const arr = Array.from(set);
  console.log(arr); // [ 1, 2, 3 ]
  ```

**添加元素**

- `arr[index] = newVal;`

  ```javascript
  const arr = [1, 2, 3, 4, 5];
  arr[5] = 6;
  console.log(arr); // [ 1, 2, 3, 4, 5, 6 ]
  ```

- `arr[arr.length] = newVal`：数组末尾添加数据

  ```javascript
  let arr = [1, 2, 3, 4, 5];
  arr[arr.length] = 6;
  console.log(arr); // [ 1, 2, 3, 4, 5, 6 ]
  ```

- `concat(newVal)`：合并数组，不会改变原数组

  ```javascript
  let arr = [1, 2, 3, 4, 5];
  arr = arr.concat(6);
  console.log(arr); // [ 1, 2, 3, 4, 5, 6 ]
  ```

**读取元素**：`arr[index]`

`length` 属性：

- 获取数组的长度
- 获取的**实际长度**为  **最大索引值+1**
- `length` 属性可以更改，新增数组的属性变为 `undefined`，为避免非连续数组，导致性能问题，慎用

> **注意**：任何类型的元素都可以成为数组的元素，因此创建时尽量确保元素类型一致

### 数组遍历

- `for` 循环

  ```javascript
  let arr = [1, 2, 3, 4, 5];
  for (let i = 0; i < arr.length; i++) {
      console.log(arr[i]);
  }
  ```

  eg：打印类中的实例

  ```javascript
  class Person {
      constructor(name, age) {
          this.name = name;
          this.age = age;
      }
  }
  const arr = [
      new Person('Jack', 18),
      new Person('Jolyne', 20),
      new Person('Alice', 38)
  ];
  for (let i = 0; i < arr.length; i++) {
      if (arr[i].age < 20) {
          console.log(arr[i].name); // Jack
      }
  }
  ```

- `for-of`

  ```javascript
  let arr = [1, 2, 3, 4, 5];
  for (let item of arr) {
      console.log(item);
  }
  ```

- `for-in`

  ```javascript
  let arr = [1, 2, 3, 4, 5];
  for (let key in arr) {
      console.log(arr[key]);
  }
  ```

### 数组方法

- `Array.isArray()`：检查对象是否是一个数组

  ```javascript
  let arr = [1, 2, 3, 4, 5];
  console.log(Array.isArray(arr)); // true
  ```

- `at()`：根据索引获取数组中的指定元素，支持负索引 

  ```javascript
  let arr = [1, 2, 3, 4, 5];
  // 等价于arr[arr.length - 2]
  console.log(arr.at(-2)); // 4
  ```

- `concat()`：连接两个或多个数组。不会改变原数组

  ```javascript
  let arr = [1, 2, 3, 4, 5];
  let arr2 = [6, 7, 8];
  let arr3 = [9, 10, 11];
  let arr4 = arr.concat(arr2, arr3);
  console.log(arr4); // // (11) [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  ```

- `indexOf()`：返回数组元素第一次出现的位置

- `lastIndexOf()`：返回数组元素最后一次出现的位置

  ```javascript
  let arr = [1, 2, 3, 1];
  console.log(arr.indexOf(1)); // 0
  console.log(arr.lastIndexOf(1)); // 3
  ```

- `join()`：指定一个参数符号作为每个元素之间的分隔符，并将所有元素拼接成一个字符串。不会改变原数组

  ```javascript
  let arr = [1, 2, 3, 4];
  console.log(arr.join('-')); // 1-2-3-4

- `slice(startIndex, [endIndex])`：截取数组。不会改变原数组。

  - `startIndex`：起始位置。包含该位置

  - `endIndex`：( 可选 ) 结束位置。不包含该位置。可以为负数，省略则直接截取至末尾

    ```javascript
    let arr = [1, 2, 3, 4, 5, 6];
    // 从索引为1截取到索引为4
    console.log(arr.slice(1, 5)); // [ 2, 3, 4, 5 ]
    // 索引为负值, 等价于slice(1, 5)
    console.log(arr.slice(1, -1)); // [ 2, 3, 4, 5 ]
    // 从索引为1截取至末尾
    console.log(arr.slice(1)); // [ 2, 3, 4, 5 ]
    ```

    > **注意**：
    >
    > 数组本质上是对象，直接赋值是将另一个数组的指针指向上一个数组，上一数组发生变化，也会跟着变化
    >
    > ```javascript
    > let arr1 = [1, 2, 3, 4, 5, 6];
    > let arr2 = arr1;
    > console.log(arr1 === arr2); // true
    > ```
    >
    > 使用 `slice()` 对元素进行切片处理，将数组元素的指针指向同一个指针；因为 JavaScript 中的原始值只会在内存中存在一个，节省空间，使用索引改变数组元素时，只是开辟了一个新的原始值，并将数组元素的指针指向它
    >
    > ```javascript
    > arr2 = arr1.slice();
    > console.log(arr1 === arr2); // false
    > console.log(arr1[0] === arr2[0]); // true
    > ```

- `push()`：向数组末尾添加一个或多个元素，并返回新的数组长度

  ```javascript
  let arr = [1, 2, 3];
  arr.push(4, 5);
  console.log(arr); // [ 1, 2, 3, 4, 5 ]
  ```

- `pop()`：删除并返回数组最后一个元素

  ```javascript
  arr.pop();
  console.log(arr); // [ 1, 2, 3, 4 ]
  ```

- `unshift()`：向数组开头添加一个或多个元素，并返回新的数组长度

  ```javascript
  let arr = [1, 2, 3, 4, 5];
  arr.unshift(0);
  console.log(arr); // [ 0, 1, 2, 3, 4, 5 ]
  ```

- `shift()`：删除并返回数组第一个元素

  ```javascript
  arr.shift();
  console.log(arr); // [ 1, 2, 3, 4, 5 ]
  ```

- `splice()`：**删除**、**插入**、**替换**、**添加**等操作

  - 参数 1：删除元素的起始索引位置
  - 参数 2：删除的数量
  - 参数 3：插入的新元素


- `reverse()`：反转数组

  ```javascript
  let arr = [1, 2, 3, 4, 5];
  arr.reverse();
  console.log(arr); // [ 5, 4, 3, 2, 1 ]
  ```

- `filter()`：筛选出符合条件的元素

  ```javascript
  class Person {
      constructor(name, age) {
          this.name = name;
          this.age = age;
      }
  }
  const personArr = [
      new Person('Jack', 18),
      new Person('Jolyne', 20),
      new Person('Alice', 38)
  ];
  let result = personArr.filter((item) => item.age > 18);
  console.log(result); // Jolyne, Alice
  ```

**浅复制 ( shallow copy )**：对象的浅复制只是对浅层进行复制，并不复制内部的属性 ( 或元素 )

**深复制 (deep copy)**：深复制不仅复制对象本身，还复制其内部的属性和元素，性能问题，不常使用深复制

### 数组去重

`for` 循环

```javascript
let arr = [1, 2, 1, 3, 2, 2, 4, 5, 5, 6, 7];
// 1. 获取数组中的元素
for (let i = 0; i < arr.length; i++) {
    // 2. 获取当前值的后面一位
    for (let j = i + 1; j < arr.length; j++) {
        // 3. 判断两个数组是否相等
        if (arr[i] === arr[j]) {
            // 4. 出现重复元素, 删除后边元素
            arr.splice(j, 1);
            /* 
            当arr[i]和arr[j]相同时, 会删除arr[j]的位置, j+1变成j的位置, 由于j的位置被比较过了, 不会重复比较
            解决方法: 删除该位置元素, 将该位置的元素再比较一遍
            */
            j--;
        }
    }
}
console.log(arr); // (7) [1, 2, 3, 4, 5, 6, 7]
```

`indexOf(ele, [findIndex])`：第一个参数表示要查找的元素，第二个参数是开始搜索的下标	

```javascript
let arr = [1, 2, 1, 3, 2, 2, 4, 5, 5, 6, 7];
for (let i = 0; i < arr.length; i++) {
    const index = arr.indexOf(arr[i], i + 1);
    if (index !== -1) {
        arr.splice(index, 1);
        i--;
    }
}
console.log(arr); // (7) [1, 2, 3, 4, 5, 6, 7]
```

`for-of`

```javascript
let arr = [1, 2, 1, 3, 2, 2, 4, 5, 5, 6, 7];
const newArr = [];
for (let ele of arr) {
    if (newArr.indexOf(ele) === -1) {
        newArr.push(ele);
    }
}
console.log(newArr); // (7) [1, 2, 3, 4, 5, 6, 7]
```

### 冒泡排序

```javascript
let arr = [9, 1, 3, 2, 8, 0, 5, 7, 6, 4];
for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
        if (arr[j] > arr[j + 1]) {
            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
    }
}
console.log(arr); // (10) [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

### 选择排序

```javascript
let arr = [9, 1, 3, 2, 8, 0, 5, 7, 6, 4];
for (let i = 0; i < arr.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[minIndex]) {
            minIndex = j;
        }
    }
    if (minIndex !== i) {
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
}
console.log(arr); // (10) [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

### rest 参数

`...`：展开运算符。浅复制

```javascript
let arr1 = [1, 2, 3];
let arr2 = [...arr1];
console.log(arr1[0] === arr2[0]); // true
```

### `Object.assign()`

`Object.assign(targetObj, copyObj)`：复制对象。浅复制

```javascript
let obj1 = { a: 1, b: 2 };
let obj2 = { c: 3, d: 4 };
Object.assign(obj1, obj2);
console.log(obj1); // { a: 1, b: 2, c: 3, d: 4 }
console.log(obj1.c === obj2.c); // true
```

使用 *rest* 参数

```javascript
let obj1 = { c: 3, d: 4 };
let obj2 = { a: 1, b: 2, ...obj1, e: 5 };
console.log(obj1.c === obj2.c); // true
```

## window

`window` 对象：浏览器提供一个 `window` 对象，可以直接访问

- `window` 代表浏览器窗口，可以对浏览器的窗口进行各种操作，还负责 JS 的内置对象和浏览器宿主对象
- `window` 对象的属性可以直接访问
- 使用 `function` 声明的函数，也会作为 `window` 对象的方法

`var` 与 `let`

- `var` 声明的对象，不具有块级作用域，会作为 `window` 对象的属性保存

- `var` 没有块级作用域，但是有函数作用域

  ```javascript
  function fn() {
      var x = 10;
      return x;
  }
  console.log(x); // x is not defined
  ```

- `var` 具有变量提升，可以在执行前被访问；`let` 实际上也具有变量提升，但解释器禁止访问

  ```javascript
  console.log(a); // undefined
  var a = 10;
  ```

## 严格模式

全局：在脚本顶部写 `'use strict';`

如果是在 `class` 或 `module` 中，会自动启用严格模式

```javascript
"use strict";

// 代码以现代模式工作
```

