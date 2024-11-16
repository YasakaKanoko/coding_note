# React

**目录**：



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

- `React.createElement(type, props, ...children)` 用来创建一个 React 元素

  - `type`：组件名。例如：字符串标签名 ( 如：`'div'` 或 `'span'` ) 或 React 组件。 ( html 标签名必须小写 )
  - `props`：元素的属性。参数通常是对象或 `null`
    - `class` 属性要使用 `className` 设置
    - 设置事件时，属性名需要使用驼峰命名法。如 `onclick()` 必须改成 `onClick()`
  - `...children`：元素的子节点、内容

  ```react
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

- `render()`

- `createRoot()`
