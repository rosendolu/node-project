const { log } = require('./hepler');

main();
async function main() {
    try {
        function fibonacciDP(n) {
            if (n <= 1) return n;
            const dp = new Array(n + 1);
            dp[0] = 0;
            dp[1] = 1;
            for (let i = 2; i <= n; i++) {
                dp[i] = dp[i - 1] + dp[i - 2];
            }
            console.table(dp);
            return dp[n];
        }

        console.log(fibonacciDP(10)); // 输出 55
    } catch (err) {
        log('err:', err);
    }
}
