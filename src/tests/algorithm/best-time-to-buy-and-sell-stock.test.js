const assert = require('assert/strict');

const { test, describe, before, beforeEach } = require('node:test');
const { log } = require('../../hepler');
const { BinarySearchTree } = require('../../algorithm/BinarySearchTree');
const { maxProfit } = require('../../algorithm/best-time-to-buy-and-sell-stock');

describe('best-time-to-buy-and-sell-stock', () => {
    // test('[7,1,5,3,6,4]', () => {
    //     assert.deepEqual(7, maxProfit([7, 1, 5, 3, 6, 4]));
    // });
    test('[1,2,3,4,5]', () => {
        var maxProfit = function (prices) {
            let ans = 0;
            let dp = Array.from({ length: prices.length }, () => new Array(prices.length).fill(0));

            for (let i = 0; i < prices.length - 1; i++) {
                let j = i + 1;
                for (; j < prices.length; j++) {
                    dp[i][j] = Math.max(prices[j] - prices[i], 0) + (i - 1 < 0 ? 0 : dp[i - 1][j - 1]);
                }
            }
            log(dp);
            for (let i = 0; i < prices.length; i++) {
                ans = Math.max(ans, dp[i][prices.length - 1]);
            }
            log(ans);
            return ans;
        };
        assert.deepEqual(4, maxProfit([1, 2, 3, 4, 5]));
    });
});
