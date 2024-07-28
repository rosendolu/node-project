function log(...args) {
    console.log(`[${new Date().toLocaleTimeString()}]: `, ...args);
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
            return reject(`maxCount limit, maxCount`);
        }
        await delay(getMilliSeconds(msFn));
        callback(resolve, reject);
    }
    return new Promise((resolve, reject) => callback(resolve, reject));
}

function getMilliSeconds(arg) {
    if (typeof arg === 'function') {
        return arg();
    }
    return arg;
}

async function delay(ms) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, getMilliSeconds(ms));
    });
}
function isNull(val) {
    return Object.is(val, null);
}

module.exports = {
    isNull,
    log,
    delay,
    createConcurrent,
    waitFor,
};
