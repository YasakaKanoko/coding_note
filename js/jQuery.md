# 第三方库

# jQuery

让操作 DOM 更容易

**官网**：https://jquery.com/

> **CDN**：内容分发网络 ( Content Delivery Network )
>
> 用户访问时，自动选择就近服务器为用户提供资源
>
> 国内：https://bootcdn.cn/

```html
<script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.7.1/jquery.js"></script>
```

**针对 DOM** ：

- 获取
- 创建
- 监听
- 改变

## jQuery 函数

jQuery 提供一个函数，名为 `jQuery`，写作 `$`

```javascript
// 获取类样式为container的所有DOM
const container = $('.container');

// 获取container后类样式为list的兄弟元素
container.nextAll('.list');

// 删除元素
container.remove();


```

