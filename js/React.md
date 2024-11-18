# React

**目录**：

[JSX](#jsx)



**Hello World**

React 的常规开发方式并不通过浏览器引入外部 js 脚本来使用

```html
<script src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
```

- `react.development.js`：React 核心库。使用 React 必须引入
- `react-dom.development.js`：React DOM。使用 React 开发 Web 应用时必须引入

**原生 DOM**

```html
<div id="root"></div>

<script>
    // 1. 创建一个DOM元素
    const div = document.createElement('div');
    // 2. div中添加内容
    div.innerText = 'Hello world!';
    // 3. 获取DOM元素
    const root = document.getElementById('root');
    // 4. 将DOM元素添加到页面
    root.appendChild(div);
</script>
```

**虚拟 DOM**

```html
<div id="root"></div>

<script>
    // 1. 创建一个React元素
    const div = React.createElement('div', {}, 'Hello world!');
    // 2. 获取根元素对应的React元素
    const root = ReactDOM.createRoot(document.getElementById('root'));
    // 3. 将div渲染到根元素
    root.render(div);
</script>
```

- `React.createElement(type, [props], [...children])` ：用来创建一个 React 元素

  - `type`：组件名。例如：字符串标签名 ( 如：`'div'` 或 `'span'` ) 或 React 组件。 ( html 标签名必须小写 )
  - `props`：元素的属性。参数通常是对象或 `null`
    - `class` 属性要使用 `className` 设置
    - 设置事件时，属性名需要使用驼峰命名法。如： `onclick()` 必须改成 `onClick()`
  - `...children`：元素的子节点、内容
    
    ```javascript
      // 1. 创建一个React元素
      const button = React.createElement('button', {
      id: 'btn',
      type: 'button',
      className: 'hello',
      onClick: () => {
          return console.log('Hello world!');
      }
      }, 'Hello world');
    
      // 2. 获取根元素对应的React元素
      const root = ReactDOM.createRoot(document.getElementById('root'));
      // 3. 将div渲染到根元素
      root.render(button);
    ```

  > **注意**：
  >
  > - React 元素最终会通过虚拟 DOM 转换为真实 DOM
  > - React 元素一旦创建就无法修改，只能使用新创建的元素进行替换

- `ReactDOM.render(element)`：将 React 元素渲染到根元素中

  - 首次调用时，容器节点的所有 DOM 元素都会被替换；后续调用则使用 React 的 DOM 差分算法 ( DOM diffing algorithm ) 进行高效更新
  - 当重复调用 `render()` 渲染页面时，React 会自动比较两次渲染的元素，只在真实 DOM 中更新发生变化的部分
  - 不会修改容器节点，只修改容器的子节点。

- `ReactDOM.createRoot(domNode, [options])`：用来创建 React 的根容器，根容器用来放置 React 元素

```javascript
// React 17的render(), 每次渲染都需要从新获取一次Id
ReactDOM.render(div, document.getElementById('root'));

// React 18
// 1. 先获取根元素, 根元素就是React要插入的位置
const root = ReactDOM.createRoot(document.getElementById('root'));
// 2. 将元素通过render()渲染
root.render(div);
```

## JSX

- **命令式**

  ```javascript
  // 1. 创建一个React元素
  const button = React.createElement('button', {
      onClick: () => {
          return console.log('Hello world!');
      }
  }, 'hello');
  // 2. 获取根元素对应的React元素
  const root = ReactDOM.createRoot(document.getElementById('root'));
  // 3. 将div渲染到根元素
  root.render(button);
  ```

- **声明式**：结果导向编程

  - 通过 JSX 创建 React 元素，JSX 需要被翻译为 JS 代码，才能被 React 执行。

  - 在使用 JSX 必须先导入 `Babel` 完成转换工作

    ```html
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/babel-standalone@6.26.0/babel.min.js"></script>
    ```

  - JSX 实际上是 `createElement()` 的语法糖，JSX 执行前都会被 babel 转换为 js 代码

    ```javascript
    const div = <div>
        一个div
        <button>按钮</button>
    </div>;
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(div);
    ```


**注意事项**：

1. JSX 不是字符串，不需要加上引号

   ```jsx
   const div = <div>这是一个div</div>; // 不需要加引号
   ```

2. JSX 的标签语法规范：html 标签用小写开头、React 组件用大写开头

   ```jsx
   // html标签
   const div = <div>这是一个div</div>;
   // React组件
   const comp = <MyClass>这是一个组件</MyClass>;
   ```

3. JSX 有且只有一个根标签

   ```javascript
   // 根标签内部可以嵌入多个标签, 但根标签只能有一个
   const div = <div>
       一个div
       <button>按钮</button>
   </div>;
   const root = ReactDOM.createRoot(document.getElementById('root'));
   ```

4. JSX 标签必须正确闭合 ( 自结束标签必须加上 `/` )

   ```html
   // 不管是双标签还是自结束标签, 都必须加上 '/'
   <input type="text" />
   ```

5. 在 JSX 中可以使用 `{}` 嵌入表达式 ( 表达式就是有返回值的语句 )

   ```javascript
   const name = 'Jack';
   const div = <div>
       <div>
           {name}
       </div>
   </div>;
   ```

6. 如果表达式返回值是空值、布尔值、`undefined` ，将不显示

   ```jsx
   // 这个true将不显示
   const div = <div>
       {true};
   </div>;
   ```

7. 属性的 `class` 属性要写成 `className`，`style` 属性必须使用**对象**设置，并且属性名要用驼峰命名法

   ```jsx
   const div = <div id="box" class="box1" style={{backgroundColor: "yellowgreen"}}>这是一个div</div>;
   ```

8. 注释：`{/**/}`

### 渲染列表

第一种方式：`for` 循环遍历

```jsx
const data = ['Lucy', 'Jack', 'Jolyne'];
const arr = [];
for (let i = 0; i < data.length; i++) {
    arr.push(<li>{data[i]}</li>);
}
const list = <ul>{arr}</ul>;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(list);
```

第二种方式：使用 `map()`

```jsx
const data = ['Lucy', 'Jack', 'Jolyne'];
const arr = data.map((item) => <li>{item}</li>);
const list = <ul>{arr}</ul>;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(list);
```

### 虚拟 DOM

在 React 中，操作的元素被称为 React 元素，并不是直接操作原生的 DOM 元素

React 将通过虚拟 DOM 将 React 元素和原生 DOM 进行映射，通过操作 React 元素在真实 DOM 中显现

优势：

1. 降低 API 复杂度
2. 解决兼容问题
3. 提升性能 ( 减少 DOM 中的不必要操作 )

```jsx
// 1. 创建数据
const data = ['Lucy', 'Jack', 'Jolyne'];
// 2. 创建列表
const list = <ul>{data.map((item) => <li>{item}</li>)}</ul>;
// 3. 获取根元素
const root = ReactDOM.createRoot(document.getElementById('root'));
// 4. 渲染元素
root.render(list);
```

每当调用 `root.render()` 时，页面就会重新渲染。React 会通过 `diffing` 算法，将旧元素和新元素进行比较，只改变发生变化的元素

比较时，React 会先比较父元素，

- 父元素一致，逐个比较其子元素，直到找到发生变化的元素为止
- 父元素不同，将所有元素替换

JSX 显示数组时，数组中的每个元素都需要设置一个唯一的 `key` 属性 ( `Warning: Each child in a list should have a unique "key prop."` )

```jsx
document.getElementById('btn').onclick = function () {
    // 1. 创建数据
    const data = ['Alice', 'Lucy', 'Jack', 'Jolyne'];
    // 2. 创建列表
    const list = <ul>{data.map((item) => <li key={item}>{item}</li>)}</ul>;
    // 3. 获取根元素
    const root = ReactDOM.createRoot(document.getElementById('root'));
    // 4. 渲染元素
    root.render(list);
};
```

> 如果在列表前面加上一个新元素了，其他元素内容并没有发生改变，由于新元素添加到开始位置，其余位置也发生变化，React 根据位置比较元素，所有元素都被修改
>
> 为了解决这个问题，React 为列表设计一个 `key` 属性
>
> `key` 的作用：当设置 `key` 属性后，比较 `key`，而不按顺序比较

**注意**：

1. 通常使用 `id` 作为 `key`
2. 不要使用元素的索引 ( `index` ) 作为 `key`，因为索引是会随着元素的顺序而改变

## 创建 React 项目

创建 React 项目通常使用 `npm` 或 `yarn` 作为包管理器对项目进行管理

React 提供 `react-scripts` 包，包中包含项目开发中的大部分依赖，简化开发

- 创建项目

  目录结构：

  ```pseudocode
  根目录
  	- public
  		- index.html // public/index.html是首页的模板, webpack编译文件时, 会以index.html为模板生成index.html
  	- src
  		- App.js
  		- index.js // src/index.js 是js入口文件
  ```

- 进入项目所在目录，执行初始化命令

  ```bash
  # yarn init -y
  npm init -y
  ```

- 安装项目依赖

  ```bash
  # yarn add react react-dom react-scripts
  npm install react react-dom react-scripts
  ```

- 启动项目

  ```bash
  # 首次启动时, 需要按y确认
  npx react-scripts start
  
  # 当项目最终上线时才会使用build
  npx react-scripts build
  ```

  或将 `react-scripts start` 设置到 `package.json` 中的 `scripts` 选项，然后通过 `npm start` 启动

  ```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "react-scripts start",
    "build": "react-scripts build"
  }
  ```

  ```shell
  # 类似于open with live server
  npm run start
  
  # 类似于open in browser
  npm run build
  ```

### Hello world

- `public/index.html`

  ```html
  <div id="root"></div>
  ```

- `src/index.js`

  ```jsx
  // 引入ReactDOM: client: 浏览器环境 
  import ReactDOM from 'react-dom/client';
  const App = <div>
      <h1>Hello world!</h1>
      <p>First React App!</p>
  </div>;
  // 获取根容器
  const root = ReactDOM.createRoot(document.getElementById('root'));
  // 将App渲染进根容器
  root.render(App);
  ```

- 启动项目

  ```bash
  npm run start
  ```

在 `package.json` 中添加 `"eslintConfig"` 进行语法检查

```json
"eslintConfig": {
  "extends": [
    "react-app"
  ]
}
```

