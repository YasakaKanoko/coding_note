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