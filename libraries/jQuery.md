CDN：内容分发网络 ( Content Delivery Network )

提供很多服务器，用户访问时，自动就近选择服务器给用户提供资源

广泛免费的 CDN 站点：https://www.bootcdn.cn/

# jQuery

针对 DOM 的操作

- 获取
- 创建
- 监听
- 改变

## 函数

jQuery 提供一个函数，名为 `jQuery`，写作 `$`

```js
console.log(jQuery === $); // true
```

- 返回的是一个类数组对象，每个元素都是一个引用了 DOM 节点的对象

- 如果查找的 `id` 不存在，会直接返回 `[]`

- jQuery 对象和 DOM 对象可以相互转换

  ```javascript
  let div = $('#abc'); // jQuery
  // 获取第1个DOM元素
  let divDOM = div.get(0);
  // 将DOM元素重新包装成jQuery对象
  let divAnother = $(divDOM);
  ```

  

## 选择器

- id 选择器：输入 `#属性名`，如：`$('#app')`

- 类选择器：输入 `.属性名`，如：`$('.app')`

  同时包含多个类的节点：`$('.red.green')`

- Tag 选择：直接输入 TAG 名称，如： `$('p')`

- 属性选择器：除了 `id` 或 `class` 的其他属性，如：`$('[type=password]')`

  - 属性值包含空格等特殊字符，需要使用双引号括起来：`$('[item="A B"]')`
  - 前缀：按前缀查找，`$('[class="icon-"]')`
  - 后缀：按后缀查找，`$('[name$=with]')`

- 组合查找：将以上选择器组合使用

  如：只查 `input` 的 `name` 属性，`$('input[name=email]')`

  `tag` 和 `class` 组合：如，`$('tr.red')` ，`<tr class="red">` 

- 多项选择器：用 `,` 组合起来选择

  如：`$('p,div')`

  ```javascript
  // 不会找到<p class="red green">
  $('p.red,p.green'); // <p class="red">和<p class="green">
  ```

### 层级选择器

层级选择器 (Descendant Selector) ，如果两个 DOM 具有层级关系，使用**空格**隔开，如 ：`$('ancestor descendant')`

```javascript
$('ul.lang li.lang-js');
```

### 子选择器

子选择器 ( Child Selector )：层级之间必须是父子关系，用 `>` 表示。`$('parent>child')`

```javascript
$('ul.lang>li.lang-js');
```

### 过滤器

过滤器 ( Filter )：一般不单独使用，附在选择器中，精确定位元素

- `first-child`：第一个子元素
- `last-child`：最后一个子元素
- `nth-child(n)`：选出第 `n` 个元素，`n` 从 1 开始
- `nth-child(even)`：选出序号为偶数的元素
- `nth-child(odd)`：选出序号为奇数的元素

```javascript
$('ul.lang li:first-child'); // 仅选出JavaScript
$('ul.lang li:last-child'); // 仅选出Lua
$('ul.lang li:nth-child(2)'); // 选出第N个元素，N从1开始
$('ul.lang li:nth-child(even)'); // 选出序号为偶数的元素
$('ul.lang li:nth-child(odd)'); // 选出序号为奇数的元素
```

### 表单选择器

- `:input`：可以选择 `<input>`、`<textarea>`、`<select>`、`<button>`
- `:file`：`<input type="file">` 和 `input[type=file]`
- `:checkbox`：复选框。`$('input[type=checkbox]')`
- `:radio`：单选框。`$('input[type=radio]')`
- `:focus`：输入焦点的元素，当前光标停放的 `<input>`，`$('input:focus')`
- `:checked`：当前勾上的单选框和复选框，`$('input[type=radio]:checked')`
- `:enabled`：可以输入的 `<input>`、`<select>`
- `:disabled`：不能输入的

## 查找和过滤

- `find()`：某个节点的所有子节点查找，接收任意一个选择器。

  ```javascript
  ul.find('#swift');
  ```

- `parent()`：从当前节点向上查找

  ```javascript
  swf.parent('.red');
  ```

- 对于同层级的节点

  - `next()`：下一个元素
  - `prev()`：上一个元素

  ```javascript
  swift.next();
  swift.prev();
  ```

- `filter()`：
