const robot = require('robotjs');

main();
async function main() {
    try {
        log('start');
        const run = createConcurrent(5);
        let x = 0,
            y = 0;

        try {
            await waitFor(
                () => {
                    const mouse = robot.getMousePos();
                    x = mouse.x;
                    y = mouse.y;

                    // x = Math.min(x, mouse.x);
                    // y = Math.min(y, mouse.y);
                    log('Mouse is at x:' + x + ' y:' + y);
                },
                () => 1e3,
                10
            );
        } catch (err) {}

        await waitFor(
            async () => {
                // const mouse = robot.getMousePos();
                // x = mouse.x;
                // y = mouse.y;

                const finalX = x + getRandomIntInclusive(0, 50),
                    finalY = y + getRandomIntInclusive(0, 50);

                robot.moveMouse(finalX, finalY);
                log('Mouse is at x:' + finalX + ' y:' + finalY);

                await Promise.all(
                    new Array(getRandomIntInclusive(50, 100)).fill(0).map((item, index) =>
                        run(async () => {
                            // 执行鼠标左键点击
                            robot.mouseClick('left', true);
                            await delay(getRandomIntInclusive(1, 10) * 1e2);
                            robot.moveMouse(
                                finalX + getRandomIntInclusive(0, 20),
                                finalY + getRandomIntInclusive(0, 20)
                            );
                            log('click', index);
                        })
                    )
                );
                // 将鼠标移回原位置
                log('click end');
            },
            () => getRandomIntInclusive(5, 30) * 1e3
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
