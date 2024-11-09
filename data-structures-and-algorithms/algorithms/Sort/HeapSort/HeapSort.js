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