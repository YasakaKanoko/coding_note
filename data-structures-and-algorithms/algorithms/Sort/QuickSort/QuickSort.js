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