function sequentialSearch(array, target) {
    // 遍历数组中的每个元素
    for (let i = 0; i < array.length; i++) {
        // 如果当前元素等于目标元素，则返回当前元素的索引
        if (array[i] === target) {
            return i;
        }
    }
    // 如果未找到目标元素，则返回 -1
    return -1;
}