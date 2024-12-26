# Vue2

----

**目录**：

- [Hello world!](#hello-world)
- [模板](#模板)
- [组件](#组件)

---

**Vue 官网**：https://v2.cn.vuejs.org/

[awesome-vue](https://github.com/vuejs/awesome-vue)：Vue.js 相关的优秀 Demo 精选列表

[awesome-js](https://awesomejs.dev/for/vue/)：浏览与 Vue 相关的包

# Hello world!

- 开发版本：包含完整的警告和调试模式

  ```html
  <!-- 开发环境版本，包含了有帮助的命令行警告 -->
  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
  ```

- 生产版本：删除了警告

  ```html
  <!-- 生产环境版本，优化了尺寸和速度 -->
  <script src="https://cdn.jsdelivr.net/npm/vue@2"></script>
  ```

- [Vue Dev Tools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?hl=zh-CN) ：Vue 开发者工具

- [全局 API](https://v2.cn.vuejs.org/v2/api/#%E5%85%A8%E5%B1%80-API)：修改全局配置

- **Hello Vue!**

  ```vue
  <script src="https://cdn.jsdelivr.net/npm/vue@2"></script>
  
  <div id="app">
      <h1>{{msg}}</h1>
  </div>
  
  <script>
      let vm = new Vue({
          el: '#app',
          data: {
              msg: 'Hello vue!',
          },
      })
  </script>
  ```

- **注入**：vue 会将以下配置注入到 vue 实例中，即模板中可以直接使用 vue 实例中的成员

  - `data` ：和界面相关的数据

  - `computed` ：通过已有的数据计算得到的数据

  - `methods` ：方法

- **虚拟 DOM**：vue 采用了虚拟 DOM ( `vnode` ) 的方式描述要渲染的内容

  `vnode` 是一个普通的 js 对象，用于描述界面上有什么

  ```javascript
  let vnode = {
      tag: 'h1',
      children: [{
          tag: undefined,
          text: 'Hello world!'
      }]
  };
  ```

  模板被解构为类似结构的虚拟 DOM

  ```javascript
  {
      tag: "div",
      children: [
          { tag: "h1", children: [ { text: "Hello world!" } ] }
      ]
  }
  ```

  **渲染原理**：`render()`

  ```javascript
  render(h) {
      return h('div', [ // 根节点
          // 子节点
          h('h1', `${this.msg}`),
          h('p', `xxx`),
          h('div', `xxx`),
      ])
  }
  ```

  **渲染的查找顺序**：`template` —— `render()` —— vue 模板

  > **注意**：
  >
  > 1. **vue 模板不是真实 DOM，会编译为虚拟 DOM**
  > 2. 虚拟 DOM 最终会生成真实 DOM 树

- `diff` **算法**：数据发生变化后重新渲染，vue 会比较新旧两棵 `vnode tree`，只更新差异部分到真实 DOM 中

  > **注意**：虚拟节点树，必须是单根的

- **挂载**：生成真实 DOM 树，放置到某个元素位置，称之为**挂载**
  1. 通过 `el: 'css选择器'` 配置
  2. 通过 `vue实例.$mount('css选择器')` 配置
- **流程**：
  - 创建 vue 实例 —— 注入 —— 生成虚拟 DOM 树 —— 挂载 —— 渲染
  - 数据发生变化 —— `diff` 算法重新生成虚拟DOM树 —— 重新挂载 —— 重新渲染

# 模板

**内容**：Mustache 语法，文本插值  `{{expr}}`

**指令**：

- `v-if`：控制元素是否被渲染

  ```vue
  <div id="app">
      <p v-if="seen">现在你看到我了</p>
      <button @click="clicked">按钮</button>
  </div>
  
  <script>
      let vm = new Vue({
          el: '#app',
          data: {
              seen: true
          },
          methods: {
              clicked() {
                  this.seen = !this.seen;
              }
          }
      })
  </script>
  ```

- `v-for`：绑定数组，渲染列表

  ```vue
  <div id="app">
      <ol>
          <li v-for="(item, i) in todos" :key="item.id">
              {{ item.text }}
          </li>
      </ol>
  </div>
  
  <script>
      let vm = new Vue({
          el: '#app',
          data: {
              todos: [
                  { text: '学习 JavaScript', id: 1 },
                  { text: '学习 Vue', id: 2 },
                  { text: '整个牛项目', id: 3 }
              ]
          }
      })
  </script>
  ```

  > **为什么数组的项都要 `v-bind` 唯一的 `key` ？**
  >
  > 避免不必要的 DOM 操作，vue 根据 `key` 值比较列表中的新旧元素，如果没有 `key`，vue 只能根据索引比较元素

- `v-bind`：动态绑定属性；可以简写为 `: `

  ```vue
  <div id="app">
      <span v-bind:title="msg">鼠标悬停几秒查看此处动态绑定的提示信息</span>
  </div>
  <script>
      let vm = new Vue({
          el: '#app',
          data: {
              msg: '页面加载于' + new Date().toLocaleDateString(),
          },
      })
  </script>
  ```

- `v-model`：双向数据绑定

  ```vue
  <div id="app">
      <p>{{msg}}</p>
      <input v-model="msg">
  </div>
  
  <script>
      let vm = new Vue({
          el: '#app',
          data: {
              msg: 'Hello world!'
          }
      })
  </script>
  ```

- `v-on`：添加事件监听器。可以简写为 `@`

  ```vue
  <div id="app">
      <p>{{msg}}</p>
      <button @click="reverseMessage">反转消息</button>
  </div>
  
  <script>
      let vm = new Vue({
          el: '#app',
          data: {
              msg: "你是年少的欢喜"
          },
          methods: {
              reverseMessage() {
                  this.msg = this.msg.split('').reverse().join('');
              }
          },
      })
  </script>
  ```

**配置**

- `data` ：和界面相关的数据
- `methods` ：界面相关的方法
- `template` ：配置模板
- `render` ：渲染方法，生成 `vnode`
- `el` ：挂载的目标
- `components`：局部注册组件

# 组件

**目标**：

1. **细粒度**：降低整体复杂度，提升可读性和可维护性
2. **复用性**：提高局部代码的可复用性

一个组件就是一个区域，组件包含该区域的功能 ( js )、内容 ( 模板 )、样式 (css)

> 组件中包含样式，需要构建工具支撑

**创建组件**

组件就是根据一个普通配置对象创建的，开发一个组件，只需写一个配置对象

配置对象与 vue 实例几乎一致

```jsx
let myButton = {
    data() {
        return {
            count: 0,
        }
    },
    template: `<button @click="count++">当前按钮点击了{{count}}次</button> `
};
```

组件配置对象和 vue 实例的差异：

- 无 `el`
- `data` 必须是一个函数，函数返回一个对象作为数据
- 由于没有 `el` 配置，组件的虚拟 DOM 必须定义在 `template` 或 `render()` 中

**注册组件**

- **全局注册**：一旦全局注册，应用的任何位置处都可以使用该组件

  `Vue.component("组件名称", 组件对象)`

  ```javascript
  Vue.component("MyButton", myButton);
  ```

- **局部注册**：

  语法：在 vue 实例中注册；`components: { 组件名: 组件对象 }` 

  ES6 速写：如果组件名和组件对象相同，可以只写一个

  ```javascript
  let vm = new Vue({
      components: {
          MyButton: myButton
      },
      template: `<div>
          <MyButton />    
      </div>`
  });
  vm.$mount('#app');
  ```

**组件使用**：

1. 组件必须有结束标签
2. 组件命名：短横线命名法 `<kebab-case>`、大驼峰命名法 `<PascalCase>`

**组件树**：组件可以多次出现在实例中，也可以包含在其他组件中，大组件包含小组件，就形成了组件树

**组件中注入数据**：`props` 属性中用一个数组存放需要向注入的数据

```javascript
let MyTitle = {
    props: ["item"],
    template: `<h1>{{item}}</h1>`
};
let vm = new Vue({
    components: {
        MyTitle
    },
    template: `<div>
                <MyTitle item="Hello world!" />    
            </div>`
});
vm.$mount('#app');
```

# 工程结构

```pseudocode
Project

├── src
│   ├── vue.browse.js 
│   └───── main.js
├── index.html
└── package.json
```

- `main.js`

  ```javascript
  ```

  
