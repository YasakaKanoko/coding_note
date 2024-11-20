# Vue

Vue 是一套**构建用户界面**的**渐进式** JavaScript 框架

**渐进式**：只需轻量小巧的核心库

**特点**：

1. **组件式**：提高代码复用率，更好维护

2. **声明式**：无需直接操作 DOM，提升开发效率

**Vue 官网**：https://v2.cn.vuejs.org/v2/guide/

[awesome-vue](https://github.com/vuejs/awesome-vue)：Vue.js 相关的优秀 Demo 精选列表

[awesome-js](https://awesomejs.dev/for/vue/)：浏览与 Vue 相关的包

## 安装

- 开发版本：包含有帮助的命令行警告

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

  `productionTip`：阻止 vue 启动时生成生产提示

  ```javascript
  Vue.config.productionTip = 'false';
  ```

## Hello Vue

Vue 的核心是采用简洁的模板语法声明式地将数据渲染到 DOM

```html
<!-- 1. 准备好一个容器 -->
<div id="root">
    {{msg}}
</div>
<script>
    // 2. 创建Vue实例
    var vm = new Vue({
        // 3. el: 指定Vue实例为根容器
        el: '#root',
        data: {
            // 4. data: 存储的数据将提供给el容器使用
            msg: 'Hello, Vue!'
        }
    });
    Vue.config.productionTip = 'false';
</script>
```

使用 Vue：

1. **初始化 Vue**：使用前，必须创建 Vue 实例，并传入配置对象
2. **Vue 模板**：root 容器被称为 【Vue 模板】，其代码规范仍符合 html 规范，只是需要配合特殊的 Vue 语法 —— 插值



