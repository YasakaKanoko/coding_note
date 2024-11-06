let arr = [1, 2, 3, 4, 5, 4, 3, 2, 1];
arr = [...new Set(arr)];
console.log(arr); // (5) [1, 2, 3, 4, 5]