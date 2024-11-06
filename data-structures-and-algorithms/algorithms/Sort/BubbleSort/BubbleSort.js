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
