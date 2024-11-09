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