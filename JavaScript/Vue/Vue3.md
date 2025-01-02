# Vue3

----

**目录**



----

# 创建工程

## 基于 vue-cli

```sh
# 查看@vue/cli的版本, @vue/cli版本建议在4.5.0以上
vue --version

# 安装@vue/cli
npm i -g @vue/cli

# 执行创建命令
vue create vue_project

# Choose a version of Vue.js that you want to start the project with (Use arrow keys)
# > 3.x
#   2.x
```

## 基于 vite

`vite` 新一代构建工具，官方地址：https://vitejs.cn

- `HMR`：轻量快速的热重载，实现极速的服务启动
- **开箱即用**：对 TypeScript、JSX、CSS 等开箱即用
- **按需编译**：不必等待整个应用编译完成

**创建工程**

```sh
# 创建命令
npm create vue@latest

# 配置
## 配置项目名称
√ Project name: vue3_test
## 是否添加TypeScript支持
√ Add TypeScript? Yes
## 是否添加JSX支持
√ Add JSX Support? No
## 是否添加路由环境
√ Add Vue Router for Single Page Application development? No
## 是否添加pinia环境
√ Add Pinia for state management? No
## 是否添加单元测试
√ Add Vitest for Unit Testing? No
## 是否添加端到端测试方案
√ Add an End-to-End Testing Solution? No
## 是否添加ESLint语法检查
√ Add ESLint for code quality? Yes
## 是否添加Prettier代码格式化
√ Add Prettier for code formatting? Y

# 安装依赖
npm i

# 启动项目
npm run dev
```

















































Vue 是一个**声明式**、**组件化**编程模型，**渐进式** JavaScript 框架

> - **渐进式**：轻量小巧的库，适用于各类项目
>
> - **声明式**：无需直接操作 DOM
>
> - **组件化**：提升代码复用率

传统服务器渲染的缺陷：Model 和视图耦合 ( 单对单 )

MVVM：Model-View-View-Model

Vue 负责 `vm` 视图模型的工作，将视图与模型关联
- 当模型发生变化，视图自动更新
- 也可以直接通过视图操作模型

## Hello vue3

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

**为什么要创建组件实例 ( vm ) ？**

> 组件之间是独立的，组件是可以复用的

#### `data`

在组件对象中，可以添加一个 `data` 属性

`data` 是一个函数，需要一个对象作为返回值，对象中的属性会自动添加到组件实例中

`{{属性名}}`：在模板中直接访问组件实例中的属性

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

> `data` 中的数据会自动和视图绑定，数据发生变化，视图会自动刷新

#### `button`

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

#### `template`

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

  ```pseudocode
  Project
  ├── node_modules
  │   ├── @types
  │   └── xxx
  ├── public
  ├── src
  │   ├── components
  │   ├── App.vue
  │   └── index.js
  ├── index.html
  ├── package-lock.json
  ├── package.json
  └── vite.config.js
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
  > at <App>`
  >
  > 解决：
  >
  > 1. 将 ` import { createApp } from 'vue'` 改为
  >
  >    ```javascript
  >    import { createApp } from "vue/dist/vue.esm-bundler.js"
  >    ```
  >
  > 2. 安装 `@vitejs/plugin-vue` 插件：[单文件组件](#单文件组件)

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

#### 子组件

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

#### 单文件组件

```javascript
template: `
	<h1>Hello world!</h1>
	<my-button></my-button>
`
```

`template` 使用字符串形式编写模板带来的问题：

1. 字符串串在项目运行时，在浏览器中会被编译为 js 函数，性能不好
2. 在字符串中编写，不友好

解决：单文件组件 ( SFC )

- 单文件组件格式：`.vue`
- 配合插件使用：`Vue - Official`

**单文件组件**

- 在 `script` 标签内编写组件代码

- 在 `template` 标签中编写模板

  ```vue
  // App.vue
  <script>
  // 编写组件代码
  export default {
      data() {
          return {
              msg: 'Hello vue!'
          }
      }
  };
  </script>
  <template>
      <h1>{{ msg }}</h1>
  </template>
  ```

- vue 文件编写的单文件本身无法被浏览器识别，必须要被构建工具打包后才可使用

- vue 文件在打包时，构建工具直接将 `template` 转换为函数，无需在浏览器中再次编译，提升性能

  需要安装 `@vitejs/plugin-vue` 插件

  ```shell
  npm install @vitejs/plugin-vue --save-dev
  ```

  根目录新建 `vite.config.js`

  ```javascript
  import vue from "@vitejs/plugin-vue"
  
  export default {
      plugins: [vue()]
  }
  ```

  安装插件后，无需引入 `import { createApp } from "vue/dist/vue.esm-bundler.js"` ，可以直接引入 vue

  ```javascript
  import { createApp } from 'vue';
  ```

单文件子组件：

- 编写子组件并导出

  ```vue
  <script>
  export default {
      data() {
          return {
              count: 0
          }
      }
  }
  </script>
  
  <template>
      <button @click="count++">增加{{ count }}次</button>
  </template>
  ```

- 根组件中引入并注册

  ```vue
  <script>
  import MyButton from "./components/MyButton.vue"
  // 编写组件代码
  export default {
      data() {
          return {
              msg: 'Hello vue!'
          }
      },
      components: {
          "my-button": MyButton
      }
  };
  </script>
  <template>
      <h1>{{ msg }}</h1>
      <my-button></my-button>
      <my-button></my-button>
      <my-button></my-button>
  </template>
  ```

- 入口文件导入并挂载

  ```javascript
  import { createApp } from 'vue';
  import App from './App.vue'
  const vm = createApp(App).mount('#app');
  ```

### 自动创建项目

- 全局安装 `create-vue`

  ```shell
  npm install -g create-vue
  ```

- `npm create vue@latest <项目名称>` 或 `npm init vue@latest`

  ```shell
  npm init vue@latest
  ```

- `cd ./vue_project`

- 执行 `npm i` 安装依赖

- 运行项目：`npm run dev`

#### 代码分析

`App.vue`：根组件

- `createApp(App)`：将根组件 App 关联到应用上，返回一个应用实例

  ```javascript
  const app = createApp(App);
  ```

- `app.mount('#app')`：将应用挂载到页面中，返回一个根组件实例，通常命名为 `vm`

  ```javascript
  const vm = app.mount('#app');
  ```

**组件**：一个组件可以创建多个组件实例

**组件实例**：组件实例 `vm` 是一个 `Proxy` 对象 ( 代理对象 )

- 在 `data` 中的 `this` 指向当前组件实例 `vm`

- 如果使用箭头函数，则无法通过 `this` 访问组件实例

  解决方式 1：`data` 用普通函数

  解决方式 2：当使用箭头函数时，将组件实例作为参数传入箭头函数中

  ```javascript
  data: vm => {
      return {
          msg: 'Hello vue!'
      }
  }
  ```

  > 在 vue 中，减少使用箭头函数的次数

#### 代理

`data` 的返回值：返回一个对象

- vue 会对该对象进行代理，转换为**响应式数据**，响应式数据可以直接被组件实例访问
- 直接向 `data` 中添加的数据不会被 vue 代理，不是响应式数据

通过 Object 模拟代理：

1. 创建一个对象

   ```javascript
   const obj = {
       name: 'Jolyne',
       age: 18
   };
   ```

2. 如果直接修改对象属性，并没有对数据进行渲染

   `handler`：指定代理的行为

   - `get(target, prop, receiver)`：`target` - 被代理对象、`prop` - 读取的对象属性、`receiver` - 代理对象

   - `set(target, prop, value, receiver)`：`value` - 被修改的属性

     ```javascript
     const handler = {
         get(target, prop, receiver) {
             return target[prop];
         },
         set(target, prop, value, receiver) {
             target[prop] = value;
             return true;
         }
     };
     ```

3. 创建代理

   ```javascript
   const proxy = new Proxy(obj, handler);
   ```

4. 修改代理的属性

   ```javascript
   proxy.age = 28;
   console.log(obj.age); // 28
   ```

在 vue 中的代理

- `track()`：`data()` 返回的对象会被 vue 所代理，通过代理去读取属性值，返回值之前，会先进行跟踪，对应 `get()`
- `trigger()`：触发所有使用该值位置的更新，对应于 `set()`

- 设置代理时，不会对原数据产生影响，只有修改时才会

#### `data`

`vm.$data`：实际代理对象。可以直接通过 `vm` 访问 `$data` 中的属性，甚至通过 `vm.$data` 动态的向组件中添加响应式数据

```javascript
// vm.$data.msg等价于vm.msg
vm.msg = "Alice";
```

**深层响应式对象**：构建响应式对象时，会将对象中的属性做成响应式属性

```javascript
data() {
    return {
        msg: "Hello vue3!",
        stu: {
            name:"Jolyne",
            friend: {
                name: "Alice"
            }
        }
    }
}
```

**浅层响应式对象**：`shallowReactive()` 只有根级别的属性是响应式的，谨慎使用

```javascript
data() {
    return shallowReactive({
        msg: "Hello vue3!",
        stu: {
            name:"Jolyne",
            friend: {
                name: "Alice"
            }
        }
    })
}
```

> **注意**
>
> - 动态添加响应数据：`this.$data.xxx = "yyy"`，不建议这么做
>
> - 建议将暂时没有使用的属性，添加到 `data` 返回对象中，值设置为 `null`

#### `methods`

`methods`：实例对象中的方法，保存在对象中。

- 这些方法最终挂载到组件实例上，通过组件实例调用

- 所有组件实例上的方法都可以在模板中访问

  ```vue
  <script>
  export default {
      methods: {
          test() {
              console.log("Hello world!");
          }
      }
  }
  </script>
  <template>
      <span>{{ test() }}</span>
  </template>   
  ```

- `methods` 中的函数的 `this` 会自动绑定为 组件实例

#### `computed`

##### `getter`

`computed`：计算属性，只在其依赖数据发生变化时，才会重新调用

```vue
<script>
export default {
    data() {
        return {
            stu: {
                name: 'Alice',
                age: 18
            }
        }
    },
    methods: {
        addAge() {
            this.stu.age++;
        },
        delAge() {
            this.stu.age--;
        }
    },
    computed: {
        info() {
            return this.stu.age < 18 ? "未成年" : "成年";
        }
    }
}
</script>
<template>
    <h1>{{ stu.name }} - {{ stu.age }}</h1>
    <!-- <h2>{{ stu.age >= 18 ? "成年" : "未成年" }}</h2> -->
    <h2>{{ info }}</h2>
    <button @click="addAge">增加</button>
    <button @click="delAge">减少</button>
</template>
```

`computed` 和 `methods` 的区别：

- `computed` 计算属性只在其依赖数据发生变化时，才会重新执行；即**会对数据进行缓存**
- `methods` 中的方法每次组件重新渲染都会调用
- `computed` 计算属性是 `getter` 方法，调用时不用加括号 ( `()` )

##### `setter`

如果 `computed` 计算属性中的方法不指定 `setter`，那计算属性永远都是只读的，开发中不建议使计算属性可写

```javascript
export default {
    data() {
        return {
            lastName: 'Dio',
            firstName: 'Brando'
        }
    },
    computed: {
        name: {
            get() {
                return this.lastName + this.firstName;
            },
            set(value) {
                this.lastName = value[0];
                this.firstName = value.slice(1);
            }
        }
    }
}
```

## 组合式 API

**选项式**：传统的  vue 2 代码。通过对象指定内容 ，如： `data`、`methods`、`computed` 等

**组合式**：简化 vue 的配置

### `setup`

- `setup()`：钩子函数。钩子函数向外部暴露组件的配置，通过 `return` 暴露的内容，才能被模板使用

  ```vue
  <script>
  export default {
      setup() {
          let msg = 'Hello vue3!';
          return {
              // 通过return暴露模板需要的内容
              msg
          }
      }
  }
  </script>
  <template>
      <h1>{{msg}}</h1>
  </template>
  ```

  > `setup()` 的特点：
  >
  > - **声明的数据不是响应式数据，只是一个普通变量**
  >
  >   需要通过 `reactive()` 创建响应式数据
  >
  >   ```vue
  >   <script>
  >   import { reactive } from 'vue';
  >   
  >   export default {
  >       setup() {
  >           const obj = reactive({
  >               name: 'Jolyne',
  >               age: 18
  >           });
  >           function updateAge() {
  >               obj.age = 44;
  >           } 
  >           return {
  >               obj,
  >               updateAge
  >           }
  >       }
  >   }
  >   </script>
  >   <template>
  >       <button @click="updateAge">修改年龄</button>
  >       <span>{{obj.age}}岁</span>
  >   </template>
  >   ```
  >
  > - 闭包，具有函数作用域

- 可以直接将 `setup` 定义在 `script` 标签内，不再需要 `return`  暴露和 `export` 导出。模板内容具有相同作用域

  ```vue
  <script setup>
      let msg = 'Hello world!'
  </script>
  
  <template>
      <h1>{{ msg }}</h1>
  </template>
  ```

### 响应式代理

- `reactive()`：**返回一个深层响应式对象**

- `shallowReactive()`：**返回一个浅层响应式对象**。只有**根级别的属性式响应式的**

  > **注意**：`reactive()` 只能返回对象，不能处理原始值

- `ref()`：接收任意值，并返回响应式代理，但**它会将值包装成一个对象** 

  因此，在访问 `ref` 对象时，必须通过 `对象.value` 访问值

  ```javascript
  let count = ref(0); // {value: 0}
  ```

  在 vue 模板中，`ref` 对象会**自动解包**

  ```html
  <template>
  	<div>{{count}}</div>
  </template>
  ```

### `ref` 自动解包

- ~~`$ref()` 语法糖 ( vue3 已废弃 )~~

- `ref` 对象在模板中**必须是顶层对象**

  - 正常映射 `ref` 对象，自动解包

    > ```vue
    > <script setup>
    >     import { ref } from 'vue';
    >     let obj = ref({
    >         name: 'Jolyne',
    >         age: 18
    >     });
    > </script>
    > <template>
    >     <div>{{obj.name}}</div>
    > </template>
    > ```
    >
    > 输出：`Jolyne`

  - **如果数据不是顶层对象，那么就不会自动解包**

    > ```vue
    > <script setup>
    >     import { ref } from 'vue';
    >     let obj = {
    >         age: ref(1)
    >     };
    > </script>
    > <template>
    >     <div>{{obj.age + 1}}</div>
    > </template>
    > ```
    >
    > 输出：`[object Object]1`

    **解决**：**解构赋值** 将底层数据对象结构成顶层对象

    > ```vue
    > <script setup>
    >     import { ref } from 'vue';
    >     let obj = {
    >         age: ref(1)
    >     };
    >     const {age} = obj;
    > </script>
    > <template>
    >     <div>{{age+1}}</div>
    > </template>
    > ```
    >
    > 输出：`2`

### 计算属性

**计算属性**：由于计算属性需要一个函数作为参数， `setup` 具有**函数作用域**，因此可以使用箭头函数

```vue
<script setup>
    import { computed, ref } from 'vue';
    let msg = ref('vue3!');
    let logMsg = computed(() =>  {
        return "Hello  " + msg.value; 
    })
</script>
<template>
    <div>{{logMsg}}</div>
</template>
```

### 模板

**插值**：访问组件声明的变量  - `{{xxx}}`

> - 除了访问组件中的变量，vue 还提供了全局变量，如：`Date`、`Math`、`RegExp` ......
> - 插值内部只能使用表达式 ( 表达式就是带有返回值的语句 )
> - 插值实际上是在修改元素的 `textContent` ，如果内容含有标签，标签会被转义 ( 避免 xss )

`app.config.globalProperties.xxx`：添加全局属性

```vue
app.config.globalProperties.hello = '全局属性！';
```

#### 指令

**指令**：`v-` 开头的称指令，可以为模板设置特殊的属性，设置标签显示内容的方式

- `v-text`：将表达式的值作为元素 textContent 插入，作用同 `{{}}`
