// 面试题 10.01. 合并排序的数组
// https://leetcode.cn/problems/sorted-merge-lcci/description/
/**
 * @param {number[]} A
 * @param {number} m
 * @param {number[]} B
 * @param {number} n
 * @return {void} Do not return anything, modify A in-place instead.
 */
var merge = function (A, m, B, n) {
    let i = m - 1; // 指向 A 的有效元素的最后一个位置
    let j = n - 1; // 指向 B 的最后一个元素
    let k = m + n - 1; // 指向 A 的最后一个位置

    // 从后向前填充 A 数组
    while (i >= 0 && j >= 0) {
        if (A[i] > B[j]) {
            A[k] = A[i];
            i--;
        } else {
            A[k] = B[j];
            j--;
        }
        k--;
    }

    // 如果 B 数组还有剩余元素，依次填充到 A 数组前面
    while (j >= 0) {
        A[k] = B[j];
        j--;
        k--;
    }
};
