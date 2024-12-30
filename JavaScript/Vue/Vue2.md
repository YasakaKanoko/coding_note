# Vue2

----

**目录**：

---

- **Vue 官网**：https://v2.cn.vuejs.org/

- [awesome-vue](https://github.com/vuejs/awesome-vue)：Vue.js 相关的优秀 Demo 精选列表

- [awesome-js](https://awesomejs.dev/for/vue/)：浏览与 Vue 相关的包

- **开发版本**：包含完整的警告和调试模式

  ```html
  <!-- 开发环境版本，包含了有帮助的命令行警告 -->
  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
  ```

- **生产版本**：删除了警告

  ```html
  <!-- 生产环境版本，优化了尺寸和速度 -->
  <script src="https://cdn.jsdelivr.net/npm/vue@2"></script>
  ```

- [Vue Dev Tools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?hl=zh-CN) ：Vue 开发者工具

- [全局 API](https://v2.cn.vuejs.org/v2/api/#%E5%85%A8%E5%B1%80-API)：修改全局配置

- 阻止 vue 启动时生成生产提示

  ```javascript
  Vue.config.productionTip = false;
  ```

## Hello Vue!

1. 想让 vue 工作，必须先**创建 vue 实例**，并且**传入配置对象**；

2. `root` 容器中的代码依旧符合 html 规范，并且混入了特殊的 vue 语法：**Mustache**

3. `root` 容器被称为 **vue 模板**

4. vue 实例和容器具有一一对应的关系

5. 真是开发中，只有一个 vue 实例

6. **Mustache 语法**：插值语法 `{{}}` 中只能写 js 表达式，插值语法会自动读取 `data` 中的所有属性；

   ```jsx
   <!-- vue 模板 -->
   <div id="root">
       <h1>Hello, {{name}}!</h1>
   </div>
   
   <script>
       new Vue({
           el: '#root',
           data: {
               name: 'vue'
           }
       });
   </script>
   ```

   - `el`：指定当前 vue 实例为指定容器服务，值通常为 css 选择器字符串
   - `data`：存储数据，数据供 `el` 指定容器使用

   > **注意**：
   >
   > 1. `el` 的两种写法：`el`、`vm.$mount('#root')`
   > 2. `data` 的两种写法：对象式、函数式
   > 3. 重要的原则：vue 中函数，不要使用箭头函数，因为箭头函数的 `this` 不会指向 vue 实例

## MVVM

1. M ( Model，模型 )：对应 `data` 中的数据

2. V ( View，视图 )：对应模板

3. VM ( View Model，视图模型 )：对应 vue 实例对象

   ```pseudocode
   // 当页面变化时, vue实例监听DOM
   View (DOM) -> (vm)DOM Listeners -> Model(Plain JavaScript Objects)
   
   // 当JavaScript中原型中的如data等数据变化时, 绑定到DOM中
   Model(Plain JavaScript Objects) -> (vm)DOM Bindings -> View (DOM)
   ```

   - `data` 中的所有属性，最后都会出现在 `vm` 中
   - `vm` 中的属性及 vue 原型中的属性，都可以在 vue 模板中直接使用

## 数据代理

`Object.defineProperty(obj, 'prop', { options })`：精确定义或修改对象的属性

- `obj`：定义或修改属性的对象是
- `'prop'`：对象的属性名称

- `options`：选项

  - `value`：属性值

  - `enumerable`：属性是否可以枚举，默认 `false`

  - `writeable`：属性是否可以修改，默认 `false`

  - `configurable`：属性是否可以删除，默认 `false`

  - `get()`：当你尝试读取属性的值时，会调用 `getter`。

  - `set(value)`：当你尝试为属性赋值时，会调用 `setter`。

    > **注意事项**：`value` / `writeable` 和 `getter` / `setter` 不能同时出现
    >
    > ```javascript
    > let obj = {
    >     name: 'Jolyne',
    > };
    > Object.defineProperty(obj, 'age', {
    >     enumerable: true,
    >     configurable: true,
    >     get() {
    >         return this._age;
    >     },
    >     set(val) {
    >         this._age = val;
    >     }
    > });
    > obj.age = 18;
    > console.log(obj.age); // 18
    > ```

**例**：通过一个对象代理另一个对象中的属性

```javascript
let obj1 = {
    x: 100,
};
let obj2 = {
    x: obj1.x,
    y: 200
};
Object.defineProperty(obj2, 'x', {
    get() {
        return obj1.x;
    },
    set(val) {
        obj1.x = val;
    }
});

console.log(obj1.x); // 100
obj2.x = 18;
console.log(obj1.x); // 18
```

**vue 中的数据代理**：通过 vue 对象实例 `vm` 去代理模板对象 `data` 中属性的操作 ( 读 / 写 )

原理：通过 `Object.defineProperty()` 把 `data` 对象中的属性添加到 `vm` 上，并指定一个 `getter` / `setter` 去对 `data` 的属性进行读/写操作 

```jsx
const vm = new Vue({
    el: '#root',
    data() {
        return {
            name: 'Hello vue'
        }
    }
});

// 模板中的数据和vm实例中的数据是等价的
data.name === vm._data.name
```

## 指令语法

vue 中的模板语法分为两类：

1. **插值语法**：用于解析标签体的**内容**，值通常是 js 表达式，可以直接读取 `data` 中的属性

2. **指令语法**：用于解析标签 ( 包括标签属性、标签体内容、绑定事件…… )；值同样也是 js 表达式；

   vue 的指令语法形式都以 `v-` 开头

### 数据绑定

- `v-bind`：简写 「`:`」；单向数据绑定

  ```jsx
  <a :href="url">点此跳转</a>
  ```

- `v-model`：双向数据绑定；简写：可以将「 `v-model:value` 」简写为「`v-model`」

  ```jsx
  <div id="root">
      <p>{{msg}}</p>
      <input type="text" v-model="msg" />
  </div>
  
  <script>
      new Vue({
          el: '#root',
          data: {
              msg: 'Hello vue'
          }
      });
  </script>
  ```

  **备注**：

  1. **单向绑定**：数据只能从 `data` 流向页面

  2. **双向绑定**：数据不仅可以从 `data` 流向页面，也可以从页面流向 `data`；

     双向绑定通常用于表单类元素中 ( 如：`input`、`select` )

### 事件处理

`v-on`：事件监听器。简写为「`@`」

```jsx
<div id="root">
    <p>{{msg}}</p>
    <button v-on:click="reverseMsg">点此反转信息</button>
</div>

<script>
    const vm = new Vue({
        el: '#root',
        data() {
            return {
                msg: '你是年少的欢喜'
            }
        },
        methods: {
            reverseMsg() {
                this.msg = this.msg.split('').reverse().join('');
            }
        },
    });
</script>
```

**备注**： 

- 事件的回调需要配置在 `methods` 对象中
- `methods` 中配置的函数 `this` 指向是 `vm` 实例或组件实例；最好不要使用箭头函数，否则 `this` 指向将不再是 `vm`
- `@click="demo"` 和 `@click="demo($event)"` 的区别在于后者可以传参

#### 事件修饰符

1. `prevent`：阻止默认事件

   ```jsx
   // a标签的默认行为是跳转至指定页面, 以下将不跳转
   <a href="www.baidu.com" @click.prevent="showInfo">点此跳转</a>
   
   // 等价于
   showInfo(e) {
       e.preventDefault();
       alert('Hello');
   }
   ```

2. `stop`：阻止事件冒泡

   ```jsx
   <div @click="showInfo">
       <button @click.stop="showInfo">点此查看</button>
   </div>
   
   // 等价于
   showInfo(e) {
       e.stopPropagation();
       alert('Hello');
   }
   ```

3. `once`：事件只触发一次

4. `capture`：使用事件的捕获模式

   事件分为：捕获阶段 -> 冒泡阶段；事件处理通常是在冒泡阶段，`capture` 是将事件触发改为捕获阶段触发

   ```jsx
   // 默认情况下, 捕获阶段: 点击div2时, 捕获顺序是 1 -> 2, 冒泡阶段: 2 -> 1
   // 当1事件更改为capture时, 冒泡阶段也变为: 1 -> 2
   <div @click.capture="test">
       div1
       <div @click="test">
           div2
       </div>
   </div>
   ```

5. `self`：类似于 `stop`；只有 `event.target` 是当前操作的元素时才触发；都可用来阻止事件冒泡

   ```jsx
   <div @click.self="showInfo">
       <button @click="showInfo">点此查看</button>
   </div>
   ```

6. `passive`：事件的默认行为立即执行，无需等待回调执行完毕

   常用于手机端

   > **注意**：不能和 `prevent` 一起使用

#### 按键修饰符

- `keyup`：抬起时

- `keydown`：按下时

  - `.enter`：回车

    ```jsx
    <input type="text" placeholder="按下回车后提示输入信息" @keyup.enter="showInfo" />
    
    // vue实例
    methods: {
        // 等价于
        showInfo(e) {
            console.log(e.target.value);
        }
    },
    ```

  - `.tab`：换行

    `tab` 比较特殊；当按下 `tab` 键时，光标会直接失去焦点，因此只能配合 `keydown` 使用

  - `.delete` (捕获“删除”和“退格”键)

  - `.esc`：退出

  - `.space`：空格

  - `.up`：上

  - `.down`：下

  - `.left`：左

  - `.right`：右

- `keyCode`：按键码。( 已废弃 )

  ```jsx
  <input type="text" placeholder="按下回车后提示输入信息" @keyup.13="showInfo" />
  ```

- vue 未提供别名的按键，按照原始的 `key` 键绑定，要转化为 `keybab-case` ( 短横线命名 )

  ```jsx
  <input type="text" placeholder="按下回车后提示输入信息" @keyup.caps-lock="showInfo" />
  ```

- 系统修饰键：`ctrl`、`alt`、`shift`、`meta` 

  - 配合 `keyup` 使用时，除了需要按下系统修饰键的同时，还要按下其他按键时，事件才能被触发
  - 配合 `keydown` 使用时，正常触发事件 

- 自定义键名：`Vue.config.keyCodes.[alias] = keyCode;` 

  ```jsx
  Vue.config.keyCodes.f1 = 112
  ```

## 计算属性

**计算属性**：

1. **定义**：页面所需的数据 / 属性，需要通过计算得出时

2. `computed` 底层借助了 `Object.defineproperty()` 方法所提供的 `getter` 和 `setter`

   ```javascript
   // 计算属性完整写法, setter通常不使用
   computed: {
       get() {
           // xxx
       },
       set(val) {
           // xxx
       }
   }
   ```

3. **优点**：与 `methods` 相比，内部有缓存机制，效率高

   `methods` 实现

   ```jsx
   <div id="root">
       姓：<input type="text" v-model="firstName" /><br />
       名：<input type="text" v-model="lastName" /><br />
       全名：<span>{{showName()}}</span>
   </div>
       
   <script>
       const vm = new Vue({
           el: '#root',
           data() {
               return {
                   firstName: 'Jolyne',
                   lastName: 'Kujo'
               }
           },
           methods: {
               showName() {
                   return this.firstName + this.lastName;
               }
           },
       });
   </script>
   ```

   `computed` 实现：

   ```jsx
   <div id="root">
       姓：<input type="text" v-model="firstName" /><br />
       名：<input type="text" v-model="lastName" /><br />
       全名：<span>{{showName}}</span>
   </div>
   
   <script>
       const vm = new Vue({
           el: '#root',
           data() {
               return {
                   firstName: 'Jolyne',
                   lastName: 'Kujo'
               }
           },
           computed: {
               showName() {
                   return this.firstName + this.lastName;
               }
           }
       });
   </script>
   ```

4. 计算属性最终出现在 `vm` 中，可以直接读取，相当于调用属性的 `getter` 方法

5. 修改计算属性：当使用 `setter` 函数修改计算属性时，其依赖的数据需要**完全修改**，响应数据才会发生变化

   ```jsx
   ```

   



## vue-cli

`vue-cli` 是一个脚手架，用于搭建 vue 工程

`vue-cli` 官网：https://cli.vuejs.org/zh/

内部使用 `webpack`，并预置了诸多插件 ( `plugin` ) 和加载器 ( `loader` )，达到开箱即用的效果

`vue-cli` 预置

- `babel`
- `webpack-dev-server`
- `eslint`
- `postcss`
- `less-loader`

安装 `vue-cli`

```shell
npm i -g @vue/cli

# yarn global add @vue/cli
```

检查 `vue` 版本

```shell
vue --version
```

创建项目

```shell
# 创建项目
vue create project_name

# ? Please pick a preset:
#   Default ([Vue 3] babel, eslint)
#   Default ([Vue 2] babel, eslint)
# > Manually select features 手动选择
```

```pseudocode
Project
├── node_modules
├── public
│   ├───── favicon.ico
│   └───── index.html
├── src
│   ├───── assets
│   ├───── components
│   ├───── App.vue
│   └───── main.js 
└── package.json
```

启动项目

```shell
npm run serve
```

## SFC

**SFC**：单文件组件 ( Single File Component  )，一个文件中包含一个组件所需的全部代码

```jsx
<template>
	<!-- 组件模板代码 -->
</template>

<script>
	// 组件配置
</script>

<style>
	/* 组件样式 */
</style>
```

`Vetur` 插件：输入 `default` 自动补全默认代码

**配置个人组件**

```jsx
<!-- ./components/Avatar.vue -->
<template>
    <img :src="url" alt="" />
</template>

<script>
    export default {
        props: ['url'],
    };
</script>

<style></style>

<!-- ./App.vue -->
<template>
    <div>
        <h1>Hello world!</h1>
        <Avatar url="https://www.loliapi.com/acg/pp/" />
    </div>
</template>

<script>
    import Avatar from './components/Avatar.vue';
    export default {
        components: {
            Avatar,
        },
    };
</script>

// ./main.js
import Vue from 'vue';
import App from './App.vue';

new Vue({
    render: (h) => h(App),
}).$mount('#app');
```

**优化**：

- 组件注册时给定可以给定一个 `name` 属性，指定组件的名字

- `props` 属性用于声明组件的属性；

  两种方式：**数组**、**对象**：详见 [prop 验证](https://v2.cn.vuejs.org/v2/guide/components-props.html#Prop-%E9%AA%8C%E8%AF%81)

  ```jsx
  // 数组
  props: ['url']
  
  // 对象
  props: {
      url: {
          type: String, // 属性必须是字符串
          required: true, // 属性必须传递
      },
  },
  ```


### 属性约束

- `type`：约束属性的类型
- `required`：属性可选或必填
- `default`：属性默认值

### v-bind

`v-bind`：简写为 ⌈ `:` ⌋

绑定内联样式 `style` 属性时，绑定为一个对象，让模板变得更清晰

```jsx
<template>
    <img
        class="avatar-img"
        :src="url"
        :style="{
            width: size + 'px',
            height: size + 'px',
        }"
    />
</template>

<script>
    export default {
        props: {
            url: {
                type: String,
                required: true,
            },
            size: {
                type: Number,
            },
        },
    };
</script>

<!-- scoped: 带有作用域的style -->
<style scoped>
    .avatar-img {
        border-radius: 50%;
        object-fit: cover;
        display: block;
    }
</style>
```

绑定类 `class` 属性时

- 字符串
- 对象
- 数组

## 预编译

`vue-cli` 进行打包，直接把组件中的模板转换为 `render` 函数，称 模板预编译

- 运行时不再需要编译模板，提升运行效率
- 打包结果不再需要 vue 的编译代码，减少了打包体积

# 计算属性

计算属性的结果会被缓存，`this` 自动绑定 vue 实例

1. 不要使用箭头函数，箭头函数的 `this` 不会指向这个组件的示例
2. 如果某个依赖在实例范畴之外，计算属性不会更新
3. 不建议使用随机数、异步、当前时间等副作用操作

> **`computed` 和 `methods` 有什么区别？**
>
> - 计算属性本质上是包含 `getter` 和 `setter` 方法
>
>   当获取计算属性时，实际上是在调用计算属性的 `getter` 方法，vue 会收集计算属性的依赖，并缓存计算属性返回结果。只有当依赖发生变化时，才会重新进行计算。
>
> - 方法没有缓存，每次调用方法都会导致重新执行。

- 完整计算属性

  ```javascript
  computed: {
      propName: {
          get() {
              // getter
          },
          set(val) {   
              // setter
          }
      }
  }
  ```

- **简写**：只包含 `getter` 计算属性

  ```javascript
  computed: {
      propName() {
          // getter
      }
  }
  ```

  

