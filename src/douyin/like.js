const robot = require('robotjs');

main();
async function main() {
    try {
        log('start');
        const run = createConcurrent(2);
        let x = 0,
            y = 0,
            maxX = 0,
            maxY = 0;

        try {
            await waitFor(
                () => {
                    const mouse = robot.getMousePos();
                    maxX = Math.max(maxX, mouse.x);
                    maxY = Math.max(maxY, mouse.y);
                    !x && (x = mouse.x);
                    !y && (y = mouse.y);

                    x = Math.min(x, mouse.x);
                    y = Math.min(y, mouse.y);
                    log('Mouse is at x:' + mouse.x + ' y:' + mouse.y);
                },
                () => 1e3,
                10
            );
        } catch (err) {}

        const offsetX = maxX - x,
            offsetY = maxY - y;

        log('Rect', x, y, `offsetX:${offsetX},offsetY: ${offsetY}`);

        await waitFor(
            async () => {
                // 获取鼠标当前位置
                let mouse = robot.getMousePos();
                log('Mouse is at x:' + mouse.x + ' y:' + mouse.y);

                // 移动鼠标到指定位置 (例如：x = 500, y = 300)
                const finalX = x + getRandomIntInclusive(0, offsetX),
                    finalY = y + getRandomIntInclusive(0, offsetY);

                robot.moveMouse(finalX, finalY);
                log('Mouse moved to', finalX, finalY);

                await Promise.all(
                    new Array(getRandomIntInclusive(1, 30)).fill(0).map((item, index) =>
                        run(async () => {
                            // 执行鼠标左键点击
                            robot.mouseClick('left', true);
                            await delay(getRandomIntInclusive(1, 10) * 1e2);
                            robot.moveMouse(
                                finalX + getRandomIntInclusive(0, 50),
                                finalY + getRandomIntInclusive(0, 50)
                            );
                            log('click', index);
                        })
                    )
                );

                // 将鼠标移回原位置
                log('click end');
            },
            () => getRandomIntInclusive(1, 7) * 1e3
        );
        log('end');
    } catch (err) {
        console.error('err:', err);
    }
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function log(...args) {
    return console.log(`[${new Date().toLocaleTimeString()}]: `, ...args);
}
async function waitFor(fn, msFn, maxCount = -1) {
    let pollCount = 0;

    async function callback(resolve, reject) {
        try {
            const res = await Promise.resolve(fn());
            if (res) {
                return resolve(res);
            }
        } catch (err) {
            log('fn poll err', fn?.name, err);
        }
        pollCount++;
        if (maxCount != -1 && pollCount > maxCount) {
            return reject(`maxCount limit, ${maxCount}`);
        }
        await delay(msFn());
        callback(resolve, reject);
    }

    return new Promise((resolve, reject) => callback(resolve, reject));
}

async function delay(ms) {
    return new Promise(resolve => {
        const id = setTimeout(() => {
            clearTimeout(id);
            resolve(1);
        }, ms);
    });
}

function createConcurrent(concurrency) {
    let pendingCount = 0;
    const queue = [];

    async function concurrentWrapper(callback) {
        if (pendingCount >= concurrency) {
            await new Promise(resolve => queue.push(resolve));
        }

        pendingCount++;
        try {
            await Promise.resolve(callback());
        } finally {
            pendingCount--;
            if (queue.length > 0) {
                const resolve = queue.shift();
                resolve();
            }
        }
    }
    return concurrentWrapper;
}
