- [排序](#sort)
- [冒泡排序](#bubble-sort)
- [选择排序](#selection-sort)
- [插入排序](#insertion-sort)
- [希尔排序](#shell-sort)
- [归并排序](#merge-sort)
- 

# `sort()`

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
    if (!Array.isArray(array) || array.length <= 1) return array;

    // 初始化最后一个未排序元素的索引
    let lastIndex = array.length - 1;

    // 当还有未排序的元素时, 执行排序过程
    while (lastIndex > 0) {
        // 初始化交换标志为 true, 若本轮未发生交换, 则排序完成
        let flag = true;
        // 记录最后一次交换元素的位置, 初始设置为未排序部分的末尾
        const k = lastIndex;

        // 遍历未排序部分的元素
        for (let j = 0; j < k; j++) {
            // 若当前元素大于其后面的元素, 则交换它们的位置
            if (array[j] > array[j + 1]) {
                flag = false; // 发生了交换, 将标志设置为 false
                lastIndex = j; // 记录最后一次交换的位置
                [array[j], array[j + 1]] = [array[j + 1], array[j]]; // 交换元素
            }
        }

        // 若本轮未发生交换, 则数组已经有序, 退出循环
        if (flag) break;
    }

    // 返回排序后的数组
    return array;
}
```

**优化**：

- 优化遍历空间：每一轮排序中，最后一次交换位置的元素已经是有序的，下一轮的范围可以限定在上一轮最后一次交换位置之前，减少不必要的操作
- 添加标志位：在一轮排序中没有发生过任何元素的交换，说明数组已经有序，可以提前结束排序
- 针对有序数组部分优化：数组在初始状态下接近有序，可以记录每轮排序最后一次交换位置，然后下一轮排序时只需遍历该位置即可，大大减少排序的比较次数
- 鸡尾酒排序 ( 双向冒泡排序 )：既从左到右，又从右到左交换，在某些特定情况下完成交换

时间复杂度：

- 最优 O(n)
- 最差 O(n^2)

# Selection Sort

选择排序 ( Selection Sort ) 是简单的比较排序，从未排序的数组中找到最大 ( 或最小 ) 的元素，将其放置数组的起始位置，剩余部分继续寻找最大 ( 或最小 ) 元素，直到排序完成。

**步骤**：

1. **初始状态**：将序列看成两个部分，一个已排序的，一个未排序的
2. **遍历未排序部分**：遍历未排序部分，找到最大 ( 或最小 ) 元素
3. **交换元素**：将找到的最大 ( 或最小 ) 元素与未排序部分的第一个元素交换位置，使得找到最小元素成为已排序部分的最后一个元素
4. **扩大已排序的部分**：已排序部分的长度 + 1，未排序部分长度 - 1
5. **重复**：重复以上步骤，直到排序完毕

```javascript
function SelectionSort(array) {
    // 解构赋值: 获取数组长度
    const { length } = array;

    // 如果数组不存在或数组长度小于等于1, 直接返回, 不排序
    if (!Array.isArray(array) || array.length <= 1) return array;

    // 外层循环, 遍历整个数组, 每次找到当前未排序部分的最小元素放到已排序部分的末尾
    for (let i = 0; i < length - 1; i++) {
        // 当前循环最小元素的索引
        let minIndex = i;
        // 内层循环, 从当前元素的下一个位置遍历, 找到未排序部分的最小元素
        for (let j = i + 1; j < length; j++) {
            // 找到更小元素
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            // 找到更小元素, 使用解构赋值交换
            [array[i], array[minIndex]] = [array[minIndex], array[i]];
        }
    }
    return array;
}
```

**时间复杂度:**

- **最佳情况:** O(n²) 即使数组已排序，算法仍然需要进行 n -1 次遍历。
- **平均情况:** O(n²)
- **最坏情况:** O(n²) 当数组反向排序时。

**空间复杂度:** O(1) 选择排序是原地排序算法，不需要额外的空间。

**优缺点:**

**优点:**

- 简单易懂，实现起来比较容易。
- 原地排序，空间效率高。
- 对近乎排序的数组效率略高，因为交换次数少。

**缺点:**

- 时间复杂度为 O(n²)，效率较低，不适合处理大型数据集。
- 对于已经排序或接近排序的数组，效率仍然很低。

# Insertion Sort

插入排序 ( Insertion Sort ) 是一种简单的比较排序算法，它的基本思想将排序数组分成已排序和未排序的两部分，初始时已排序部分只有一个元素（即数组的第一个元素），然后从未排序部分依次取出元素，将其插入到已排序部分的正确位置，直到所有元素都被插入完成。

**步骤：**

1. **已排序序列：** 算法开始时，数组的第一个元素被认为是已排序的序列。
2. **待排序元素：** 从第二个元素开始，依次将每个元素视为待排序元素。
3. **插入：** 将待排序元素与已排序序列中的元素进行比较，找到其应该插入的位置。
4. **移动元素：** 将已排序序列中大于待排序元素的元素向后移动一个位置，为待排序元素腾出空间。
5. **插入元素：** 将待排序元素插入到找到的位置。
6. **重复：** 重复步骤 2-5，直到所有元素都被排序。

```javascript
function InsertionSort(array) {
    const { length } = array;

    if (!Array.isArray(array) || array.length <= 1) return array;
    // 循环从 1 开始, 0位置为默认的已排序的序列
    for (let i = 1; i < length; i++) {
        // 当前需要排序的元素
        let key = arr[i];
        // 已排序的最后一个元素的索引
        let j = i - 1;
        // 在已排序的序列中比较, 如果比需要排序的元素大, 就依次向后移动位置
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            j--;
        }
        // 在找到的位置处插入元素
        array[j + 1] = key;
    }
    return array;
}
```

**时间复杂度:**

- **最佳情况:** O(n) 当数组已经排序时，只需要遍历一次数组即可。
- **平均情况:** O(n²)
- **最坏情况:** O(n²) 当数组反向排序时。

**空间复杂度:** O(1) 插入排序是原地排序算法，不需要额外的空间。

# Shell Sort

希尔排序 ( Shell Sort ) 是一种改进的插入排序算法，也被称为 " 缩小增量排序 "。基本思想是通过定义一个间隔序列（称为增量序列），将待排序数组分成若干个子序列，对每个子序列进行插入排序。随着排序的进行，增量序列逐渐缩小，直到增量为 1，最后对整个数组进行插入排序。

步骤：

1. **选择增量序列**：定义一个增量序列，确定每个增量值（间隔），通常以递减的方式选择。
2. **分组排序**：将待排序数组根据当前增量值分成若干个子序列，对每个子序列进行插入排序。
3. **逐步缩小增量**：重复上述步骤，逐步缩小增量值，直到增量为 1。
4. **最终排序**：当增量为 1 时，对整个数组进行一次插入排序，完成排序过程。

```javascript
function shellSort(array) {
    // 解构赋值: 获取数组长度
    const { length } = array;

    // 如果数组不存在或数组长度小于等于1, 直接返回, 不排序
    if (!Array.isArray(array) || array.length <= 1) return array;

    // 第一层循环: 确定增量的大小, 每次增量的大小减半
    for (let gap = parseInt(length >> 1); gap >= 1; gap = parseInt(gap >> 1)) {
        // 对每个分组使用插入排序, 相当于将插入排序的 1 换成了 gap
        for (let i = gap; i < length; i++) {
            const temp = array[i]; // // 保存当前元素
            let j = i;

            // 第二层循环: 对当前分组进行插入排序
            // 如果 j - gap >= 0 并且前一个元素大于当前元素，则进行交换
            while (j - gap >= 0 && array[j - gap] > temp) {
                array[j] = array[j - gap]; // // 将前一个元素后移
                j -= gap; // 继续比较下一个分组内的元素
            }
            array[j] = temp; // 插入元素到正确的位置
        }
    }
    return array;
}
```

- **增量选择**：从数组长度的一半开始，逐步减小到1。
- **插入排序**：在每个增量下，对相应的子数组进行插入排序。
- **时间复杂度**：最坏情况下为 O(n2)*O*(*n*2)，平均情况下为 O(nlog⁡n)*O*(*n*log*n*)，最佳情况下为 O(n)*O*(*n*)（当数组基本有序时）。

希尔排序是一种不稳定的排序算法，适合用于大规模数据的排序。通过减少元素之间的距离，可以提高插入排序的效率。

# Merge Sort

归并排序（Merge Sort）是一种有效的排序算法，采用分治法（Divide and Conquer）策略。它将数组分成两个子数组，分别对这两个子数组进行排序，然后将它们合并成一个有序的数组。归并排序的时间复杂度为 O(nlog⁡n)，并且是稳定的排序算法。

**归并排序的基本步骤**

1. **分解**：将数组分成两个子数组，直到每个子数组只有一个元素。
2. **合并**：将两个已排序的子数组合并成一个有序数组。
3. **递归**：重复上述步骤，直到整个数组排序完成。

```javascript
function merge(left, right) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    // 合并两个已排序的数组
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }
    // 将剩余的元素添加到结果数组中
    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}
function mergeSort(arr) {
    const { length } = arr;

    // 如果不是数组或者数组长度小于等于 0, 直接返回, 不需要排序
    if (!Array.isArray(arr) || length <= 1) return arr;
    // 找到中间索引
    const mid = Math.floor(length >> 1);
    // 递归地对左右两部分进行归并排序
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));

    // 合并已排序的左右部分
    return merge(left, right);
}
```

**合并函数**：`merge` 函数用于合并两个已排序的数组。

**递归函数**：`mergeSort` 函数用于递归地将数组分成两部分并排序。

**基本情况**：当数组长度小于等于1时，直接返回该数组，因为它已经是有序的

**时间复杂度**

- **最佳情况**：O(nlog⁡n)
- **平均情况**：O(nlog⁡n)
- **最坏情况**：O(nlog⁡n)

归并排序适合用于大规模数据的排序，尤其是在需要稳定排序的情况下。由于归并排序需要额外的空间来存储合并后的数组，因此其空间复杂度为 O(n)。
