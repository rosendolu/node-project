// 55. 跳跃游戏
// https://leetcode.cn/problems/jump-game/description/

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
    let maxReach = 0;
    for (let i = 0; i < nums.length; i++) {
        //
        if (i > maxReach) {
            return false;
        }
        maxReach = Math.max(maxReach, i + nums[i]);
    }
    return maxReach >= nums.length - 1;
};

// 45. 跳跃游戏 II
// https://leetcode.cn/problems/jump-game-ii/description/

/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function (nums) {
    let jumps = 0;
    let currentEnd = 0;
    let maxReach = 0;

    for (let i = 0; i < nums.length - 1; i++) {
        maxReach = Math.max(maxReach, i + nums[i]);

        if (i == currentEnd) {
            jumps++;
            currentEnd = maxReach;
        }

        if (currentEnd >= nums.length - 1) {
            break;
        }
    }

    return jumps;
};

// 1306. 跳跃游戏 III
// https://leetcode.cn/problems/jump-game-iii/description/

/**
 * @param {number[]} arr
 * @param {number} start
 * @return {boolean}
 */
var canReach = function (arr, start) {
    let n = arr.length;
    let visited = new Array(n).fill(false);
    let queue = [start];

    while (queue.length > 0) {
        let current = queue.shift();

        if (arr[current] === 0) {
            return true;
        }

        if (visited[current]) {
            continue;
        }

        visited[current] = true;

        let nextPos1 = current + arr[current];
        let nextPos2 = current - arr[current];

        if (nextPos1 < n && !visited[nextPos1]) {
            queue.push(nextPos1);
        }

        if (nextPos2 >= 0 && !visited[nextPos2]) {
            queue.push(nextPos2);
        }
    }

    return false;
};

/**
 * @param {number[]} arr
 * @param {number} start
 * @return {boolean}
 */
var canReachDFS = function (arr, start) {
    let n = arr.length;
    let visited = new Array(n).fill(false);

    function dfs(position) {
        if (position < 0 || position >= n || visited[position]) {
            return false;
        }

        if (arr[position] === 0) {
            return true;
        }

        visited[position] = true;

        return dfs(position - arr[position]) || dfs(position + arr[position]);
    }

    return dfs(start);
};

// 2770. 达到末尾下标所需的最大跳跃次数
// https://leetcode.cn/problems/maximum-number-of-jumps-to-reach-the-last-index/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var maximumJumps = function (nums, target) {
    //
};
