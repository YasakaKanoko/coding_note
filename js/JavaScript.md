# JavaScript

[toc]



# 数值

整数与浮点数

1. 底层中的所有数字，不管是小数还是整数都是以 64 位浮点数存储

   ```javascript
   1 === 1.0; // true
   ```

2. 浮点数计算的值并不精确

   ```javascript
   0.1 + 0.2 === 0.3; // false
   
   0.3 / 0.1; // 2.9999999999999996
   
   (0.3 - 0.2) === (0.2 - 0.1); // false
   ```



## 精度

根据国际标准 IEEE 754；浮点数的 64 位二进制位，由左到右组成：

- 第 1 位：符号位，`0` 表示正，`1` 表示负
- 第 2 到第 12 位 ( 共 11 位 )：指数部分
- 第 13 位到第 64 位 ( 共 52 位 )：小数部分

总结：[-2^53^ + 1, 2^53^ - 1]

```javascript
Math.pow(2, 53); // 9007199254740992
```

64 位浮点数的指数部分长度有 11 个二进制位，指数部分的最大值：2^11^ - 1 = 2047，分出一半负数，数值范围：(2^-1023^, 2^1024^)

- 如果一个数大于等于 2^1024^ ，就会 " 正向溢出 "，返回 `Infinity`
- 如果一个数小于等于 2^-1075^ ( -1023 加上小数部分的 52 位)，就会 " 负向溢出 "，返回 `0` (无法表示比 `0` 更小的数，所以返回 `0` )

```javascript
Math.pow(2, 1024); // Infinity
Math.pow(2, -1075); // 0
```

eg：连续对 `0.5` 做 `25` 次方，使得结果无限趋近 `0` ，超出可示范围，直接转换为 `0`

```javascript
var x = 0.5;
for (var i = 0; i < 25; i++) {
    x = x * x;
}
console.log(x); // 0
```

## 最大最小值

提供 `Number` 对象的 `MAX_VALUE` 和 `MIN_VALUE` 属性，表示最大值和最小值

```javascript
Number.MAX_VALUE; // 1.7976931348623157e+308
Number.MIN_VALUE; // 5e-324
```

## 表示法

- 科学计数法：在 `e` 或 `E` 后跟上一个整数，表示数值的指数部分

  ```javascript
  123e3 // 123000
  123e-3 // 0.123
  -3.1E+12
  .1e-23
  ```

  1. 小数点前数字多于 21 位

     ```javascript
     1234567890123456789012 // 1.2345678901234568e+21
     ```

  2. 小数点后数组多于 5 位

     ```javascript
     0.0000003 // 3e-7
     ```

- 进制

  - 十进制：没有前缀
  - 八进制：`0O` 或 `0o` 前缀
  - 十六进制：`0x` 或 `0X` 前缀
  - 二进制：`0b` 或 `0B` 前缀

  注意：

  1. 默认情况下，会自动转为十进制

  2. 如果出现不属于该进制的数字，就会报错
  3. 前导 `0` 表示八进制，ES6 已废除

## 特殊值

- 正零和负零：在几乎所有场合下，正零和负零会被当成正常的 `0`

  ​	只有当 `+0` 和 `-0` 当成分母时，返回的值是不相等的

  ```javascript
  （1 / +0） === (1 / -0); // false
  ```

  因为除以正零返回正无穷 ( `+Infinity` ) ，除以负零得到负无穷 ( `-Infinity` )

- `NaN`：表示 " 非数字 "  (Not a Number)

  ```javascript
  5 - 'x';
  
  // 反余弦
  Math.acos(2); // NaN, x ∈ [-1, 1]
  // 求自然对数的log值
  Math.log(-1); // NaN, x > 0
  // 平方根
  Math.sqrt(-1); // NaN, x > 0
  
  0 / 0; // NaN
  ```

  注意：`NaN` 不是独立的数据类型，而是一个特殊的数值

  ```javascript
  typeof NaN; // 'number'
  ```

  运算规则：

  1. `NaN` 不等于任何值，包括本身

     ```javascript
     NaN === NaN; // false
     ```

  2. `indexOf(searchElement, startIndex)` 返回数组下标，否则返回 `-1`。`searchElement` 表示指定的元素，`startIndex` 表示从指定位置查找，省略则从第一位开始查找。内部采用严格相等运算符 ( `===` )

     ```javascript
     [NaN].indexOf(NaN); // -1
     ```

  3. 进行布尔运算时被当做 `false`

     ```javascript
     Boolean(NaN); // false
     ```

  4. `NaN` 与任何数 ( 包括自身 ) 进行运算，都返回 `NaN`

  5. ES6 中的指数运算符 ( `**` ) 是个例外

     ```javascript
     NaN ** 0; // 1
     ```

- `Infinity`：" 无穷 "

  - 正数过大，或负数太小

    ```javascript
    Math.pow(2, 1024); // Infinity
    ```

  - 非 `0` 数值除以 `0`

    ```javascript
    // 1. 当0除以0时, 返回 NaN	
    0 / 0; // NaN
    // 2. 当非0数值除以0时, 返回 Infinity
    1 / 0; // Infinity
    ```

  正无穷：`Infinity`，非零负数除以 `-0` 

  负无穷：`-Infinity`，非零正数除以 `-0`

  ```javascript
  Infinity === -Infinity; // false
  
  1 / -0; // -Infinity
  -1 / -0; // Infinity
  ```

  - `Infinity` 大于一切数值 ( 除了 `NaN` )，`-Infinity` 小于一切数值 ( 除了 `NaN` )
  - `Infinity` 与 `NaN` 参与比较时，总是返回 `false`

  四则运算：

  1. 和非零数字运算时，符合无穷数学计算规则

     ```javascript
     5 * Infinity; // Infinity
     5 - Infinity; // -Infinity
     Infinity * 5; // Infinity
     5 / Infinity; // 0
     ```

  2. `0` 乘 `Infinity` 返回 `NaN`；`0` 除 `Infinity` 返回 `0`；`Infinity` 除 `0` 返回 `Infinity`

     ```javascript
     0 * Infinity; // NaN
     0 / Infinity; // 0
     Infinity / 0; // Infinity
     ```

  3. `Infinity` 加或乘 `Infinity` 返回 `Infinity`

     ```javascript
     Infinity + Infinity; // Infinity
     Infinity * Infinity; // Infinity
     ```

  4. `Infinity` 减或除 `Infinity` ，返回 `NaN`

     ```javascript
     Infinity - Infinity; // NaN
     Infinity / Infinity; // NaN
     ```

  5. `Infinity` 在与 `null` 参与计算时，`null` 会自动转为 `0` 。同第2条

  6. `Infinity` 和 `undefined` 计算时，返回结果都是 `NaN`

## 全局方法

1. `parseInt()`：将字符串转为整数

   ```javascript
   parseInt('123'); // 123
   
   // 如果字符串头部含空格, 将自动去除
   parseInt("   81"); // 81
   
   // 如果参数不是字符串, 先转字符串
   parseInt(1.23); // 1 相当于 parseInt('1.23');
   
   // 按一个一个字符依次转换, 如遇非整数部分, 就返回已转好的部分
   parseInt(15e2); // 15
   
   // 如果第一个字符不能转数字(正负号除外), 返回 NaN
   parseInt('.3'); // NaN
   parseInt('+1'); // 1
   
   // 0x开头的字符按照16进制解析
   parseInt('0x10'); // 16
   
   // 0开头的字符按10进制解析
   parseInt('011'); // 11
   
   // 科学计数法的结果并不正确
   parseInt(1000000000000000000000.5) // 1
   // 等同于
   parseInt('1e+21') // 1
   
   parseInt(0.0000008) // 8
   // 等同于
   parseInt('8e-7') // 8
   ```

   - 第二个参数可以指定为解析值的进制，返回该值的十进制。范围 2~36

     - 参数不在2~36范围内，返回 `NaN`
     - 参数是 `0`、`undefined`、`null` 时，直接忽略

     ```javascript
     parseInt('1000', 10) // 1000
     parseInt('1000', 2) // 8
     parseInt('1000', 6) // 216
     parseInt('1000', 8) // 512
     ```

     - 只返回可以转换的数值。如果最高位无法转换，返回 `NaN`

       ```javascript
       parseInt('1546', 2) // 1
       parseInt('546', 2) // NaN
       ```

     - 第一个参数不是字符串，优先转字符串

       ```javascript
       parseInt(0x11, 36);
       // 等同于
       parseInt(String(0x11), 36);
       ```

     - 八进制的前缀 0

       ```javascript
       // 011被转为数字9, 不是二进制数
       parseInt(011, 2); // NaN
       
       // 这样将作为二进制处理
       parseInt('011', 2); // 3
       ```

       

2. `parseFloat()`：将字符串转为浮点数

   ```javascript
   parseFloat('3.14'); // 3.14
   ```

   - 科学计数法，进行相应转化

     ```javascript
     parseFloat('314e-2') // 3.14
     parseFloat('0.0314E+2') // 3.14
     ```

   - 不能转为浮点数的字符，则不再进行往后转换，返回已经转好的部分。

     ```javascript
     parseFloat('3.14more non-digit characters') // 3.14
     ```

   - 自动过滤字符串前导的空格。

     ```javascript
     parseFloat('\t\v\r12.34\n ') // 12.34
     ```

   - 第一个字符串不能转化为浮点数，返回 `NaN`

     ```javascript
     parseFloat([]) // NaN
     parseFloat('FF2') // NaN
     // parseFloat()会将空字符串转为NaN
     parseFloat('') // NaN
     ```

   - `parseFloat()` 转换的结果不同于 `Number()` 函数

     ```javascript
     parseFloat(true)  // NaN
     Number(true) // 1
     
     parseFloat(null) // NaN
     Number(null) // 0
     
     parseFloat('') // NaN
     Number('') // 0
     
     parseFloat('123.45#') // 123.45
     Number('123.45#') // NaN
     ```

   3. `isNaN()`：判断一个值是否为 `NaN`

      ```javascript
      isNaN(NaN); // true
      isNaN(123); // false
      ```

      只对数值有用，如果传入其他值，会先被转换为数值。

      传入字符串时，字符串会先转为 `NaN`，换而言之， `isNaN()` 结果为 `true` 的值，可能是字符串

      ```javascript
      isNaN("Hello"); // true 相当于isNaN(Number("Hello"))
      ```

      - 对于对象和数组，会先调用 `valueOf()` 方法在调用`toString()`，判断是否能解析为一个有效数值

        ```javascript
        isNaN(['xyz']); // true
        isNaN(['123']); // false
        ```

      - 对于空数组或对象返回 `true`

        ```javascript
        isNaN([]); // true
        isNaN({}); // true
        ```

        使用 `isNaN` 前，最好判断一下数据类型
   
        ```javascript
        function myIsNaN(value) {
            return typeof value === 'number' && isNaN(value);
        }
        ```
   
        > 判断 NaN 更好的方法是，利用 NaN 本身唯一且不等于自身的特点
   
        ```javascript
        function myIsNaN(value) {
            return value !== value;
        }
        ```
   
   4. `isFinite()`：返回一个布尔值，判断某个值是否为正常的值
   
      除了 `Infinity`、`-Infinity`、`NaN`、`undefined` 返回 `false` ，其余返回 `true`
   
      ```javascript
      isFinite(Infinity); // false
      isFinite(-Infinity); // false
      isFinite(NaN); // false
      isFinite(undefined); // false
      isFinite(null); // true
      isFinite(-1); // true
      ```
   
      

#  Operator

## void

`void` 执行表达式，但不返回任何值，或者说返回 `undefined`

```javascript
void 0; // undefined
void (0); // undefined
```

- 使用括号 `()` ，表示优先级更高

  ```javascript
  // 两种写法结果相同
  void 4 + 7;
  
  (void 4) + 7;
  ```

- 可以赋值

  ```javascript
  var x = 3;
  void (x = 5);
  console.log(x); // 5
  ```

**用途**：

- 在浏览器的书签 ( Bookmarklet )、超链接插入，防止网页跳转

  ```html
  <script>
  function f() {
    console.log('Hello World');
  }
  </script>
  <a href="http://example.com" onclick="f(); return false;">点击</a>
  ```

  > 点击链接后，先执行 `onclick` 的代码，由于 `onclick` 返回 `false`，所以不跳转

- `void` 替代以上写法

  ```html
  <a href="javascript: void(f());">点击</a>
  ```

**实例**：

当用户点击链接提交表单时，不跳转

```html
<a href="javascript: void(document.form.submit())">
  提交
</a>
```

## 逗号运算符

对于两个表达式求值，返回后一个表达式的值

```javascript
var x = 0;
var y = (x++, 10);
console.log('x = ' + x + ',' + ' y = ' + y); // x = 1, y = 10
```

**用途**：在返回一个值之前，进行一些辅助操作

```javascript
var value = (console.log("Hello"), true);
console.log(value); // Hello true
```

执行顺序：先执行逗号之前的操作，再返回逗号之后的值

## Operator Precedence

1. 优先级高的先执行，先乘除后加减

2. 比较运算符顺序：小于等于 ( `<=` ) 、全等 ( `===` )、或 ( `||` )、三元 ( `?:` ) 、赋值 ( `=` )

   ```javascript
   var x = 1;
   var arr = [];
   var y = arr.length <= 0 || arr[0] === undefined ? x : arr[0];
   console.log(y); // 1
   
   // 等同于
   var y = ((arr.length <= 0) || (arr[0] === undefined)) ? x : arr[0];
   ```

3. 括号 ( `()` ) 的优先级最高，用于提升优先级

   > - 括号不是运算符，不具有求值作用，只能改变优先级
   > - 将整个表达式放入括号中，没有任何意义
   > - 如果括号放在函数后面，则表示调用函数
   > - 语句不能放在括号中

   ```javascript
   var x = 1;
   (x) = 2; // 括号不具有求值作用, 这句话表示 1 = 2, 没有意义
   
   // 将表达式放在括号中, 没有意义
   var a = 1;
   var b = 2;
   sum = (a + b);
   console.log(sum); // 3
   
   // 放在函数后面, 表示调用
   function f() {
       return 1;
   }
   f(); // 1
   
   // 函数放在括号中, 返回函数本身
   (f); // function f(){return 1;}
   
   // 将语句放在括号中会报错
   (var a = 1) // SyntaxError: Unexpected token var
   ```

## 左结合、右结合

**左结合**：如果两个运算符具有相同优先级，按从左到右运算

**右结合**：如果两个运算符具有相同优先级，按从右到左运算

# 字符串

零个或多个字符，存放在单引号和双引号之中

> 由于 HTML 的属性值使用双引号，很多项目约束 JavaScript 只能使用单引号

1. 转义字符：加上反斜杠 `\` ，表示转义

2. 字符串只能写在一行，分行需要在尾部使用反斜杠

   ```	javascript
   var longString = 'Long \
   long \
   long \
   string';
   ```

3. 可以使用单引号拼接，将长字符拆分成多行书写

   ```javascript
   var longString = 'Long '
     + 'long '
     + 'long '
     + 'string';
   ```

   可以使用多行注释，形成多行字符串

   ```javascript
   (function () { /*
   line 1
   line 2
   line 3
   */}).toString().split('\n').slice(1, -1).join('\n')
   // "line 1
   // line 2
   // line 3"
   ```


## 模板/多行字符串

ES6 新增的多行字符串，用反引号 <code>``</code> 表示，相当于  <code>\n</code>

模板字符串：自动替换字符串中的变量。相当于普通的 `+` 字符串拼接

```javascript
let name = 'Jack';
let age = 22;
console.log(` ${name} ,${age} years old`); 
```

## 操作字符串

- `length`：字符串长度

  ```javascript
  let s = 'Hello';
  console.log(s.length); // 5
  ```

- 数组下标：索引从 `0` 开始

  ```javascript
  console.log(s[0]); // 'H'
  ```

  > 注意：字符串是不可变的，对于某个索引位置的赋值，不会改变原有字符串的内容

  ```javascript
  s[1] = 'b';
  console.log(s); // 'Hello'
  ```

- `toUpperCase()`：将字符串全部转为大写

  ```javascript
  let s = 'Hello';
  s = s.toUpperCase();
  console.log(s); // 'HELLO'
  ```

- `toLowerCase()`：将字符串全部转为小写

  ```javascript
  let s = 'Hello';
  s = s.toLowerCase();
  console.log(s); // 'hello'
  ```

- `indexOf(value, fromIndex)`：返回指定字符串首次出现的位置。未找到返回 `-1`

  - `value`：从字符串中要被查找的子串
  - `fromIndex`：可选值。表示索引位置，默认为 `0` 。如果索引值大于字符串长度，返回` -1`；如果索引值为负数，会将其视为 `0`

  ```javascript
  let s = 'hello';
  
  // 1. 默认情况。不带可选值
  console.log('h'); // 0
  
  // 2. 返回首次出现的位置
  console.log(s.indexOf('l')); // 2
  
  // 3. 未找到
  console.log(s.indexOf('world')); // -1
  
  // 4. fromIndex 为负数
  console.log(s.indexOf('o', -1)); // 4
  ```

- `substring(start, end)`：返回指定索引区间的子串 ( 左闭右开 )

  ```javascript
  let s = 'hello, world!';
  // [0, 5)
  console.log(s.substring(0, 5)); // hello
  ```

# 数组

数组 ( Array )， 按次序排列的一组值，索引编号从 `0` 开始，用方括号 `[]` 表示。

**特点：**

- 可以定义时赋值，也可以先定义后赋值
- 任何类型的数据 ( 包括函数、数组、对象 )，都可以放入数组中
- 如果数组中的元素还是数组，那就是多维数组
- 数组的本质是 `object`

**创建数组：**

1. `[]`：字面量
2. `new Array(num).fill(0)`：初始化为 `num` 个 `0` 的数组。(不推荐)

## 属性

- `length`：获取 Array 的长度。如果 `length` 赋一个新值，会直接改变 Array 的大小

  1. `length` 的最大值： 2^32^ - 1 位
  2. 如果人为设置的 `length` 一个小于当前成员个数的值，成员数量将自动减少至 `length` 设置的值
  3. 如果设置的 `length` 大于当前成员个数，成员数量会增加至设置的值，新增的位置会返回 `undefined`
  4. 清空数组：将 `length` 属性值设置为 `0`
  5. 如果 `length` 属性值为不合法值 ( 负数、字符串、大于等于 2^32^  ) ，报错 `RangeError: Invalid array length`
  6. 如果数组键名超出范围，该键名会自动转字符串

  ```javascript
  let arr = ['a', 'b', 'c'];
  arr.length = 6;
  console.log(arr); // ['a', 'b', 'c', undefined, undefined, undefined]
  ```

- `indexOf()`：搜索指定元素的位置。( 和字符串的 `indexOf()` 一样 )

  ```javascript
  let arr = [1, 2, 3, 4, 5];
  console.log(arr.indexOf(1)); // 0
  console.log(arr.indexOf(1, 1)); // -1
  ```

- `slice(begin, end)`：从一个数组中截取元素，返回一个新的数组。( 与字符串中的 `substring()` 对应 ) 。

  - `begin` ：开始下标。如果是负数，则从末尾开始。如果省略，则默认从 `0` 开始
  - `end` ：结束下标 ( 左闭右开 )。如果是负数，则从末尾开始。如果省略，则直接取到数组末尾

  - 如果不传任何参数，从头到尾截取所有元素，可以直接复制一个数组
  - 如果 `begin` 大于 `end`，返回空数组

  ```javascript
  let arr = [1, 2, 3, 4, 5];
  
  // 左闭右开
  arr.slice(1, 3); // [2, 3]
  
  // 省略 end
  arr.silce(2); // [3, 4, 5]
  
  // 负数
  arr.slice(-3, -1); // [3, 4]
  
  // begin > end
  arr.slice(3, 1); // []
  ```

- `push()`：在末尾添加若干元素

- `pop()`：删除末尾最后一个元素

- `unshift()`：头部添加若干元素

- `shift()`：删除头部第一个元素

  ```javascript
  let arr = [1, 2, 3, 4, 5];
  arr.push(6, 7); // [1, 2, 3, 4, 5, 6, 7]
  arr.pop(); // [1, 2, 3, 4, 5, 6]
  arr.unshift(0); // [0, 1, 2, 3, 4, 5, 6]
  arr.shift(); // [1, 2, 3, 4, 5, 6]
  ```

- `sort()`：排序

  ```javascript
  let arr = [5, 3, 4, 2, 1];
  arr.sort();
  console.log(arr); // [1, 2, 3, 4, 5]
  ```

- `reverse()`：反转

  ```javascript
  let arr = [5, 2, 3, 1];
  arr.reverse();
  console.log(arr); // [1, 3, 2, 5]
  ```

- `splice(index, num, items...)`：可以删除，也可以添加，也可以删除指定元素，再从指定索引处添加

  - `index`：(必需) 。整数，表示添加/删除的位置，使用负数从末尾处指定
  - `num`：(必需)。整数，表示删除的项目数量，`0` 表示不删除
  - `items...`：可选。在数组中新增元素。不指定此参数，只删除

  ```javascript
  let arr = [1, 2, 3, 4, 5];
  
  // 删除
  arr.splice(0, 2); 
  console.log(arr); // [3, 4, 5]
  
  // 插入: 在指定下标之前插入
  let arr = [1, 2, 3, 4, 5];  
  arr.splice(2, 0, 'red', 'green');  
  console.log(arr); // [1, 2, 'red', 'green', 3, 4, 5]
  
  // 替换
  let arr = [1, 2, 3, 4, 5];  
  arr.splice(2, 2, 'red', 'green');  
  console.log(arr); // [1, 2, 'red', 'green', 5]
  ```

  > 注意：
  >
  > 1. `splice()` 会直接修改原数组
  > 2. 如果 index 大于数组的索引范围，则从数组末尾添加内容
  > 3. 如果 `num > index` 之后的元素总数，`index` 之后的元素都会被删除
  > 4. 如果 `num` 为 `0` 或负数，则不移除元素，至少应添加一位

- `concat()`：将当前元素或数组和另一个数组拼接起来，返回一个新数组

  > 注意：
  >
  > 1. 不会修改原数组，而是返回一个新数组
  >
  > 2. 可以接收任意个元素或数组

  ```javascript
  let arr = [1, 2, 3];
  console.log(arr.concat(4, 5, [6, 7])); // [1, 2, 3, 4, 5, 6, 7]

- `join()`：将元素使用指定字符串连接，返回连接后的字符串

  ```javascript
  let arr = [1, 2, 3, 4, 5];
  arr.join('-'); // 1-2-3-4-5
  ```

 ## in

检查某个键名是否存在，适用于对象或数组

```javascript
let arr = [1, 2, 3, 4, 5];
console.log(2 in arr); // true
```

> 注意：
>
> 1. 键名是字符串，所以以上的 `2` 会先转字符串
> 2. 如果某个位置是空位，会返回 `false`

## 遍历

- `for ... in`：不仅适用于对象，也可以遍历数组。但它不仅会遍历数字键，也会遍历非数字键。( 不推荐 )

  ```javascript
  let a = [1, 2, 3];
  for (let i in a) {
      console.log(a[i]); // 1 2 3
  }
  // 非数字键
  a.foo = true;
  for (let key in a) {
      console.log(key); // 0 1 2 foo
  }
  ```

- `for` 循环

  ```javascript
  let a = [1, 2, 3];
  for (let i = 0; i < a.length; i++) {
      console.log(a[i]); // 1 2 3
  }
  ```

- `while` 循环

  ```javascript
  let a = [1, 2, 3];
  let i = 0;
  while (i < a.length) {
      console.log(a[i]); // 1 2 3
      i++;
  }
  ```

- 逆向遍历

  ```javascript
  let a = [1, 2, 3];
  let i = a.length;
  while (i--) {
      console.log(a[i]); // 3 2 1
  }
  ```

- `forEach()`：重写回调函数

  ```javascript
  let a = [1, 2, 3];
  a.forEach((x) => {
      console.log(x); // 1 2 3
  });
  ```

## 空位

两个逗号间没有值，就成为空位 ( hole )

注意：

1. 空位并不影响 `length`

   ```javascript
   let a = [1, ,3];
   console.log(a.length); // 3
   ```

2. 如果最后一个元素之后有逗号，不会产生空位

   ```javascript
   let a = [ , , ];
   console.log(a.length); // 2
   ```

3. 空位可以读取，返回 `undefined`

   ```javascript
   let a = [1, , 3];
   console.log(a[1]); // undefined
   ```

4. 使用 `delete` 删除元素时，会产生空位，对 `length` 没有影响

   ```javascript
   let a = [1, 2, 3];
   delete a[1];
   console.log(a[1]); // undefined
   console.log(a.length); // 3
   ```

5. 遍历( `forEach`、`for...in`、`Object.keys` )时空位可以被忽略，`undefined` 不能被忽略

   ```javascript
   // 空位
   var a = [, , ,];
   
   a.forEach(function (x, i) {
       console.log(i + '. ' + x); // 无输出
   })
   
   for (var i in a) {
       console.log(i); // 无输出
   }
   
   console.log(Object.keys(a)); // []
   
   // undefined
   var a = [undefined, undefined, undefined];
   
   a.forEach(function (x, i) {
       console.log(i + '. ' + x); 
       // 0. undefined
   	// 1. undefined
   	// 2. undefined
   })
   
   for (var i in a) {
       console.log(i);
       // 0
   	// 1
   	// 2
   }
   
   console.log(Object.keys(a)); // ['0', '1', '2']
   ```

## 类数组对象

如果一个对象的键名是正整数或 `0` ，且有 `length` 属性，那么该对象就是类数组对象 ( array-like object )

```javascript
let obj = {
    0: 'a',
    1: 'b',
    2: 'c',
    length: 3
};
```

> 注意：
>
> 1. 类数组对象并不是真正的数组，不能使用数组的方法
> 2. 类数组对象的根本特征：存在 `length` 属性，该 `length` 属性不是动态值，不会随着成员的变化而变化

典型的类数组对象：`arguments` 对象、DOM 元素集、字符串

```javascript
// arguments
function args() { return arguments; }
let arrayLike = args('a', 'b');
console.log(arrayLike.length); // 2
console.log(arrayLike instanceof Array); // false

// DOM
let el = document.getElementsByTagName('h3');
console.log(el.length); // 2
console.log(el instanceof Array); // false

// 字符串
let str = 'abc';
console.log(str.length); // 3
console.log(str instanceof Array); // false
```

可以使用 `call()` 调用数组的 `slice()` 方法到类数组对象身上，使其成为真正的数组

```javascript
let arr = Array.prototype.slice.call(arrayLike);
console.log(arr instanceof Array); // true
```

`call()` 的第一个参数是当前 `this` 所指向的对象，第二个参数是它从数组中借来的方法

```javascript
function logArgs(arguments) {
    Array.prototype.forEach.call(arguments, function (elem, i) {
        console.log(i + '. ' + elem);
    });
}
logArgs(arrayLike);
// 0. a
// 1. b

// 相当于
function logArgs(arguments) {
    for (let i = 0; i < arguments.length; i++) {
        console.log(i + '. ' + arguments[i]);
    }
}
logArgs(arrayLike);
// 0. a
// 1. b
```

> 注意：这种方式比原生的 `forEach` 慢，所以最好的方式是转成真正的数组再调用

```javascript
let arr = Array.prototype.slice.call('abc');
arr.forEach((i, elem) => {
    console.log(i + '. ' + elem);
});
// a. 0
// b. 1
// c. 2
```

# 对象

对象，由若干键值对组成的无序的数据集合，键名和键值直接用冒号 ( `:` ) 分隔

**键名**：成员的名称。又称 " 属性 ( property ) "

1. 键名的冒号可以省略，所有键名都是字符串 ( 自动转换 )。

2. 如果键名是纯数值，会自动转为字符串

3. **如果键名是不符合条件，则必须加上引号 ( 数字开头、含空格或运算符 )**

   ```javascript
   let obj = {
       '1p': 'Hello',
       'h w': 'Jack',
       'p+q': 'World'
   };
   ```

> 属性名的访问：通过 `.` 或 `['']` 操作符进行访问
>
> 如果键名规则的第3条，则必须使用 `['']` 这种方式访问

**键值**：成员的值。**属性值可以是任何数据类型**

1. 如果键值为一个函数，通常把这个属性称 " 方法 "，可以被调用
2. 如果键值是一个对象，那么就形成链式调用

## 删除属性

```javascript
// JavaScript 对象是动态类型, 可以自由添加或删除
let x = {
    name: 'xm'
};
console.log(x.age); // undefined
x.age = 18;
console.log(x.age); // 18
delete x.name;
console.log(x.name); // undefined
```

## 属性赋值

通过 `.` 或 `['']` 操作符进行赋值。允许属性的 " 后绑定 "

```javascript
let obj = {};
obj.foo = 'hello';
obj['bar'] = 'world';
```

## in 和 hasOwnProperty()

`in`：检测对象是否含某一属性

```javascript
let x = {
    name: 'xm'
};
console.log('name' in x); // true
console.log('age' in x); // false
```

> 注意：`in` 无法判断当前属性是不是通过继承得来的
>
> 如：`toString` 定义在 `object` 对象上，对象最终指向原形链上的 `object`

`hasOwnProperty()`：判断一个属性是自身拥有，而非继承得到

```javascript
console.log('toString' in x); // true
console.log(x.hasOwnProperty('toString')); // false
```

## with

操作同一个对象的多个属性

```javascript
let obj = {
    p1: 1,
    p2: 2
};
with(obj) {
    p1 = 4;
    p2 = 5;
};
// 相当于 
obj.p1 = 4;
obj.p2 = 5;
```

> 注意：`with` 的赋值操作，必须是当前已经存在的属性，否则会创建全局变量

```javascript
let obj = {};
with (obj) {
    p1 = 4;
    p2 = 5;
};
console.log(obj['p1']); // undefined
```

#  Map 和 Set

`Map` 和 `Set` 是 ES6 新增数据类型

```javascript
let m = new Map();
let s = new Set();
```

## Map

`Map` 是一组键值对结构，具有极快的查找速度

```javascript
let m = new Map([['Michael', 95], ['Bob', 75], ['Tracy', 85]]);
m.get('Michael'); // 95
```

`Map` 需要一个二维数组，或者初始化一个空 `Map` 

- `set()`：添加新的 `key-value`
- `has()`：查找是否存在 `key`
- `get()`：查找 `key` 对应的 `value`
- `delete()`：删除指定 `key`

```javascript
let m = new Map();
m.set('Adam', 67);
console.log(m.has('Adam')); // true
console.log(m.get('Adam')); // 67
m.delete('Adam');
console.log(m.get('Adam')); // undefined
```

一个 `key` 只能对应一个 `value`，后设置的 `value` 会替换 前面设置的 `value`

```javascript
let m = new Map();
m.set('Adam', 67);
m.set('Adam', 88);
console.log('Adam'); // 88
```

## Set

`Set` 是一组没有重复元素的集合，`Set` 会自动过滤重复元素

参数：一个数组或空 `Set`

```javascript
let s = new Set([1, 2, 3, 3]);
console.log(s); // Set(3) {size: 3, 1, 2, 3}
```

`add()`：添加元素到 `Set` 中。重复添加元素没有效果

`delete()`：删除元素

```javascript
let s = new Set([1, 2, 3]);
console.log(s); // Set(3) {size: 3, 1, 2, 3}

s.add(4);
console.log(s); // Set(4) {size: 4, 1, 2, 3, 4}

s.delete(3);
console.log(s); // Set(3) {size: 3, 1, 2, 4}
```

# iterable

## for...of

`for...of`：`Array`、`Map`、`Set` 属于 `iterable` 类型，可以使用 `for...of` 遍历

```javascript
let a = ['A', 'B', 'C'];
for (let i of a) {
    console.log(i);
}
// A
// B
// C

let s = new Set(['A', 'B', 'C']);
for (let i of s) {
    console.log(i);
}
// A
// B
// C

let m = new Map([[1, 'x'], [2, 'y'], [3, 'z']]);
for (let i of m) {
    console.log(i);
}
// (2) [1, 'x']
// (2) [2, 'y']
// (2) [3, 'z']
```

`Set` 和 `Map` 可以调用 `forEach()` 回调函数遍历，前三个参数分别为  `value`、`key`、Sequence ( `set` or `map` )

由于 `Set` 内部不重复的原因：`value` 和 `key` 都是元素本身

```javascript
let s = new Set(['A', 'B', 'C']);
s.forEach((value, key, set) => {
    console.log(`value is ${value}, key is ${key}, set.size is ${set.size}`);
});
// value is A, key is A, set.size is 3
// value is B, key is B, set.size is 3
// value is C, key is C, set.size is 3
```

```javascript
let m = new Map([[1, 'x'], [2, 'y'], [3, 'z']]);
m.forEach(function (value, key, map) {
    console.log(`value is ${value}, key is ${key}, map.size is ${map.size}`);
});
// value is x, key is 1, map.size is 3
// value is y, key is 2, map.size is 3
// value is z, key is 3, map.size is 3
```

如果不需要 `key` 、`map`/`set` 参数可以省略

# 函数

1. 声明式

   ```javascript
   function foo() {
       console.log('Hello world!');
   }
   ```

2. 表达式：匿名函数

   ```javascript
   const foo = function() {
       console.log('Hello world!');
   }
   ```

3. 箭头函数

   ```javascript
   const foo = () => {
       console.log('Hello world!');
   }
   ```

4. 构造函数

   ```javascript
   const foo = new Function('a', 'b', 'return a + b;');
   ```

5. 方法

   ```javascript
   const obj = {
       method: function() {
           console.log('Hello world!');
       }
   };
   obj.method();
   ```

6. 立即执行函数

   ```javascript
   (function() {
       console.log('Hello world!');
   })();
   
   // 箭头函数
   (() => {
       console.log('Hello world!');
   })();
   ```

传入参数数量多于函数内部定义的参数数量，不会影响函数的结果。少于则传入 `undefined`

对参数进行检查

```javascript
function foo(x) {
    if (typeof x !== 'number') {
        throw 'Not a number';
    }
    // ...
}
```

## arguments

`arguments` 是一个类数组对象，可以获得函数内部传入的所有参数，而不定义任何参数

```javascript
function foo(x) {
    for(let i = 0; i < arguments.length; i++) {
        console.log('arg' + i + '=' + arguments[i]);
    }
}
foo(10, 20, 30);
// arg0=10
// arg1=20
// arg2=30
```

```javascript
// 可以获得函数内部的所有参数, 以一个类数组的形式
function abs() {
    if (arguments.length === 0) {
        return 0;
    }
    let x = arguments[0];
    return x >= 0 ? x : -x;
}
console.log(abs()); // 0
console.log(abs(10)); // 10
console.log(abs(-10)); // 10

// 判断传入参数的个数: 假设b是可选参数, 就将b设置为 null
function foo(a, b, c) {
    if (arguments.length === 2) {
        c = b;
        b = null;
    }
    // ...
}
```

假设 `b` 是可选参数，通过 `arguments` 判断重新调整	参数并赋值

## rest

Rest 参数用于接收不定数量的参数，将这些参数收集到一个数组中

语法： `...参数名`

1. **收集多余参数**：调用时传递的参数超过声明参数的数量时，将多余的参数存放进数组中

2. **替代 arguments 对象**：`arguments` 是一个类数组对象，而 Rest 参数是一个真正的数组，可以直接使用数组的所有方法

注意事项：

1. 位置：Rest 参数必须是最后一个参数
2. 数量：一个函数只能有一个 Rest

```javascript
function foo(a, b) {
    let rest = [];
    if (arguments.length > 2) {
        for (let i = 2; i < arguments.length; i++) {
            rest.push(arguments[i]);
        }
    }
    // ...
}

// ES6以上简写
function foo(a,b,...rest) {
    // ...
}
```

参数未填满时，rest 会接收一个空数组

## return

由于行末自动添加分号机制：`return` 不能独占一行

```javascript
function foo() {
    return { name: 'foo' };
} 
foo(); // { name: 'foo' }
```

`return` 拆分

```javascript
function foo() {
    return // 这一行中 return 变为 return;
    	{ name: 'foo' };
} 
foo(); // undefined

// 正确写法
function foo() {
    return { 
        name: 'foo' 
    };
} 
foo(); 
```

## 解构赋值

传统做法：

```javascript
let array = ['hello', 'JavaScript', 'ES6'];
let x = array[0];
let y = array[1];
let z = array[2];
```

ES6：

```javascript
let [x, y, z] = ['hello', 'JavaScript', 'ES6'];
```

1. 如果数组本身仍有嵌套，注意嵌套层次保持一致

   ```javascript
   let [x, [y, z]] = ['hello', ['JavaScript', 'ES6']];
   ```

2. 解构赋值可以忽略某些元素

   ```javascript
   let [, , z] = ['hello', 'JavaScript', 'ES6']; 
   ```

3. 从对象中抽离属性，也可以使用解构赋值

   ```javascript
   let obj = {
       name: 'x',
       age: 18
   };
   let { name, age } = obj;
   console.log(`x is ${name}, y is ${age}`); // x is x, y is 18
   ```

4. 嵌套对象的解构赋值，需要保证对应层次的一致性

   ```javascript
   let person = {
       name: 'xx',
       age: 20,
       gender: 'male',
       passport: 'G-12345678',
       school: 'No.4 middle school',
       address: {
           city: 'Beijing',
           street: 'No.1 Road',
           zip: '100001'
       }
   };
   let { name, address: { city, zip } } = person;
   console.log(`name is ${name}, city is ${city}, zip is ${zip}`); // name is xx, city is Beijing, zip is 100001
   // address并不是传入的变量, 而是为了获取city、zip的属性值
   console.log(`address ${address}`); // ReferenceError: address is not defined
   ```

5. 解构赋值可以使用默认值

   ```javascript
   let person = {
       name: 'xx',
       age: 20,
       gender: 'male',
       passport: 'G-12345678'
   };
   let { name, single = true } = person;
   console.log(`name = ${name}, single = ${single}`); // name = xx, single = true
   ```

6. 变量已经声明，再次赋值会报错，原因是 `{}` 会被当做块处理，解决方法：用小括号 `()`

   ```javascript
   // 声明变量:
   let x, y;
   // 解构赋值:
   {x, y} = { name: 'xx', x: 100, y: 200};
   // 语法错误: Uncaught SyntaxError: Unexpected token '='
   
   // 正解
   ({x, y} = { name: 'xx', x: 100, y: 200});
   ```

场景：

1. 交换两个变量

   ```javascript
   let x = 1, y = 2;
   [x, y] = [y, x];
   ```

2. 获取当前的域名和路径

   ```javascript
   let { hostname: domain, pathname: path } = location;
   ```

3. 当函数接收一个对象作为参数时，可以直接解构赋值将属性绑定到变量中

   ```javascript
   function buildDate({ year, month, day, hour = 0, minute = 0, second = 0 }) {
       return new Date(`${year}-${month}-${day} ${hour}:${minute}:${second}`);
   }
   ```

   ```javascript
   console.log(buildDate({ year: 2017, month: 1, day: 1 })); 
   // Sun Jan 01 2017 00:00:00 GMT+0800 (中国标准时间)
   ```


## 方法

当给对象绑定一个函数时，就称作方法。

方法和函数的区别：方法要比函数多一个 `this` 关键字

```javascript
let obj = {
    name: 'Jolyne',
    birth: 2001,
    age: function() {
        let y = new Date().getFullYear();
        return y - this.birth;
    }
};
// 调用
obj.age(); // 23
```

`this` **的指向是上层作用域**，也就是对象

如果将函数单独调用，`this` 会指向全局对象 `window`，返回 `NaN`

```javascript
function getAge() {
    let y = new Date().getFullYear();
    return y - this.birth;
}
let obj = {
    name: 'Jolyne',
    birth: 2001,
    age: getAge
};
// 调用
obj.age(); // 23
// 单独调用
getAge(); // NaN
// 或者
let fn = obj.age;
fn(); // NaN
```

如果需要保证 `this` 指向正确，就必须使用 `obj.xxx()` 的形式调用方法

在 `'use strict'` 模式下，`this` 的指向是 `undefined` ，实际上还是指向 `window` ，只是暴露问题，并未解决 `this` 指向问题

```javascript
let obj = {
    name: 'Jolyne',
    birth: 2001,
    age: function() {
        let y = new Date().getFullYear();
        return y - this.birth;
    }
};
let fn = obj.age;
fn();  // TypeError: Cannot read properties of undefined
```

结论：

1. 使用普通函数
2. **使用** `.bind()` **方法**：通过 `.bind()` 创建新的函数，将 `this` 设置为 `.bind()` 方法的第一个参数
3. **闭包**：只需要确保 `this` 的指向，就可以直接调用

```javascript
// 普通函数
let obj = {
    name: 'Jolyne',
    birth: 2001,
    age: function () {
        let y = new Date().getFullYear();
        return y - this.birth;
    }
};
console.log(obj.age()); // 23

// .bind()
let obj = {
    name: 'Jolyne',
    birth: 2001,
    age: function () {
        let y = new Date().getFullYear();
        return y - this.birth;
    }
};
let fn = obj.age.bind(obj); // 指定obj的this
console.log(fn()); // 23

// 闭包
let obj = {
    name: 'Jolyne',
    birth: 2001,
    age: function () {
        let that = this;
        function getAge() {
            let y = new Date().getFullYear();
            return y - that.birth;
        }
        return getAge();
    }
};
console.log(obj.age()); // 23
```

> **箭头函数**：箭头函数没有自己的 `this`，而是获取外部作用域的 `this`，通常是 `window`

## apply() 和 call()

独立调用函数时，根据是否使用 `strcit` 模式，`this` 始终指向 `undefined` 或 `window`

指定函数的 `this` 指向，可以使用 `apply()` 或 `call()` 方法

1. `apply(thisArg, [argsArray])`
2. `call(thisArg, arg1, arg2, arg3)`

> 在原始模式下，`this` 指向 `null` 或 `undefined` 时，自动指向全局对象 `window`

`apply()` 和 `call()` 区别：

- `apply()` 将函数打包成 Array 后传入
- `call()` 不需要打包，直接按顺序传入

```javascript
function getAge() {
    let y = new Date().getFullYear();
    return y - this.birth;
}
let obj = {
    name: 'Jolyne',
    birth: 2001,
    age: getAge
};
console.log(getAge.call(obj)); // 23
console.log(getAge.apply(obj, [])); // 23
```

```javascript
function greet(greeting, punctuation) {
    console.log(greeting + ', ' + this.name + punctuation);
}

const person = {
    name: 'Alice'
};

// call()  
greet.call(person, 'Hello', '!'); // Hello, Alice!  

// apply()  
greet.apply(person, ['Hi', '?']); // 输出: Hi, Alice?
```

## 装饰器

不改变原有类的定义，给类新增行为和功能

利用 `apply()` 可以动态改变函数的行为，即使是内置的函数，也可以重新指向新的函数

例如：统计代码中调用多少次 `parseInt()`

```javascript
'use strict';
let count = 0;
let oldParseInt = parseInt; 
window.parseInt = function () {
    count += 1;
    return oldParseInt.apply(null, arguments);
};
parseInt('10');
parseInt('20');
parseInt('30');
console.log('count = ' + count); // 3
```

1. 使用 `let oldParseInt = parseInt;` 保存了原始的 `parseInt` 函数到 `oldParseInt` 变量中
2. 重写了 `window.parseInt` 方法，使其成为一个新的函数
3. 在这个新的函数中，首先增加了 `count` 变量的值，以跟踪 `parseInt` 被调用的次数。

4. 新的 `parseInt` 函数返回了原始 `parseInt` 函数的调用结果

# 高阶函数

高阶函数 (Higher-order funciton)：一个函数接收另一个函数作为参数，那么就称这个函数是高阶函数

- `map` (映射)
- `reduce` (归约)
- `filter` (过滤)

```javascript
function add(x, y, f) {
    return f(x) + f(y);
}
let x = add(-5, 6, Math.abs);
console.log(x); // 11
```

高阶函数的两个特点：

1. 函数作为参数
2. 函数作为返回值

## map

**概念**：对于一个**可迭代对象** ( 数组、列表等 ) 的每一个元素**使用同一个函数**，并返回一个新的可迭代对象

**作用**：不改变原始的数据结构，而是生成一个新的数据结构，包含处理后的数据

**注意**：`map(function callback(curValue, [index], [array]) {}, [thisArg])`

- `curValue`：当前元素
- `index`：(可选)当前元素的索引。
- `array`：(可选)被调用的数组
- `thisArg`：(可选)执行 `callback` 函数时 `this` 所指向的对象

> 注意事项：在 `parseInt`作为 `map()` 的回调函数时，`parseInt` 最多接收两个参数
>
> - 解析的字符串：`curValue`
> - 基数：会将 `index` 作为基数处理，`0` 作为十进制，`1` 不合法返回 `NaN` ，超出也返回 `NaN`
>
> 解决方法：`arr.map(Number);`

*例1*：$f(x)=x^2$

```javascript
let pow = function (x) {
    return x * x;
};

let arr = [1, 2, 3, 4, 5];
let result = [];
for (let i = 0; i < arr.length; i++) {
    result.push(pow(arr[i]));
}
console.log(result); // (5) [1, 4, 9, 16, 25]
```

```javascript
function pow(x) {
    return x * x;
}
let arr = [1, 2, 3, 4, 5];
arr.map(pow); // (5) [1, 4, 9, 16, 25]
```

*例2*：

```javascript
let arr = [1, 2, 3, 4, 5];
arr.map(num => num * num); // (5) [1, 4, 9, 16, 25]
```

*例3*：将 Array 的所有元素转字符串

```javascript
let arr = [1, 2, 3, 4, 5];
arr.map(String); // (5) ['1', '2', '3', '4', '5']
```



## reduce

归约：接收一个序列(可迭代对象)作为输入，将该可迭代对象中的元素组合起来，返回一个值。通常用于累积计算或者接收 `map` 返回的序列

**作用**：将一组数据归约成一个单一的值

```pseudocode
[x1, x2, x3, x4]
1 -> f(x1, x2)
2 -> f(f(x1, x2), x3)
3 -> f(f(f(x1, x2), x3),x4)
```

`reduce(callback(), Initial)`：初始值(可选)

例：求和

```javascript
let arr = [1, 2, 3, 4, 5];
arr.reduce((x, y) => { return x + y; }); // 15
```

如果参数只有一个，需要指定一个初始值

```javascript
let arr = [1];
arr.reduce((x, y) => { return x + y }, 0); // 1
```

例：求积

```javascript
function product(arr) {
    return arr.reduce((x, y) => { return x * y }, 1);
}
```

例：将 `[1, 3, 5, 7, 9]` 转 `13579`

```javascript
let arr = [1, 3, 5, 7, 9];
arr.reduce((x, y) => { return x * 10 + y; });
```

例：将字符串 `'13579'` 转数值 `13579` 通过 `map` 和 `reduce` 实现

```javascript
function string2int(s) {
    // s.split(''): 将字符串分割为字符数组
    // map(num => +num)还可以写成map(Number)
    return s.split('').map(num => +num).reduce((x, y) => { return x * 10 + y }, 0);
}
```

例：将输入的字符串，变为首字母大写，其他字母小写

```javascript
function normalize(arr) {
    return arr.map(s => s.substring(0, 1).toUpperCase() + s.substring(1).toLowerCase());
}
```

## 高阶函数

高阶函数除了将函数作为参数外，还可以将函数作为返回值

例如：不需要立即返回函数的结果

```javascript
function lazy_sum(arr) {
    let sum = function() {
        return arr.reduce((x, y) => {
            return x + y;
        });
    }
    return sum;
}
```

```javascript
let arr = [1, 2, 3, 4, 5];
let f = lazy_sum(arr);
console.log(f); // [Function: sum]
console.log(f()); // 15
```

`sum` 可以引用外部函数的参数和局部变量，当调用 `lazy_sum` 时，相关参数和变量均保存在返回的函数中，这种形式称作 "闭包(Closure)"

>  注意：每次调用时，即便使用的是相同参数，每次调用都会返回一个新的函数
>
> 即 `f1` 和 `f2` 的调用结果互不影响

```javascript
let f1 = lazy_sum(arr);
let f2 = lazy_sum(arr);
console.log(f1 === f2); // false
```



## 闭包

闭包就是可以读取其他函数内部变量的函数。当一个函数返回一个新函数后，其内部的变量仍被新函数引用

> 注意：返回的函数没有立即执行，知道被调用时才执行

```javascript
function count() {
    let arr = [];
    for (var i = 1; i <= 3; i++) {
        arr.push(function () {
            return i * i;
        });
    }
    return arr;
}

let res = count();
let [f1, f2, f3] = res;
console.log(f1()); // 16
console.log(f2()); // 16
console.log(f3()); // 16
```

- 每次循环时，都创建一个新的函数，将3个函数返回到数组 `arr`

- 当调用 `f1`、`f2`、`f3 `时，结果应为 1、4、9；实际结果都是 16

原因：因为函数使用了 `var` 定义变量，函数并非是立即执行，等三个参数返回时，`i` 的值变为了 `4`

> 注意：
>
> 1. 返回闭包时，最好不要使用循环变量
> 2. 如果一定要引用循环变量，最好再创建一个函数，用于绑定变量的当前值 
>    - 使用立即执行函数，绑定变量的当前值
>    - 使用 `let` 定义循环变量

```javascript
function count() {
    let arr = [];
    for (var i = 1; i <= 3; i++) {
        arr.push((function (n) {
            return function () {
                return n * n;
            }
        })(i));
    }
    return arr;
}
```

```javascript
function count() {
    let arr = [];
    for (let i = 1; i <= 3; i++) {
        arr.push(function () {
            return i * i;
        });
    }
    return arr;
}
```

作用：

1. 函数延迟执行

2. 创建私有变量

   > 在面向对象编程的语言中，如：Java、C++，在对象中封装一个私有变量，可以直接使用 `private` 修饰
   >
   > 在没有 `class`机制，只有函数的语言中，可以借助闭包，封装私有变量

3. 将多参数函数变为单参数的函数

```javascript
function create_counter(initial) {
    let x = initial || 0;
    return {
        inc: function () {
            x += 1;
            return x;
        }
    }

}
let c1 = create_counter();
console.log(c1.inc());
```

返回的变量中，实现了一个闭包，闭包携带了局部变量 `x`，外部代码无法访问变量 `x`

即**所谓闭包，就是携带状态的函数，其状态可以完全对外隐藏**

```javascript
function make_pow(x) {
    return function (y) {
        return Math.pow(x, y);
    }
}
let pow2 = make_pow(2);
console.log(pow2(3)); // 8
```



 ## 箭头函数

箭头函数 ( Arrow Function )：是一种匿名函数。简化函数定义

1. 如果不带 `{}` ，可以不用写 `return`

2. 单参数时，不用写括号 `()`

3. 如果返回结果是个对象，要加 `()` ，因为对象的 `{}` 和函数的 `{}` 有冲突

箭头函数和匿名函数的区别：箭头函数内部的 `this` 是词法作用域，由上下文决定。

在调用 `call()` 和 `apply()` 时，无法对其 `this` 进行绑定

## 标签函数

模板字符串，除了方便变量构造字符串，还可以使用标签函数 Tag Function

```javascript
const email = 'test@example.com';
const password = '123456';

function sql(strings, ...exps) {
    console.log(`SQL: ${strings.join('?')}`);
    console.log(`SQL parameters: ${JSON.stringify(exps)}`);
    return {
        name: '小明',
        age: 20
    };
}

const result = sql`SELECT * FROM users WHERE email=${email} AND password=${password}`;

console.log(JSON.stringify(result));
```

```javascript
sql`SELECT * FROM users WHERE email=${email} AND password=${password}`
```

`sql` 后的会自动转换为 `sql()` 函数，`sql()` 函数接收两个参数

- `strings`：字符串数组。除去 `${xxx}` 剩下的部分组成的数组。`["SELECT * FROM users WHERE email=", " AND password=", ""]`

- `...exps`：可变参数。接收的也是数组，数组内容是 `${xxx}` 的实际值。即 `["test@example.com", "hello123"]`

## 生成器

生成器 generator 和函数类似，可以返回多次

```javascript
function* foo(x) {
    yield x + 1;
    yield x + 2;
    return x + 3;
}
```

- 函数如果没有 `return` ，就是 `return undefined`

- 生成器类似函数，可以通过 `yield` 返回多次

例：斐波那契数列——数列中的数都是前两个数之和

```javascript
function fib(m) {
    let a = 0, b = 1, arr = [0, 1];
    while (arr.length < m) {
        [a, b] = [b, a + b];
        arr.push(b);
    }
    return arr;
}
console.log(fib(5)); // [ 0, 1, 1, 2, 3 ]
```

函数只能返回一次，必须返回一个 Array，如果使用 generator ，可以一次只返回一个数，不断返回多次

```javascript
function* fib(m) {
    let a = 0, b = 1, n = 0;
    while (n < m) {
        yield a;
        [a, b] = [b, a + b];
        n++;
    }
    return;
}
```

生成器有两种调用方法

- `next()`：执行 generator ，每次遇到 `yield` 就返回一个对象，然后暂停，返回的 `value` 就是 `yield` 的返回值。`done` 表示 generator 是否结束，如果 `done` 为 `true`，则 `value` 就是 `return` 的返回值

  ```javascript
  let f = fib(5);
  console.log(f.next()); // {value: 0, done: false}
  console.log(f.next()); // {value: 1, done: false}
  console.log(f.next()); // {value: 1, done: false}
  console.log(f.next()); // {value: 2, done: false}
  console.log(f.next()); // {value: 3, done: false}
  console.log(f.next()); // {value: undefined, done: true}
  ```

- 使用 `for...of` 迭代 generator 对象，这种情况不需要自己去判断 `done` 的状态

  ```javascript
  for(let x of fib(5)) {
      console.log(x); // 0, 1, 1, 2, 3
  }
  ```

  

generator 作用：

1. 可以记住执行状态的函数，因此可以实现需要面向对象的功能

   例：用一个对象保存状态，这样表达相当繁琐

   ```javascript
   let fib = {
       a: 0,
       b: 1,
       n: 0,
       m: 5,
       next: function () {
           let r = this.a, t = this.a + this.b;
           this.a = this.b;
           this.b = t;
           if (this.a < this.m) {
               this.n++;
               return r;
           } else {
               return undefined;
           }
       }
   };
   console.log(fib.next());
   ```

2. 将异步的回调代码变成同步代码

   ```javascript
   ajax('http://url-1', data1, function (err, result) {
       if (err) {
           return handle(err);
       }
       ajax('http://url-2', data2, function (err, result) {
           if (err) {
               return handle(err);
           }
           ajax('http://url-3', data3, function (err, result) {
               if (err) {
                   return handle(err);
               }
               return success(result);
           });
       });
   });
   ```

   使用 generator

   ```javascript
   try {
       r1 = yield ajax('http://url-1', data1);
       r2 = yield ajax('http://url-2', data2);
       r3 = yield ajax('http://url-3', data3);
       success(r3);
   }
   catch (err) {
       handle(err);
   }
   ```

   

例子：生成一个自增的 id

```javascript
// 函数无法保存状态, 故需要一个全局变量 current_id 保存数字
let current_id = 0;

function next_id() {
    current_id ++;
    return current_id;
}

// 不用闭包, 使用 generator生成
function* next_id() {
    let current_id = 1;
    while (true) {
        yield current_id++;
    }
    return;
}
```

# 标准对象

一切皆对象

```javascript
typeof 123; // 'number'
typeof 123n; // 'bigint'
typeof NaN; // 'number'
typeof 'str'; // 'string'
typeof true; // 'boolean'
typeof undefined; // 'undefined'
typeof Math.abs; // 'function'
typeof null; // 'object'
typeof []; // 'object'
typeof {}; // 'object'
```

`typeof` 无法区分 `null`、`Array` 和 `{}`

**包装对象**

`number`、`boolean`、`string` 都有包装对象，使用 `new` 关键字创建

```javascript
let n = new Number(123);
let b = new Boolean(true);
let s = new String('str');

console.log(typeof n); // object
console.log(typeof b); // object
console.log(typeof s); // object

console.log(n === 123); // false
console.log(b === true); // false
console.log(s === 'str'); // false
```

包装对象的类型是 `object`，和原始值不一样，使用 `===`  判断会返回 `false` 

总结：

1. 尽量不要使用包装对象
2. `Number`：使用 `parseInt()` 、 `parseFloat()` 或 `Number()` 方法转换 `number`
3. `String`：使用 `String()` 或对象的 `toString()` 方法转 `string`
   - `null` 和 `undefined` 没有 `toString()` 方法
   - `123.toString()`要写成 `(123).toString()`
4. `boolean` 不用转
5. `typeof` 只能判断 `number`、`boolean`、`string`、`function`、`undefined`
6. 判断 `Array`：使用 `Array.isArray(arr)`
7. 判断 `null`：使用 `===`
8. 判断全局变量是否存在：`typeof window.myVar ==== 'undefined'`
9. 判断函数内部变量是否存在：`typeof myVar === 'undefined'`

## Date

`Date` 对象：表示日期和时间

1. `getFullYear()`：年
2. `getMonth()`：月
3. `getDate()`：日
4. `getDay()`：周。星期几
5. `getHours()`：时，24小时制
6. `getMinutes()`：分
7. `getSeconds()`：秒
8. `getMilliseconds()`：毫秒
9. `getTime()`：时间戳。`number` 格式

- 获取当前系统日期和时间

  ```javascript
  let now = new Date();
  console.log(now); // Sun Oct 20 2024 18:12:25 GMT+0800 (中国标准时间)
  ```

- 指定日期和时间

  1. `new Date("yyyy-mm-dd")`：指定日期。返回 `"YYYY-MM-DDTHH:mm:ss.sssZ"` 格式

  2. `new Date(year, month, date, hours, hours, minutes, seconds, milliseconds)`

     ```javascript
     let d = new Date(2015, 5, 19, 20, 15, 30, 123);
     console.log(d); // Fri Jun 19 2015 20:15:30 GMT+0800 (中国标准时间)
     ```

  3. `new Date(timestamp)`：时间戳

     ```javascript
     // 解析时间戳
     let d = new Date(1435146562875);
     console.log(d); // Wed Jun 24 2015 19:49:22 GMT+0800 (中国标准时间)
     ```

  4. ISO 8601格式字符串：`new Date("2024-04-01T12:00:00Z")`

  >  **注意**：月份是从 `0` 开始，`0~11` 表示月数范围。

- `Date.parse()`：指定日期和时间，解析ISO 8601格式字符串，返回时间戳

  ```javascript
  let d = Date.parse('2015-06-24T19:49:22.875+08:00');
  console.log(d); // 1435146562875
  ```

  > **注意**：`Date.parse()` 传入月份时实际是 `01-12`，转换成 `Date` 对象后，`getMonth()` 获取月份时要用 `0-11`

## filter

将 Array 中的元素过滤掉，返回剩下的元素

`filter()` 将传入的函数作用于每个元素，根据返回值是 `true` 或 `false`，决定是否保留

`filter()` 和 `map()` 一样回调函数可以接收三个参数：

- `element`：元素
- `index`：索引
- `self`：数组本身

```javascript
// 删掉偶数, 保留奇数
let arr = [1, 2, 4, 5, 6, 9, 10, 15];
let res = arr.filter((x) => {
    return x % 2 !== 0;
});
console.log(res); // (4) [1, 5, 9, 15]
```

数组去重

```javascript
let arr = [1, 2, 3, 4, 1, 5, 5, 2];
let res = arr.filter((element, index, self) => {
    return self.indexOf(element) === index; // indexOf()只返回首次出现索引的位置
});
console.log(res); // (5) [1, 2, 3, 4, 5]
```

筛选素数

```javascript
function get_primes(arr) {
    function isPrime(num) {
        if (num <= 1) {
            return false;
        }
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) {
                return false;
            }
        }
        return true;
    }
    return arr.filter(isPrime);
}
```

如果 `num <= 1` ，返回 `false`，因为 `1`、负数、`0` 不是素数

`Math.sqrt(num)`：`num` 的一个因数大于平方根，另一个因数必定小于平方根。如：当 `num` 为 `15`，`i = 3`，`15 % 3 === 0`，返回 `false`，表示 `15` 不是素数

## sort

排序的核心是比较两个元素的大小。

如果是数字，就直接比较

Array 中的排序：

1. 如果是字符串，按字符串的 ASCII 码大小排序
2. 如果是数字，Array 的 `sort()` 默认将所有元素转 `String`。例如：`'10' < '2'`，因为 `1` 比 `2` 小

如果传入 `x`、`y` 两个参数，如果 `x < y`，返回负数；如果 `x > y` ，返回正数；如果 `x = y`，返回 `0`

```javascript
// 升序
arr.sort((x, y) => {
    return x - y;
});

// 降序
arr.sort((x, y) => {
    return y - x;
});
```

对于字符串，通常忽略大小写进行比较，只需将字符串转换为大写(或小写)，再比较即可

```javascript
let arr = ['Go', 'apple', 'MyGo'];
arr.sort((s1, s2) => {
    let x = s1.toUpperCase();
    let y = s2.toUpperCase();
    if (x < y) {
        return -1;
    } else if (x > y) {
        return 1;
    } else {
        return 0
    }
});
console.log(arr); // (3) ['apple', 'Go', 'MyGo']
```

> **注意**：`sort()` 会直接对 Array 进行修改

## every

判断元素是否满足指定测试条件

```javascript
let arr = ['Go', 'apple', 'MyGo'];
// 判断长度是否都大于0
arr.every((s) => {
    return s.length > 0;
}); // true
// 判断每个元素是否都小写
arr.every((s) => {
    return s.toLowerCase() === s;
}); //false
```

## find

查找符合条件的第一个元素，找到则返回该元素，否则返回 `undefined`

```javascript
let arr = ['Apple', 'pear', 'orange'];
// 找到第一个全小写的元素
arr.find((s) => {
    return s.toLowerCase() === s;
}); // pear
// 找到第一个全大写的元素
arr.find((s) => {
    return s.toUpperCase() === s;
}); // undefined
```

## findIndex

查找符合条件的第一个元素，返回这个元素的索引；没有找到返回 `-1`

```javascript
let arr = ['Apple', 'pear', 'orange'];
// 找到第一个全小写的元素
arr.findIndex((s) => {
    return s.toLowerCase() === s;
}); // 1
// 找到第一个全大写的元素
arr.findIndex((s) => {
    return s.toUpperCase() === s;
}); // -1
```

## forEach

和 `map()` 类似，将每个元素依次作用于传入的函数，但不返回新的数组；通常用于遍历数组

```javascript
let arr = ['Apple', 'pear', 'orange'];
arr.forEach(x => console.log(x));
```

# 闭包

# RegExp

正则用于判断字符串是否匹配。设计思想用一种描述性的语言给字符串定义一个规则，不符合规则的字符串就是不合法的

`/RegExp/修饰符`

- 修饰符(可选)

  - `i`：大小写不敏感
  - `g`：全局匹配(查找所有的匹配而非第一个匹配后停止)
  - `m`：多行匹配

- `[]`：查找某个范围内的字符

  - `[0-9a-zA-Z]`：匹配一个方括号范围内数字、字母
  - `(x|y)`：可以匹配 `x` 或 `y`

- 元字符

  - `\d`：匹配一个数字

  - `\w`：匹配一个字母或数字

  - `\s`：匹配一个空格(包括 Tab和空白等)
  - `\b`：匹配单词边界
  - `\u`：匹配 Unicode 字符
  - `\`：使用 `\` 表示转义特殊字符

- 量词

  - `.`：任意单个字符

  - `*`：任意长度的字符( 包括 0 个 )

  - `+`：至少一个字符

  - `?`：0个或1个字符

  - `{n}`：匹配 `n` 个序列内的字符

  - `{n,m}`：匹配 `n`-`m` 个序列内的字符

  - `^n`：匹配以 `n` 开头的字符串
  - `n$`：匹配以 `n` 结尾的字符串

创建正则表达式

1. `/RegExp/修饰符`
2. `new RegExp('RegExp')`

> 注意：通过对象的形式创建时， `\` 表示转义字符

# JSON 和 正则鸽了

# window

window 对象不仅充当全局作用域，而且表示浏览器窗口

`innerWidth` 和 `innerHeight` 可以获取浏览器内部宽度和高度

> 内部宽高指去除菜单栏、工具栏、边框等元素后，显示的宽高

兼容性：IE <= 8 不支持

```javascript
// 获取浏览器窗口大小
console.log('window inner size :' + window.innerWidth + '×' + window.innerHeight);
```

`outerWidth` 和 `outerHeight` 属性：获取浏览器整个宽高

## navigator

`navigator` 表示浏览器信息

- `navigator.appName`：浏览器名称
- `navigator.appVersion`：浏览器版本

- `navigator.language`：浏览器语言

- `navigator.platform`：操作系统类型
- `navigator.userAgent`：浏览器设置的 `User-Agent` 字符串

```javascript
console.log('appName = ' + navigator.appName);
console.log('appVersion = ' + navigator.appVersion);
console.log('language = ' + navigator.language);
console.log('platform = ' + navigator.platform);
console.log('userAgent = ' + navigator.userAgent);
// appName = Netscape
// appVersion = 5.0(Windows NT 10.0; Win64; x64) AppleWebKit / 537.36(KHTML, like Gecko) Chrome / 129.0.0.0 Safari / 537.36
// language = zh - CN
// platform = Win32
// userAgent = Mozilla / 5.0(Windows NT 10.0; Win64; x64) AppleWebKit / 537.36(KHTML, like Gecko) Chrome / 129.0.0.0 Safari / 537.36
```

初学者喜欢通过 `if` 判断浏览器的版本，`navigator` 的信息可以随时被修改，这样判断不够准确且难以维护

```javascript
let width;
if (getIEVersion(navigator.userAgent) < 9) {
    width = document.body.clientWidth;
} else {
    width = window.innerWidth;
}
```

正确做法：充分利用 JavaScript 针对不存在属性返回 `undefined` 的特性，直接使用短路运算符 `||`

```javascript
let width = window.innerWidth || document.body.clientWidth;
```

## screen

`screen` 对象表示屏幕信息，常用属性

- `screen.width`：屏幕宽度，以像素为单位
- `screen.height`：屏幕高度
- `screen.colorDepth`：返回颜色位数，如：8、16、24

```javascript
console.log('Screen size = ' + screen.width + ' × ' + screen.height + ' Screen.colorDepth: ' + screen.colorDepth);
// Screen size = 1536 × 864 Screen.colorDepth: 24
```

## location

`location` 表示当前页面的 URL 信息

例如：`http://www.example.com:8080/path/index.html?a=1&b=2#TOP`

- `location.href`
  - 读取：返回当前页面的 URL
  - 写入：导向新的 URL
- `location.protocol`：返回 URL 中的协议部分
- `location.host`：返回域名和端口号
- `location.port`：返回端口号
- `location.pathname`：返回 URL 中的路径部分
- `location.search`：返回 URL 中查询字符串部分 ( `?` 之后的内容 )
- `location.hash`：返回 URL 中的锚点部分 ( `#` 之后的内容 )

- `location.assign(url)`：加载新的文档
- `location.replace(url)`：替换当前文档。与 `assign` 不同，`replace` 不会留下历史记录，不能使用后退按钮返回之前的页面

- `location.reload()`：重载当前页面

## document

`document` 表示当前页面，在 HTML 中以 DOM 形式表示树形结构，`document` 对象是整个 DOM 树的根节点

- `document.title`：属性读取 HTML 文档中的 `<title>xxx</title>` 属性值，可以动态修改

  ```javascript
  console.log(document.title); // Document
  document.title = "cnm";
  console.log(document.title); // cnm
  ```

- 获取某个节点，从 `document` 开始查找，最常见的查找通过 `Id` 或 `TagName`

  ```html
  <dl id="drink-menu" style="border:solid 1px #ccc;padding:6px;">
      <dt>摩卡</dt>
      <dd>热摩卡咖啡</dd>
      <dt>酸奶</dt>
      <dd>北京老酸奶</dd>
      <dt>果汁</dt>
      <dd>鲜榨苹果汁</dd>
  </dl>
  ```

  ```javascript
  let menu = document.getElementById('drink-menu');
  let drinks = document.getElementsByTagName('dt');
  let s = '提供的饮料有:';
  
  for (let i = 0; i < drinks.length; i++) {
      s = s + drinks[i].innerHTML + ' ';
  }
  console.log(s); // 提供的饮料有:摩卡 酸奶 果汁 
  ```

- `document.cookie`：获取当前页面的 Cookie

  > Cookie 是通过服务器发送的 key-value 标识符。
  >
  > 由于 HTTP 协议是无状态的，服务器无法区分是哪个用户发送过来的请求，所以用 Cookie 区分
  >
  > 当一个用户成功登录，服务器会发送一个 Cookie 给浏览器。之后，浏览器再访问该网站时，会在请求头上附上这个 Cookie ，服务器根据 Cookie 区分用户
  >
  > Cookie 还可以存储网站设置，例如：页面显示的语言
  >
  > 因为 HTML 页面可以直接引入第三方 JavaScript 代码，由于 JavaScript 可以直接读取页面的 Cookie ，用户的登录信息通常也存放在 Cookie 中，造成巨大安全隐患。引入的第三方网站可以直接读取到当前网站的用户登录信息。为解决该问题，服务器在设置 Cookie 时，可以使用 `httpOnly`，设置 `httpOnly` 的 Cookie 将不能被读取

## history

`history` 对象保存了浏览器的历史记录，可以调用 `history` 的 `back()` 或 `forward()` ，相当于用户点击了 " 后退 " 或 " 前进 " 按钮

这个对象是历史遗留对象，

- 对于现代 Web 而言，`history.back()` 太过粗暴，用户会感到大为愤怒

- 对于新手而言，在设计 Web 页时，喜欢在登录页登录成功时调用 `history.back()` 返回登录前的页面，这是个错误的做法

- 对于使用 AJAX 加载的页面，如果希望页面更新同时更新 `history` 对象，应当使用 `history.pushState()` 方法

 ```javascript
// when AJAX is done:
let state = 'any-data';
let newUrl = '/ajax.html#signin';
history.pushState(state, '', newUrl);
 ```

当用户点击 " 后退 " 时，浏览器不会刷新页面，而是触发 `popState` 事件，由 JavaScript 捕获并更新相应的部分页面内容

# DOM

HTML 文档被浏览器解析后就是一棵 DOM 树，需要通过 JavaScript 操作 DOM

DOM 是一个树形结构，操作 DOM 的基本操作：

1. 更新：更新该 DOM 节点内容，相当于更新 HTML 的内容
2. 遍历：遍历该 DOM 节点的子节点
3. 添加：在该 DOM 下新增一个子节点，相当于动态增加一个 HTML 节点
4. 删除：将该节点从 HTML 中删除，相当于删掉该 DOM 节点的内容及其包含的所有子节点



常用方法：

- `document.getElementById()`
- `document.getElementByTagName()`

- `document.getElementByClassName()`

先定位父节点，再从父节点之中缩小范围

```javascript
// 返回id为'test'的节点
let test = document.getElementById('test');

// 先定位id为'test'的节点, 再返回内部所有'tr'节点
let trs = document.getElementById('test').getElementByTagName('tr');

// 先定位id为'test'的节点, 再返回内部所有class中包含'red'的节点
let reds = document.getElementById('test').getElementByClassName('red');

// 获取节点test下的所有直属子节点
let cs = test.children;

// 获取节点test下第一个、最后一个子节点
let first = test.firstElementChild;
let last = test.lastElementChild;
```

- `querySelector()`
- `querySelectorAll()`

```javascript
let q1 = document.querySelector('#q1');
let q2 = document.querySelectorAll('div.highlighted > p');
```

练习：

```html
<div id="test-div">
    <div class="c-red">
        <p id="test-p">JavaScript</p>
        <p>Java</p>
    </div>
    <div class="c-red c-green">
        <p>Python</p>
        <p>Ruby</p>
        <p>Swift</p>
    </div>
    <div class="c-green">
        <p>Scheme</p>
        <p>Haskell</p>
    </div>
</div>
```

```javascript
// 选择<p>JavaScript</p>:
let js = document.querySelector('#test-p');

// 选择<p>Python</p>,<p>Ruby</p>,<p>Swift</p>:
let arr = document.getElementsByClassName('c-green')[0].children;

// 选择<p>Haskell</p>:
let haskell = document.getElementsByClassName('c-green')[1].lastElementChild;

// 测试:
if (!js || js.innerText !== 'JavaScript') {
    alert('选择JavaScript失败!');
} else if (!arr || arr.length !== 3 || !arr[0] || !arr[1] || !arr[2] || arr[0].innerText !== 'Python' || arr[1].innerText !== 'Ruby' || arr[2].innerText !== 'Swift') {
    console.log('选择Python,Ruby,Swift失败!');
} else if (!haskell || haskell.innerText !== 'Haskell') {
    console.log('选择Haskell失败!');
} else {
    console.log('测试通过!');
}
```

## 更新DOM

- `innerHTML`：直接通过 HTML 片段修改 DOM 节点内部子树。如果写入字符串是通过网络获取的，需要注意避免 XSS 攻击

  ```javascript
  // 获取<p id="p-id">...</p>
  let p = document.getElementById('p-id');
  // 设置文本为abc:
  p.innerHTML = 'ABC'; // <p id="p-id">ABC</p>
  // 设置HTML:
  p.innerHTML = 'ABC <span style="color:red">RED</span> XYZ';
  // <p>...</p>的内部结构已修改
  ```

- `innerText` 和 `textContent`：自动对字符串进行 HTML 编码，保证无法设置任何 HTML 标签

  ```javascript
  // 获取<p id="p-id">...</p>
  let p = document.getElementById('p-id');
  // 设置文本:
  p.innerText = '<script>alert("Hi")</script>';
  // HTML被自动编码，无法设置一个<script>节点:
  // <p id="p-id">&lt;script&gt;alert("Hi")&lt;/script&gt;</p>
  ```

  > 两个区别在于读取属性时，`innerText` 不返回隐藏元素的文本； `textContent` 返回所有文本，IE < 9不支持

修改 CSS，`style` 属性对应的所有 CSS ，可以直接获取和设置，CSS 采用 `font-size` 命名方式，在 JavaScript 中需要改写为驼峰命名法 `fontSize`

```javascript
// 获取<p id="p-id">...</p>
let p = document.getElementById('p-id');
// 设置CSS:
p.style.color = '#ff0000';
p.style.fontSize = '20px';
p.style.paddingTop = '2em';
```

练习

```html
<!-- HTML结构 -->
<div id="test-div">
    <p id="test-js">javascript</p>
    <p>Java</p>
</div>
```

```javascript
// 获取<p>javascript</p>节点:
let js = document.getElementById('test-js');

// 修改文本为JavaScript:
js.innerText = "JavaScript";

// 修改CSS为: color: #ff0000, font-weight: bold
js.style.color = '#ff0000';
js.style.fontWeight = 'bold';

// 测试:
if (js && js.parentNode && js.parentNode.id === 'test-div' && js.id === 'test-js') {
    if (js.innerText === 'JavaScript') {
        if (js.style && js.style.fontWeight === 'bold' && (js.style.color === 'red' || js.style.color === '#ff0000' || js.style.color === '#f00' || js.style.color === 'rgb(255, 0, 0)')) {
            console.log('测试通过!');
        } else {
            console.log('CSS样式测试失败!');
        }
    } else {
        console.log('文本测试失败!');
    }
} else {
    console.log('节点测试失败!');
}
```

## 插入DOM

- `innerHTML` ：可以直接修改 DOM 节点的内容。仅限当前 DOM 节点为空的情况

- `appendChild`：将一个子节点添加到父节点的最后一个子节点

```html
<p id="js">JavaScript</p>
<div id="list">
    <p id="java">Java</p>
    <p id="python">Python</p>
    <p id="scheme">Scheme</p>
</div>
```

```javascript
let 
	js = document.getElementById('js'),
    list = document.getElementById('list');
list.appendChild(js);
```

```html
<div id="list">
    <p id="java">Java</p>
    <p id="python">Python</p>
    <p id="scheme">Scheme</p>
    <p id="js">JavaScript</p>
</div>
```

插入的 js 节点已经存在于当前文档树，这个节点会首先在原来的位置处删除，再插入到新的位置

通常，我们会创建一个新的节点，然后插入到指定位置

```javascript
let
    list = document.getElementById('list'),
    haskell = document.createElement('p');
haskell.id = 'haskell';
haskell.innerText = 'Haskell';
list.appendChild(haskell);
```

动态创建节点，并添加。以下表示在 `<head>` 下插入一个 `<style>` 标签，所有 `<p>` 的颜色为 `red`

```javascript
let d = document.createElement('style');
d.setAttribute('type', 'text/css');
d.innerHTML = 'p { color: red }';
document.getElementsByTagName('head')[0].appendChild(d);
```

- `insertBefore`：将子节点插入指定位置

  `insertBefor(newElement, referenceElement)`：子节点将插入到 `referenceElement` 之前

  ```javascript
  // 将Haskell插入Scheme之前
  let 
  	list = document.getElementById('list'),
      ref = document.getElementById('scheme'),
      haskell = document.createElement('p');
  haskell.id = 'haskell';
  haskell.innerText = 'Haskell';
  list.insertBefore(haskell, ref);
  ```

  拿到 " 参考子节点 " 可以通过循环父节点的所有子节点，可以通过迭代 `children` 

  ```javascript
  let
      i, c,
      list = document.getElementById('list');
  for (i = 0; i < list.children.length; i++) {
      c = list.children[i]; // 拿到第i个子节点
  }
  ```

  练习：按字符串顺序重新排序DOM节点

  ```html
  <ol id="test-list">
      <li class="lang">Scheme</li>
      <li class="lang">JavaScript</li>
      <li class="lang">Python</li>
      <li class="lang">Ruby</li>
      <li class="lang">Haskell</li>
  </ol>
  ```

  ```javascript
  let list = document.getElementById('test-list');
  let arr = Array.from(list.children).sort((x, y) => {
      return x.innerText > y.innerText ? 1 : -1;
  });
  for (let i = 0; i < arr.length; i++) {
      list.appendChild(arr[i]);
  }
  
  
  // 测试:
  (function () {
      let
          arr, i,
          t = document.getElementById('test-list');
      if (t && t.children && t.children.length === 5) {
          arr = [];
          for (i = 0; i < t.children.length; i++) {
              arr.push(t.children[i].innerText);
          }
          if (arr.toString() === ['Haskell', 'JavaScript', 'Python', 'Ruby', 'Scheme'].toString()) {
              console.log('测试通过!');
          }
          else {
              console.log('测试失败: ' + arr.toString());
          }
      }
      else {
          console.log('测试失败!');
      }
  })();
  ```

  ## 删除DOM

  `removeChild`：获取该节点本身的父节点，然后再删除

  **注意：**

  1. 删除后的节点虽然不在文档树中，但仍存在于内存中，方便随时再添加
  2. `children` 是一个只读属性，会随着子节点的变化实时更新

  ```html
  <div id="parent">
      <p>First</p>
      <p>Second</p>
  </div>
  ```

  ```javascript
  let parent = document.getElementById('parent');
  parent.removeChild(parent.children[0]);
  parent.removeChild(parent.children[1]); // Uncaught TypeError: Failed to execute 'removeChild' on 'Node': parameter 1 is not of type 'Node' 原因: 删除节点后自动更新, 索引1不存在
  ```

  练习：把与Web开发技术不相关的节点删掉

  ```html
  <!-- HTML结构 -->
  <ul id="test-list">
      <li>JavaScript</li>
      <li>Swift</li>
      <li>HTML</li>
      <li>ANSI C</li>
      <li>CSS</li>
      <li>DirectX</li>
  </ul>
  ```

  ```javascript
  let web = ['JavaScript', 'HTML', 'CSS'];
  let list = document.querySelector('#test-list');
  for (li of list.children) {
      if (!web.includes(li.innerText)) {
          list.removeChild(li);
      }
  }
  // 测试:
  (function () {
      let
          arr, i,
          t = document.getElementById('test-list');
      if (t && t.children && t.children.length === 3) {
          arr = [];
          for (i = 0; i < t.children.length; i++) {
              arr.push(t.children[i].innerText);
          }
          if (arr.toString() === ['JavaScript', 'HTML', 'CSS'].toString()) {
              console.log('测试通过!');
          }
          else {
              console.log('测试失败: ' + arr.toString());
          }
      }
      else {
          console.log('测试失败!');
      }
  })();
  ```

## 表单

表单本身也是 DOM 树

- 文本框：用于输入文本 `<input type="text">`
- 口令框：用于输入口令 `<input type="password">`
- 单选框：可选择一项 `<input type="radio">`
- 复选框：可选择多项 `<input type="checkbox">`
- 下拉框：可选择一项 `<select>`
- 隐藏文本：用户不可见，提交时会将隐藏文本发送回到服务器 `<input type="hidden">`

### 获取值

获取 `<input>` 节点的使用，直接调用 `value` 获得对应输入值

```javascript
// <input type="text" id="email">
let input = document.getElementById('email');
input.value; // 用户输入的值
```

`text`、`password`、`hidden`、`select` 可以使用 `value`

`radio`、`checkbox `的 `value` 返回的是 HTML 预设值。实际上需要通过 `checked` 去判断

```javascript
// <label><input type="radio" name="weekday" id="monday" value="1"> Monday</label>
// <label><input type="radio" name="weekday" id="tuesday" value="2"> Tuesday</label>

let mon = document.getElementById('monday');
let tue = document.getElementById('tuesday');
mon.checked;
tue.checked;
```

### 设置值

`text`、`password`、`hidden`、`select` 直接设置 `value` 即可

```javascript
// <input type="text" id="email">
let input = document.getElementById('email');
input.value = 'test@example.com';
```

`checked` 设置为 `true` 或 `false`

### H5 控件

常用：`date`、`datetime`、`datetime-local`、`color` 等

```HTML
<input type="date" value="2021-12-02">
    
<input type="datetime-local" value="2021-12-02T20:21:12">
    
<input type="color" value="#ff0000">
```

不支持 H5 的浏览器将识别为 `type="text"` 显示

### 提交表单

方式一：通过 `<form>` 元素的 `submit()` 方法提交一个表单，如：响应一个 `<button>` 的 `click` 事件

```html
<form id="test-form">
    <input type="text" name="test">
    <button type="button" onclick="doSubmitForm()">Submit</button>
</form>
```

```javascript
function doSubmitForm() {
    let form = document.getElementById('test-form');
    form.submit();
}
```

扰乱了对浏览器的正常提交。一是点击按钮提交表单，而是在最后一个输入框中按回车键

方式二：响应 `<form>` 的 `onsubmit` 事件

```html
<form id="test-form" onsubmit="return checkForm()">
    <input type="text" name="test">
    <button type="submit">Submit</button>
</form>
```

```javascript
function checkForm() {
	let form = document.getElementById('test-form');
    // ...
    return true;
}
```

如果输入有误， `return false`，将不提交 `<form>`，提示信息后终止提交 `<form>`



检查修改 `<input>` 时，需要充分使用 `type="hidden"` 来传递数据

例如：登录表单输入用户名或口令时，处于安全考虑， 不传输明文口令，而是口令的 MD5 ，直接修改 `<input>`

```html
<form id="login-form" method="post" onsubmit="return checkForm()">
    <input type="text" id="username" name="username">
    <input type="password" id="password" name="password">
    <button type="submit">Submit</button>
</form>
```

```javascript
function checkForm() {
    let pw = document.getElementById('password');
    pw.value = toMD5(pw.value);
    return true;
}
```

这样口令框的值会突然边长，如果不想改变用户输入，可以使用 `type="hidden"`

```html
<form id="login-form" method="post" onsubmit="return checkForm()">
    <input type="text" id="username" name="username">
    <input type="password" id="input-password">
    <input type="hidden" id="md5-password" name="password">
    <button type="submit">Submit</button>
</form>
```

```javascript
function checkForm() {
    let input_pw = document.getElementById('input-password');
    let md5_pw = document.getElementById('md5-password');
    md5_pw.value = toMD5(input_pw.value);
    return true;
}
```

值得注意的是，`id` 为 `input-password` 的 `<input>` 没有 `name` 属性，没有 `name` 属性的 `<input>` 不会被提交

### 操作文件

当 `input type="file"` 时，表单的 `enctype` 必须指定为 `multipart/form-data` ，`method` 必须指定为 `post`，浏览器才能正确编码并以 `multipart/form-data` 格式发送数据

```html
<form action="/upload" method="post" enctype="multipart/form-data">  
    <label for="file">Choose a file:</label>  
    <input type="file" id="file" name="file">  
    <input type="submit" value="Upload">  
</form>
```

出于安全考虑，js 对 `file` 的 `value` 属性的赋值没有任何效果。因此，js 也同样无法获取到文件的真实路径

`endsWith('.xxx')`：提交表单时做文件扩展名检查

```javascript
let f = document.getElementById('test-file-upload');
let filename = f.value;
if(!filename || !(filename.endsWith('.jpg') || filename.endsWith('.png') || filename.endsWith('.gif'))) {
    console.log('Can only upload image file');
    return false;
}
```

File API

H5 新增 File API 允许 js 读取文件内容

File 和 FileReader 两个对象，获取文件信息，读取文件





















