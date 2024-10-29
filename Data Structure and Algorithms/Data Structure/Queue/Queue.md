# Queue

JavaScript 没有内置的队列，可以把 `Array` 当作队列来使用

时间复杂度 O(1)

- `push()`：入队。元素添加至队尾
- `shift()`：出队。队首元素出队 `O(n)` 
- `peek()`：访问队首元素

```javascript
const queue = [];

// 入队
queue.push(1);
queue.push(2);
queue.push(3);
queue.push(4);
queue.push(5);

// 访问队首元素
const peek = queue[0];

// 出队
queue.shift();

// 获取队列长度
const size = queue.length;

// 判断是否为空
const is_empty = size 
```





# Double-ended Queue

仅能在头部或尾部添加元素

- `push()`：队末添加元素
- `unshift()`：队首添加元素
- `shift()`：队首元素出队
- `pop()`：队末元素出队
- `peekFirst()`：访问队首元素
- `peekLast()`：访问队末元素

```javascript
// 初始化队列
const deque = [];

// 入队
deque.push(3);
deque.push(4);
deque.push(5);
deque.unshift(2);
deque.unshift(1);

// 访问元素
const peekFirst = deque[0];
const peekLast = deque[deque.length - 1];

// 出队
deque.shift();
deque.pop();

// 队列长度
const size = deque.length;

// 判断是否为空
const is_empty = size === 0;
```



