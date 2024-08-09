// LCR 131. 砍竹子 I
// https://leetcode.cn/problems/jian-sheng-zi-lcof/description/

/**
 * @param {number} bamboo_len
 * @return {number}
 */
var cuttingBamboo = function (bamboo_len) {
    if (bamboo_len <= 1) return 0;
    if (bamboo_len === 2) return 1;
    if (bamboo_len === 3) return 2;

    let dp = new Array(bamboo_len + 1).fill(0);
    dp[1] = 1;
    dp[2] = 2;
    dp[3] = 3;

    for (let i = 4; i <= bamboo_len; i++) {
        for (let j = 1; j <= Math.floor(i / 2); j++) {
            dp[i] = Math.max(dp[i], dp[j] * dp[i - j]);
        }
    }

    return dp[bamboo_len];
};
