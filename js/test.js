var arr = [[1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10];
// 扁平化
let flatArr = arr.flat(Infinity);
// 去重
let disArr = Array.from(new Set(flatArr));
// 排序
let result = disArr.sort((a, b) => a - b);
console.log(result);
