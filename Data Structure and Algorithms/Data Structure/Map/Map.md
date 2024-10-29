# Map

哈希表 ( Hash Map )，又称散列表，通过 `key` 和 `value` 之间的映射，实现高效查询。

即在 `O(1)` 复杂度内获取 `key` 对应的 `value`

|      | Array | ListNode | Map  |
| ---- | ----- | -------- | ---- |
| 查找 | O(n)  | O(n)     | O(1) |
| 添加 | O(1)  | O(1)     | O(1) |
| 删除 | O(n)  | O(n)     | O(1) |

```javascript
const map = new Map();

// 添加元素
map.set(1, 'S');
map.set(2, 'H');
map.set(3, 'I');
map.set(4, 'T');

// 查询
let name = map.get(1);

// 删除
map.delete(2);
```

## 遍历

1. 遍历键值对

   ```javascript
   for (const [k, v] of map.entries()) {
       console.info(k + '->' + v)
   }
   ```

2. 遍历键

   ```javascript
   for (const k of map.keys()) {
       console.info(k)
   }
   ```

3. 遍历值

   ```javascript
   for (const v of map.values()) {
       console.info(v)
   }
   ```

   

# array_hash_map

假设数组的每个空位称为桶 ( `bucket` )

每个桶可以存储一个键值对。查找就是找到 `key` 对应的 `bucket` ，从桶中获取对应的 `value` 

> 如何基于 `key` 定位对应的桶？
>
> 哈希函数 ( Hash Function )：将一个较大的输入空间映射到较小的输出空间
>
> 输入空间：`key`
>
> 输出空间：数组索引

1. 通过哈希算法 hash() 计算哈希值
2. 将哈希值对 桶数量 ( 数组长度 ) `capacity` 取模 ，获取到 `key` 对应的索引 `index`

`index = hash(key) % capacity`

## hash collision

**哈希冲突**：多个输入对应相同输出

`12836 % 100 = 36`

`20336 % 100 = 36`

**哈希扩容**：哈希容量 `n` 越大，多个 `key` 被分配到同一个 `bucket` 中的概率越低

哈希扩容需要将所有的键值迁移到新哈希表，非常耗时；由于哈希容量 `capacity` 改变，通过哈希函数重新计算键值对的存储位置

**负载因子** ( load factor )：当哈希表的元素数量除以桶数量，用于衡量哈希冲突的严重程度，触发哈希表扩容的条件。

> 在 Java 中，负载因子超过 0.75 时，系统自动扩容至原先的 2 倍

理论上，哈希冲突不可避免，

**解决方法**：哈希表扩容。简单粗暴，效率太低

哈希表的**结构改良**：链式地址、开放寻址

###  separate chaining

将单个元素转换为链表，将键值对作为链表节点。

