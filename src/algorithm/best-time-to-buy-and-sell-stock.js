// 121. 买卖股票的最佳时机
// https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/

const { log } = require('../hepler');

/**
 * 时间复杂度 O(n^2)
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
    let ans = 0;
    for (let i = 0; i < prices.length; i++) {
        let current = prices[i];
        let maxProfit = 0;

        for (let j = i + 1; j < prices.length; j++) {
            if (prices[j] > current) {
                maxProfit = Math.max(maxProfit, prices[j] - current);
            }
        }
        ans = Math.max(ans, maxProfit);
    }
    return ans;
};

/**
 *  时间复杂度 O(n)
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
    let ans = 0;
    let min = prices[0];
    for (let i = 1; i < prices.length; i++) {
        ans = Math.max(ans, prices[i] - min);
        if (prices[i] < min) {
            min = prices[i];
        }
    }
    return ans;
};

// 122. 买卖股票的最佳时机 II
// https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-ii/description/

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
    let maxProfit = 0;
    for (let i = 1; i < prices.length; i++) {
        if (prices[i] > prices[i - 1]) {
            maxProfit += prices[i] - prices[i - 1];
        }
    }
    return maxProfit;
};

// 123. 买卖股票的最佳时机 III
// https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-iii/

/**
 * @param {number[]} prices
 * @return {number}
 */
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
    if (prices.length == 0) return 0;

    let n = prices.length;
    let buy1 = -prices[0];
    let sell1 = 0;
    let buy2 = -prices[0];
    let sell2 = 0;

    for (let i = 1; i < n; i++) {
        buy1 = Math.max(buy1, -prices[i]);
        sell1 = Math.max(sell1, buy1 + prices[i]);
        buy2 = Math.max(buy2, sell1 - prices[i]);
        sell2 = Math.max(sell2, buy2 + prices[i]);
    }

    return sell2;
};

// 188. 买卖股票的最佳时机 IV
// https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-iv/description/

/**
 * @param {number} k
 * @param {number[]} prices
 * @return {number}
 */
/**
 * @param {number} k
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (k, prices) {
    if (prices.length == 0) return 0;

    let n = prices.length;

    // 如果 k 大于 n/2，说明可以进行无限次交易，相当于无交易次数限制
    if (k > Math.floor(n / 2)) {
        let maxProfit = 0;
        for (let i = 1; i < n; i++) {
            if (prices[i] > prices[i - 1]) {
                maxProfit += prices[i] - prices[i - 1];
            }
        }
        return maxProfit;
    }

    let dp = Array.from({ length: n }, () => Array.from({ length: k + 1 }, () => [0, -Infinity]));

    for (let i = 0; i < n; i++) {
        for (let j = 1; j <= k; j++) {
            if (i === 0) {
                dp[i][j][0] = 0;
                dp[i][j][1] = -prices[i];
            } else {
                dp[i][j][0] = Math.max(dp[i - 1][j][0], dp[i - 1][j][1] + prices[i]);
                dp[i][j][1] = Math.max(dp[i - 1][j][1], dp[i - 1][j - 1][0] - prices[i]);
            }
        }
    }

    let maxProfit = 0;
    for (let j = 0; j <= k; j++) {
        maxProfit = Math.max(maxProfit, dp[n - 1][j][0]);
    }

    return maxProfit;
};

module.exports = { maxProfit };
