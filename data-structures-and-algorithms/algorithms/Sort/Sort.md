- [排序](#sort)
- [冒泡排序](#bubble-sort)
- [选择排序](#selection-sort)
- [插入排序](#insertion-sort)
- [希尔排序](#shell-sort)
- [归并排序](#merge-sort)
- [快速排序](#quick-sort)
- [堆排序](#heap-sort)
- [基数排序](#radix-sort)
- [计数排序](#counting-sort)

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
function bubbleSort(array) {
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
function bubbleSort(array) {
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
function selectionSort(array) {
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
function insertionSort(array) {
    const { length } = array;

    if (!Array.isArray(array) || array.length <= 1) return array;
    // 循环从 1 开始, 0位置为默认的已排序的序列
    for (let i = 1; i < length; i++) {
        // 当前需要排序的元素
        let key = array[i];
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

# Quick Sort

快速排序（Quicksort）是一种高效的排序算法，采用分治法（Divide and Conquer）策略。它通过选择一个“基准”元素，将数组分成两个子数组，使得左侧的元素都小于基准，右侧的元素都大于基准，然后递归地对这两个子数组进行排序。快速排序的平均时间复杂度为 O(nlog⁡n)，但在最坏情况下为 O(n^2)。

**快速排序的基本步骤**

1. **选择基准**：从数组中选择一个基准元素。
2. **分区**：将数组分成两个部分，左侧是小于基准的元素，右侧是大于基准的元素。
3. **递归排序**：对左侧和右侧的子数组进行递归排序。
4. **合并**：将已排序的子数组合并。

```javascript
function quickSort(arr) {
    if (!Array.isArray(arr) || arr.length <= 1) {
        return arr;
    }
    // 选择基准元素
    const pivot = arr[arr.length - 1];
    // 使用left和right两个数组存储小于和大于基准的元素
    const left = [];
    const right = [];

    // 分区
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    // 递归排序并合并
    return [...quickSort(left), pivot, ...quickSort(right)];
}
```

**代码说明**

- **基准选择**：在这里选择数组的最后一个元素作为基准。
- **分区**：遍历数组，将小于基准的元素放入 `left` 数组，大于基准的元素放入 `right` 数组。
- **递归排序**：对 `left` 和 `right` 数组进行递归排序，并将结果与基准元素合并。

**时间复杂度**

- **最佳情况**：O(nlog⁡n)（基准元素每次都能将数组均匀分割）
- **平均情况**：O(nlog⁡n)
- **最坏情况**：O(n^2)（当数组已经是有序的，且每次选择的基准都是最大或最小元素）

快速排序是一种不稳定的排序算法，但由于其高效性和简单性，广泛应用于实际的排序任务中。为了避免最坏情况，可以使用随机选择基准或三数取中法等优化策略。

# Heap Sort

堆排序（Heap Sort）是一种基于比较的排序算法，利用堆这种数据结构来实现排序。堆是一种特殊的完全二叉树，分为最大堆和最小堆。在最大堆中，父节点的值总是大于或等于其子节点的值，而在最小堆中，父节点的值总是小于或等于其子节点的值。堆排序的时间复杂度为 O(nlog⁡n)，并且是一个不稳定的排序算法。

**堆排序的基本步骤**

1. **构建最大堆**：将无序数组构建成一个最大堆。
2. **交换元素**：将堆顶元素（最大值）与最后一个元素交换，然后将堆的大小减一。
3. **重新堆化**：对堆进行调整，使其重新满足最大堆的性质。
4. **重复步骤2和3**：直到堆的大小为1。

```javascript
// 堆化函数
function heapify(arr, n, i) {
    let largest = i; // 初始化最大元素为根
    let left = 2 * i + 1; // 左子节点
    let right = 2 * i + 2; // 右子节点

    // 如果左子节点比根节点大
    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }

    // 如果右子节点比当前元素大
    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }

    // 如果最大元素不是根
    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];

        // 递归堆化受影响的子树
        heapify(arr, n, largest);
    }
}

function heapSort(arr) {
    if (!Array.isArray(arr) || arr.length <= 1) return arr;
    let n = arr.length;
    // 构建最大堆
    for (let i = Math.floor(n >> 1) - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }

    // 逐一提取元素
    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        // 重新堆化
        heapify(arr, i, 0);
    }
    return arr;
}
```

- **堆化函数**：`heapify` 函数用于维护最大堆的性质。
- **构建最大堆**：在 `heapSort` 函数中，首先从最后一个非叶子节点开始，逐步向上构建最大堆。
- **提取元素**：将堆顶元素（最大值）与当前堆的最后一个元素交换，并减少堆的大小，然后重新堆化。

**时间复杂度**

- **最佳情况**：O(nlog⁡n)
- **平均情况**：O(nlog⁡n)
- **最坏情况**：O(nlog⁡n)

堆排序是一种不稳定的排序算法，适合用于需要在内存中进行排序的场景。由于其时间复杂度在所有情况下都保持 O(nlog⁡n)，因此在处理大规模数据时表现良好。

# Radix Sort

基数排序（Radix Sort）是一种非比较的排序算法，适用于整数或字符串等可以按位比较的类型。它通过将数据分配到不同的桶中，逐位进行排序，最终得到有序的结果。基数排序的时间复杂度为 O(n⋅k)，其中 *n* 是待排序元素的数量，*k* 是元素的最大位数。

**基数排序的基本步骤**

1. **确定最大位数**：找出待排序数组中最大元素的位数。
2. **从最低位到最高位排序**：对每一位使用稳定的排序算法（如计数排序）进行排序。
3. **重复步骤2**：直到所有位都排序完成。

```javascript
function countingSortForRadix(arr, exp) {

    const output = new Array(arr.length); // 输出数组
    const count = new Array(10).fill(0); // 计数数组

    // 统计每个数字出现次数
    for (let i = 0; i < arr.length; i++) {
        const index = Math.floor(arr[i] / exp) % 10;
        count[index]++;
    }

    // 计算累计次数
    for (let i = 1; i < count.length; i++) {
        count[i] += count[i - 1];
    }

    // 构建输出数组
    for (let i = arr.length - 1; i >= 0; i--) {
        const index = Math.floor(arr[i] / exp) % 10;
        output[count[index] - 1] = arr[i];
        count[index]--;
    }

    // 排序后的数组复制回原数组
    for (let i = 0; i < arr.length; i++) {
        arr[i] = output[i];
    }
}

function radixSort(arr) {

    // 找到最大元素
    const max = Math.max(...arr);

    // 从最低位到最高位进行排序
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        countingSortForRadix(arr, exp);
    }
    return arr;
}
```

- **计数排序函数**：`countingSortForRadix` 函数用于对数组的某一位进行排序。
- **基数排序函数**：`radixSort` 函数首先找到最大元素，然后从最低位到最高位进行排序。
- **输出数组**：使用计数排序的结果构建输出数组，并将其复制回原数组。

**时间复杂度**

- **最佳情况**：O(n⋅k)
- **平均情况**：O(n⋅k)
- **最坏情况**：O(n⋅k)

基数排序适合用于处理大量整数或字符串的排序，尤其是在数据范围较小且位数较少的情况下。由于基数排序是稳定的，因此在处理具有相同关键字的元素时，可以保持它们的相对顺序。

# Counting Sort

计数排序（Counting Sort）是一种非比较的排序算法，适用于范围较小的整数排序。它通过统计每个元素出现的次数，然后根据这些计数来确定每个元素在排序后数组中的位置。计数排序的时间复杂度为 O(n+k)，其中 n 是待排序元素的数量，k是元素的范围（最大值与最小值之差）

**计数排序的基本步骤**

1. **找出最大值和最小值**：确定待排序数组中的最大值和最小值，以便创建计数数组。
2. **创建计数数组**：根据最大值和最小值的范围，创建一个计数数组，用于存储每个元素出现的次数。
3. **统计元素出现次数**：遍历原数组，统计每个元素的出现次数，并存储在计数数组中。
4. **计算累计计数**：对计数数组进行累加，以确定每个元素在排序后数组中的最终位置。
5. **构建输出数组**：根据计数数组的值，将元素放入输出数组中。
6. **复制回原数组**：将排序后的元素复制回原数组。

```javascript
function countingSort(arr) {
    const max = Math.max(...arr); // 找到最大值
    const min = Math.min(...arr); // 找到最小值
    const range = max - min + 1; // 计算范围
    const count = new Array(range).fill(0); // 创建计数数组
    const output = new Array(arr.length); // 输出数组

    // 统计每个元素出现的次数
    for (let i = 0; i < arr.length; i++) {
        count[arr[i] - min]++;
    }

    // 计算累计计数
    for (let i = 1; i < count.length; i++) {
        count[i] += count[i - 1];
    }

    // 构建输出数组
    for (let i = arr.length - 1; i >= 0; i--) {
        output[count[arr[i] - min] - 1] = arr[i];
        count[arr[i] - min]--;
    }

    // 将排序后的元素复制回原数组
    for (let i = 0; i < arr.length; i++) {
        arr[i] = output[i];
    }
    return arr;
}
```

**代码说明**

- **最大值和最小值**：使用 `Math.max` 和 `Math.min` 找到数组中的最大值和最小值。
- **计数数组**：创建一个计数数组，大小为 `range`，并初始化为0。
- **统计次数**：遍历原数组，更新计数数组中对应元素的计数。
- **累计计数**：对计数数组进行累加，以确定每个元素在输出数组中的位置。
- **构建输出数组**：从后向前遍历原数组，使用计数数组确定每个元素的位置，并填充到输出数组中。
- **复制回原数组**：将输出数组的内容复制回原数组。

**时间复杂度**

- **最佳情况**：O(n+k)
- **平均情况**：O(n+k)
- **最坏情况**：O(n+k)
