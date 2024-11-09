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