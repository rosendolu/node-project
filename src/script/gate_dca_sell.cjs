main('SELL', 0.2147, 0.03, 0, 500, 0.1, 2500, 0.05);

async function main(
    action = 'BUY',
    triggerPrice,
    priceDerivation = 0.015,
    priceMultiple = 0,
    dcaOrderSize,
    dcaOrderMultiple = 0.1,
    maxToken,
    takeProfit = 0.1,
    curPrice = 0.1859
) {
    const isBuy = action == 'BUY';
    let accToken = 0,
        accUsdt = 0;
    const history = [];

    if (isBrowser()) {
        const box = document.querySelector('#trading_dom > div.trading_dom').firstElementChild.firstElementChild;
        if (action === 'BUY') {
            box.firstElementChild.click();
        } else {
            box.lastElementChild.click();
        }
        await sleep();
    }
    for (let i = 0; i < 100; i++) {
        const priceOffset = (isBuy ? 1 - priceDerivation : 1 + priceDerivation) ** i;

        const price = Number((triggerPrice * priceOffset * (1 + priceMultiple)).toFixed(4));

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
        count *= (1 + dcaOrderMultiple) ** i;
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
                await sleep();
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
            diff: price - curPrice,
            count,
            usdt: price * count,
            accUsdt,
            accToken,
            averagePrice,
            [isBuy ? 'sell' : 'buy']: averagePrice * (isBuy ? 1 + takeProfit : 1 - takeProfit),
        });
        if (isBrowser()) {
            await sleep();
            if (!confirm(`${action}: price:${price} count:${count} => ${(count * price).toFixed(2)}$`)) {
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
        fs.writeFileSync(path.resolve('dist', `[${action}-${triggerPrice}].json`), JSON.stringify(history));
    }
}
async function sleep(ms = 5e2) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}
function isBrowser() {
    return typeof window !== 'undefined';
}
