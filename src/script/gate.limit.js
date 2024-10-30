async function main(maxOrders = 10, triggerPrice, priceDerivation = 1.015, dcaOrderDeviation = 1.15) {
    const arr = new Array(maxOrders).fill(triggerPrice).map((val, i) => val * priceDerivation ** i);
    let sum = 0;

    for (let i = 0; i < arr.length; i++) {
        let priceInput = document.querySelector('#trade_spot_limit_price_input');
        const price = Number(arr[i].toFixed(4));

        if (priceInput) {
            // 设置值为 "1"
            const nativeInputValueSetter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
            nativeInputValueSetter.call(priceInput, price);
            // 创建并触发原生事件，让 React 响应值的变化
            const event = new Event('input', { bubbles: true });
            priceInput.dispatchEvent(event);
            priceInput.focus();
            priceInput.value = price;
        }

        let count = 500 * 1.146 ** i;
        let numInput = document.querySelector('#trade_spot_limit_number_input');
        if (numInput) {
            // 设置值为 "1"
            const nativeInputValueSetter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
            nativeInputValueSetter.call(numInput, count);
            // 创建并触发原生事件，让 React 响应值的变化
            const event = new Event('input', { bubbles: true });
            numInput.dispatchEvent(event);
            numInput.focus();
            numInput.value = count;
        }
        sum += count;

        if (typeof window !== 'undefined') {
            if (!comfirm(`price:${price} count:${count} => ${(count * price).toFixed(2)}`)) {
                return;
            }
            await sleep(1e4);
        }
    }
    console.log({ cost: sum, arr });
}
async function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}
main();
