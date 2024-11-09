function binarySearch(arr, target) {
    let low = 0; // 最低索引
    let high = arr.length - 1; // 最高索引

    while (low <= high) {
        // 中间索引 
        const mid = Math.floor((low + high) >> 1);
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {// 目标值在右半部分
            low = mid + 1;
        } else {
            // 目标值在左半部分, 提升搜索范围最高索引   
            high = mid - 1;
        }

    }
    return -1;
}