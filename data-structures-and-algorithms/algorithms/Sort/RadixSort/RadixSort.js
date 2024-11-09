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