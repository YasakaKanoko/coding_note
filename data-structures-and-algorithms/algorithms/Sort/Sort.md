数组自带的 `sort()` 方法

- 升序

  ```javascript
  arr.sort((a, b) => {
      return a - b;
  });
  ```

- 降序

  ```javascript
  arr.sort((a, b) => {
      return b - a;
  });
  ```

# Bubble Sort

冒泡排序 ( Bubble Sort )，重复遍历待排序的数组，每次比较两个相邻的元素，顺序相反则交换位置，每次遍历会将最大 ( 或最小 ) 的元素冒泡到顶端，直至排序完成

**步骤**：

1. **遍历数组**
2. **比较两个相邻元素**
3. **重复遍历**

```javascript
function BubbleSort(array) {
    // 边界检查: 是否为数组或是否长度大于1
    if (!Array.isArray(array) || array.length <= 1) return array;
    
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - 1 - i; j++) {
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]]
            }
        }
    }
    
    return array;
}
```

```javascript
function BubbleSort(array) {
    // 检查输入是否为数组且长度大于 1
    if (!Array.isArray(array) || array.length <= 1) return array

    // 初始化最后一个未排序元素的索引
    let lastIndex = array.length - 1

    // 当还有未排序的元素时, 执行排序过程
    while (lastIndex > 0) {
        // 初始化交换标志为 true, 若本轮未发生交换, 则排序完成
        let flag = true
        // 记录最后一次交换元素的位置, 初始设置为未排序部分的末尾
        const k = lastIndex

        // 遍历未排序部分的元素
        for (let j = 0; j < k; j++) {
            // 若当前元素大于其后面的元素, 则交换它们的位置
            if (array[j] > array[j + 1]) {
                flag = false // 发生了交换, 将标志设置为 false
                lastIndex = j; // 记录最后一次交换的位置
                [array[j], array[j + 1]] = [array[j + 1], array[j]] // 交换元素
            }
        }

        // 若本轮未发生交换, 则数组已经有序, 退出循环
        if (flag) break
    }

    // 返回排序后的数组
    return array
}
```

优化：

- 优化遍历空间：每一轮排序中，最后一次交换位置的元素已经是有序的，下一轮的范围可以限定在上一轮最后一次交换位置之前，减少不必要的操作
- 添加标志位：在一轮排序中没有发生过任何元素的交换，说明数组已经有序，可以提前结束排序
- 针对有序数组部分优化：数组在初始状态下接近有序，可以记录每轮排序最后一次交换位置，然后下一轮排序时只需遍历该位置即可，大大减少排序的比较次数
- 鸡尾酒排序 ( 双向冒泡排序 )：既从左到右，又从右到左交换，在某些特定情况下完成交换

时间复杂度：

- 最优 O(n)
- 最差 O(n)
