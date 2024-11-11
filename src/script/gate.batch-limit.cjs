main(0.5, 1.03, 1, 500, 1.1, 3e3, 0.15);
async function main(
    triggerPrice,
    priceDerivation = 1.015,
    priceMultiple = 1,
    dcaOrderSize,
    dcaOrderMultiple = 1.1,
    maxToken,
    takeProfit = 0.1
) {
    let accToken = 0,
        accUsdt = 0;
    const history = [];

    if (isBrowser()) {
        document
            .querySelector('#trading_dom > div.trading_dom > div.row-container > div > div.sc-7a8da2ac-0.hfsuIk')
            ?.click();
        await sleep();
    }
    for (let i = 0; i < 100; i++) {
        const price = Number((triggerPrice * priceDerivation ** i * priceMultiple).toFixed(4));

        if (isBrowser()) {
            let priceInputEle = document.querySelector('#trade_spot_limit_price_input');
            if (priceInputEle) {
                const nativeInputValueSetter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
                nativeInputValueSetter.call(priceInputEle, price);
                // 创建并触发原生事件，让 React 响应值的变化
                const event = new Event('input', { bubbles: true });
                priceInputEle.dispatchEvent(event);
                priceInputEle.focus();
                priceInputEle.value = price;
                // priceInputEle.blur();
            }
            await sleep();
        }
        let count = dcaOrderSize ? dcaOrderSize : Number((100 / triggerPrice).toFixed(4));
        count *= dcaOrderMultiple ** i;
        count = Math.min(maxToken - accToken, count);

        if (isBrowser()) {
            let numInput = document.querySelector('#trade_spot_limit_number_input');
            if (numInput) {
                // 设置值为 "1"
                const nativeInputValueSetter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
                nativeInputValueSetter.call(numInput, count);
                // 创建并触发原生事件，让 React 响应值的变化
                const event = new Event('input', { bubbles: true });
                numInput.dispatchEvent(event);
                // numInput.focus();
                numInput.value = count;
            }
        }
        if (count <= 0) {
            break;
        }
        accToken += count;
        accUsdt += count * price;
        const averagePrice = accUsdt / accToken;
        // console.log(`price:${price} count:${count} sumup:${accToken}`);

        history.push({
            price,
            count,
            usdt: price * count,
            accUsdt,
            accToken,
            averagePrice,
            buy: averagePrice * (1 - takeProfit),
        });
        if (isBrowser()) {
            await sleep();
            if (!confirm(`price:${price} count:${count} => ${(count * price).toFixed(2)}$`)) {
                break;
            }
            await sleep();
            document
                .querySelector('#trading_dom > div.trading_dom > div.tab_body > div > div > div.row > div > button')
                ?.click();
            await sleep();
        }
    }

    const priceChange = `${((history.at(-1).price / history.at(0).price - 1) * 100).toFixed(2)} %`;

    const sumUpText = `OrderCount：${history.length} TokenCount:${accToken} priceChange:${priceChange}`;
    console.log(sumUpText);
    console.table(history);
    const key = `xorder-${new Date().toLocaleString()}`;
    if (isBrowser()) {
        let record = JSON.stringify(
            {
                accToken,
                priceChange,
                history,
            },
            null,
            2
        );
        localStorage.setItem(key, record);
        confirm(sumUpText);
    } else {
        const fs = require('fs');
        const path = require('path');
        fs.writeFileSync(path.resolve('dist', `[${triggerPrice}].json`), JSON.stringify(history));
    }
}
async function sleep(ms = 1e3) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}
function isBrowser() {
    return typeof window !== 'undefined';
}
