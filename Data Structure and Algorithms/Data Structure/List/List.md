# List

## 初始化列表

1. 无初始值

   ```javascript
   const nums = [];
   ```

2. 有初始值

   ```javascript
   const nums = [1, 2, 3, 4, 5];
   ```

## 访问

本质是数组，可以在 O(1) 时间内访问和更新元素，效率高

```javascript
// 访问
const num = nums[1];

// 修改
nums[1] = 0;
```

## 插入和删除

- `push()`：在尾部添加
- `splice(index, 0, val)`：在 `index` 处添加 `val`
- `splice(index, num)`：从 `index` 处删除 `num` 个元素

> 在尾部添加元素的时间复杂度是 O(1)，插入和删除的效率和数组相同，时间复杂度是 O(n)

```javascript
// 清空列表
nums.length = 0;

// 在尾部添加元素
nums.push(1);
nums.push(2);
nums.push(3);
nums.push(4);
nums.push(5);

// 中间插入
nums.splice(3, 0, 6); // 在索引3的位置上插入6

// 删除元素
nums.splice(3, 1); // 删除索引3的元素
```

## 遍历

```javascript
let count = 0;
for(let i = 0; i < nums.length; i++) {
    count += nums[i];
}

for(const num of nums) {
    count += num;
}
```

## 拼接

```javascript
const arr = [6, 7, 8, 9];
nums.push(...arr); // concat() 不会改变原数组
```

## 排序

```javascript
// 升序
nums.sort((a, b) => a - b);

// 降序
nums.sort((a, b) => b - a);
```

