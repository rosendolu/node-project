/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

const { TreeNode } = require('./BaseTree');

/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var zigzagLevelOrder = function (root) {
    if (!root) return [];
    const queue = [root];
    let level = 0,
        ans = [];
    while (queue.length) {
        const currentLevel = [];
        const size = queue.length;
        for (let i = 0; i < size; i++) {
            let node = queue.shift();
            if (level % 2 === 0) {
                currentLevel.push(node.val);
            } else {
                currentLevel.unshift(node.val);
            }
            node.left && queue.push(node.left);
            node.right && queue.push(node.right);
        }
        ans.push(currentLevel);
        level++;
    }
    return ans;
};
