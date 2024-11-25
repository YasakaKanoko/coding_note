# Vue3

Vue 是一个声明式、组件化编程模型，渐进式 JavaScript 框架

> - 渐进式：适用于各种项目
>
> - 声明式
>
> - 组件化

传统服务器渲染的缺陷：Model 和视图耦合 ( 单对单 )

MVVM：Model-View-View-Model

- Vue 负责 vm 视图模型的工作，将视图与模型关联
  - 当模型发生变化，视图自动更新
  - 也可以直接通过视图操作模型

## Hello world

### 组件

组件：Vue3中组件就是一个普通的 js 对象

- 组件用来创建组件实例, 组件是组件实例的模板
- 组件 -> 组件生成组件实例 -> 虚拟 DOM -> DOM

1. 通过 CDN引入：

   ```html
   <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
   ```

2. 创建根节点：

   ```html
   <div id="root"></div>
   ```

3. 挂载到页面

   ```html
   <script>
       // 1. 创建一个根组件
       const Root = {
           // 模板
           template: '<h1>Hello Vue3!</h1>'
       };
       // 2. 创建App实例
       const app = Vue.createApp(Root);
       // 3. 将实例在页面中挂载
       app.mount('#root');
   </script>
   ```

   > **注意**：创建实例和挂载可以同时进行
   >
   > ```javascript
   > Vue.createApp(Root).mount('#root');
   > ```

> **为什么要创建组件实例 ( vm ) ？**
>
> - 组件之间是独立的，组件是可以复用的

### `data`

在组件对象中，可以添加一个 `data` 属性

- `data` 是一个函数，需要一个对象作为返回值，对象中的属性会自动添加到组件实例中
- `{{属性名}}`：在模板中直接访问组件实例中的属性

```javascript
const Root = {
    data() {
        return {
            message: 'Vue3'
        }
    },
    template: '<h1>Hello {{message}}!</h1>'
};
Vue.createApp(Root).mount('#root');
```

### `button`

> `data` 中的数据会自动和视图绑定，数据发生变化，视图会自动刷新

```javascript
const Root = {
    data() {
        return {
            message: 'Vue3'
        }
    },
    template: '<button @click="count++">点击按钮</button> - 共点击{{count}}次'
};
Vue.createApp(Root).mount('#root');
```

### `template`

`template`：模板，决定组件的最终样式

定义模板的三种方式：

1. 通过 `template` 指定

   ```javascript
   const Root = {
       data() {
           return {
               count: 0
           }
       },
       template: '<h1>Hello {{message}}!</h1>'
   };
   ```

2. 直接在网页中指定，但必须满足 html 规范

   ```html
   <div id="root">{{message}}</div>
   ```

   > **注意**：
   >
   > 1. 如果 `template` 和网页中同时创建了组件模板，则优先使用 `template` 作为模板，同时替换根组件中的所有内容
   > 2. 如果组件中没有定义 `template`，根元素中也没有指定模板，则使用根元素的 `innerHTML` 作为模板

3. 组件中使用 `render()` 直接渲染

## Vite

Vite 是一个构建工具，提供了一个更快和更轻量级的开发服务器，优化了前端项目的开发和构建过程。

- **文件结构**：

  ```json
  - 根目录
  	- ./node_modules
  	- ./src
  		- index.js (main.js)
  	- index.html
  	- package-lock.json
  	- package.json
  ```

- **初始化**

  ```shell
  npm init -y
  ```

- 将 vite 添加到项目依赖

  ```shell
  npm install vite --save-dev
  ```

  > **注意**：`npm` 大小写敏感，是 `vite` 而不是 `Vite`

- 配置 `package.json`

  ```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "vite --open",
    "build": "vite build",
    "preview": "vite preview"
  }
  ```

  - `npm run test`：这个脚本会打印 "Error: no test specified" 消息，然后以错误码 1 退出。 这通常用于指示尚未配置测试。
  - `npm run dev`：启动 Vite 开发服务器并打开浏览器。 这用于在开发模式下运行你的项目。
  - `npm run build`：构建你的 Vite 项目以用于生产环境。 这会生成优化后的代码，准备部署到服务器。
  - `npm run preview`：启动 Vite 预览服务器。 这用于在本地预览已构建的项目。

- `index.html`

  ```html
  <script type="module" src="./src/index.js"></script>
  <div id="app"></div>
  ```

- `index.js`

  ```javascript
  import { createApp } from 'vue'
  // 1. 创建一个根组件
  const App = {
      data() {
          return {
              message: 'Hello world!'
          }
      },
      template: '<h1>{{message}}</h1>'
  };
  // 2. 创建应用并挂载
  createApp(App).mount('#app');
  ```

  ```shell
  npm run dev
  ```

  > **注意**：使用 Vite 构建工具构建不支持 `template` 和网页中直接挂载
  >
  > `[Vue warn]: Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js". 
  >   at <App>`
  >
  > 解决：将 ` import { createApp } from 'vue'` 改为
  >
  > ```javascript
  > import { createApp } from "vue/dist/vue.esm-bundler.js"
  > ```

### 组件化

模块化：`index.js` 只创建实例并挂载，其他组件存放在 `src` 文件目录中

- 在 `src` 中新建 `App.js` 作为根组件

  ```javascript
  // 1. 创建一个根组件作为默认导出
  export default {
      data() {
          return {
              message: 'Hello world!'
          }
      },
      template: '<h1>{{message}}</h1>'
  };
  ```

- 入口文件 `index.js` 负责引入组件并挂载

  ```javascript
  import { createApp } from "vue/dist/vue.esm-bundler.js"
  import App from './App'
  // 2. 创建应用并挂载
  createApp(App).mount('#app');
  ```

**子组件**：

1. 在 `src` **新建子组件并导出**。( 新建 `MyButton.js` 自定义的 `MyButton` 组件 )

   ```javascript
   // 1. 自定义子组件
   export default {
       data() {
           return {
               count: 0
           }
       },
       template: `
       <div>
           <button @click="count++">点击按钮</button> - <span>新增{{count}}次</span>
       </div>
       `
   }
   ```

2. 在根组件 ( `App.js` ) 中**引入并注册**子组件

   ```javascript
   // 2. 在根组件中引入子组件
   import MyButton from "./MyButton";
   export default {
       data() {
           return {
               message: 'Hello world!'
           }
       },
       // 3. 在根组件中注册子组件
       components: {
           // MyButton:MyButton
           // 自定义属性名: 引入组件的属性值 - 同名组件可以省略, 
           MyButton
       },
       template: 
       // 实例中的属性名要与components中自定义的属性名一致
       `
       <MyButton></MyButton>
       <MyButton></MyButton>
       <MyButton></MyButton>
       <MyButton></MyButton>
       `
   };
   ```

3. **挂载**到页面中，**子组件实例相互独立，功能互不影响**

   ```javascript
   import { createApp } from "vue/dist/vue.esm-bundler.js"
   import App from './App'
   // 2. 创建应用并挂载
   const vm = createApp(App).mount('#app');
   ```

   > **注意**：
   >
   > 1. 定义子组件时，语法：`自定义子组件名: 引入的子组件名`，模板中的实例要与自定义的组件名一致
   >
   > 2. 通常子组件会放在 `src` 目录中的 `components` 目录
   >
   > 3. **规范**：html 不区分大小写，在自定义子组件名时，建议小写，否则无法渲染到页面
   >
   >    ```html
   >    <div id="app">
   >        <my-button></my-button>
   >    </div>
   >    ```
   >
   >    ```javascript
   >    components: {
   >    	"my-button": MyButton
   >    }
   >    ```

