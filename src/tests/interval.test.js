const assert = require('node:assert');
const { describe, test } = require('node:test');
const { log, delay } = require('../hepler');

describe('interval module', async () => {
    test('interval fn', async t => {
        let i = 0;
        await interval(() => {
            i++;
            log('i is ', i);
            if (i == 3) {
                return i;
            }
        });
        assert.equal(i, 3);
        log('1 done');
    });
    test('sleep fn', t => {
        log('sleep fn 1');
    });
    test('sleep fn', t => {
        log('sleep fn 2');
    });
});

async function interval(fn) {
    async function callback(resolve, reject) {
        try {
            let res = await Promise.resolve(fn());
            if (res) {
                return resolve(res);
            }
            await delay(300);
        } catch (err) {
            //
        }
        callback(resolve, reject);
    }
    return new Promise((resolve, reject) => callback(resolve, reject));
}

function self_interval(fn) {
    async function cb() {
        setTimeout(async () => {
            try {
                await Promise.resolve(fn());
            } catch (error) {
                //
            } finally {
                cb();
            }
        }, 1e3);
    }
    cb();
}
