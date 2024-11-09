# [169. 多数元素](https://leetcode.cn/problems/majority-element/)

给定一个大小为 `n` 的数组 `nums` ，返回其中的多数元素。多数元素是指在数组中出现次数 **大于** `⌊ n/2 ⌋` 的元素。

你可以假设数组是非空的，并且给定的数组总是存在多数元素。

**示例 1：**

```pseudocode
输入：nums = [3,2,3]
输出：3
```

**示例 2：**

```pseudocode
输入：nums = [2,2,1,1,1,2,2]
输出：2
```

**提示：**

- `n == nums.length`
- `1 <= n <= 5 * 10^4`
- `-10^9 <= nums[i] <= 10^9`

**进阶：**尝试设计时间复杂度为 O(n)、空间复杂度为 O(1) 的算法解决此问题。

摩尔投票法：

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
    let count = 0;
    let c;
    for (let num of nums) {
        if (count === 0) c = num;
        count += c === num ? 1 : -1;
    }
    return c;
};
```

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
    if (nums.length === 1) return nums[0];
    nums.sort((a, b) => a - b);
    let low = 0;
    let high = nums.length - 1;
    const mid = Math.floor((low + high) >> 1);
    if (nums[mid] < nums[mid + 1]) {
        return nums[mid];
    } else {
        return nums[mid + 1];
    }
    return -1;
};
```

分治

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
    function countInRange(nums, num, left, right) {
        let count = 0;
        for (let i = left; i <= right; i++) {
            if (nums[i] === num) {
                count++;
            }
        }
        return count;
    }
    // 分治算法主函数
    function majorityElementRec(nums, left, right) {
        // 基本情况：只有一个元素时
        if (left === right) {
            return nums[left];
        }

        // 将数组分成左右两部分
        const mid = Math.floor((left + right) / 2);
        const leftMajority = majorityElementRec(nums, left, mid);
        const rightMajority = majorityElementRec(nums, mid + 1, right);

        // 如果左右部分的多数元素相同，则返回该元素
        if (leftMajority === rightMajority) {
            return leftMajority;
        }

        // 否则统计左右多数元素在整个区间内的出现次数
        const leftCount = countInRange(nums, leftMajority, left, right);
        const rightCount = countInRange(nums, rightMajority, left, right);

        // 返回出现次数较多的元素
        return leftCount > rightCount ? leftMajority : rightMajority;
    }

    // 调用递归函数，从整个数组开始
    return majorityElementRec(nums, 0, nums.length - 1);
};
```

