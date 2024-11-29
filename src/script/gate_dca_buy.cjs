main();
async function main(priceDiff = 0.05, gridCount = 5) {
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
            history.push({ price, average_sell: total_u / total_token, num, total_token, total_u });
        }
        console.table(history);
        const average_sell = history.at(-1).average_sell;
        const actions = new Array(gridCount).fill(0).map((val, i) => {
            return average_sell * (1 - priceDiff * (i + 1));
        });
        console.table('sell actions', priceDiff, actions);
        //  caculate average price
    } catch (err) {
        console.error('err:', err);
    }
}
