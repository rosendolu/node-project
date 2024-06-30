const assert = require('assert');
const { test, describe } = require('node:test');
const { delay, log, waitFor } = require('../hepler');

describe('hepler module', async () => {
    await test('waitFor ', async t => {
        await assert.rejects(
            async () =>
                await waitFor(
                    () => log('dida'),
                    () => 1e3,
                    10
                )
        );
        log('1 done');
    });
});
