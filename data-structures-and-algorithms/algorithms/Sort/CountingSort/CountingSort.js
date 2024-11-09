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