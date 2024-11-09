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