main('buy', 0.015, 5);

async function main(action = 'buy', priceDiff = 0.05, gridCount = 5) {
    const isBuy = action === 'buy';
    try {
        const log = (...args) => console.log(`[${new Date().toLocaleTimeString()}]:`, ...args);
        const table = [
            ...document.querySelector(
                'body > div.simple-chart-detail-modal-root > div > div > div.simple-chart-detail-modal_body'
            )?.childNodes,
        ];
        const [, col_price, col_num] = table;
        const size = col_price.childNodes.length;

        const history = [];
        let total_u = 0,
            total_token = 0;
        for (let index = 1; index < size; index++) {
            const price = parseFloat(col_price.childNodes[index].textContent.split(/\s+/)?.[0]);

            const num = parseFloat(col_num.childNodes[index].textContent.split(/\s+/)?.[0]);
            total_token += num;
            total_u += price * num;
            history.push({ price, average: total_u / total_token, num, total_token, total_u });
        }
        console.table(history);

        const average = history.at(-1).average;
        const actions = new Array(gridCount).fill(0).map((val, i) => {
            return average * (isBuy ? 1 - priceDiff * (i + 1) : 1 + priceDiff * (i + 1));
        });
        console.log(`action: ${action} priceDiff: ${priceDiff} gridCount:${gridCount}`);
        console.table(actions);
    } catch (err) {
        console.error('err:', err);
    }
}
