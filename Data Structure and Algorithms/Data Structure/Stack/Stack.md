# 栈

JS 没有内置栈类，将 `Array` 当做栈使用

时间复杂度：O(1)

## 常用操作

- `push()`：入栈 ( 添加至栈顶 )
- `pop()`：出栈
- `peek()`：访问栈顶元素

```javascript
// 初始化栈
const stack = [];

// 入栈
stack.push(1);
stack.push(2);
stack.push(3);
stack.push(4);
stack.push(5);

// 访问栈顶元素
const peek = stack[stack.length - 1];

// 出栈
const pop = stack.pop();

// 获取栈的长度
const size = stack.length;

// 判断是否为空
const is_empty = stack.length === 0;
```

