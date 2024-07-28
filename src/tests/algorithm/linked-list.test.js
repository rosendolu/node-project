const assert = require('assert/strict');

const { test, describe, before, beforeEach } = require('node:test');
const { log } = require('../../hepler');
const { LinkedList, traverse_linear, traverse_linear_for, traverse_recursive } = require('../../algorithm/LinkedList');

describe('linkedList', () => {
    let list = new LinkedList();

    beforeEach(() => {
        list = new LinkedList();
        Array.from({ length: 5 }, (val, i) => list.insert(i + 1));
    });
    test(':insert and toArray', () => {
        assert.deepStrictEqual(list.toArray(), [1, 2, 3, 4, 5]);
        log('Insert and toArray test passed');
    });

    test(':delete', () => {
        list.delete(2);

        assert.deepStrictEqual(list.toArray(), [1, 3, 4, 5]);
        log('Delete test passed');
    });

    test(':find', () => {
        const node = list.find(2);
        assert.equal(node.value, 2);
        log('Find test passed');
    });

    test(':delete head', () => {
        list.delete(1);

        assert.deepStrictEqual(list.toArray(), [2, 3, 4, 5]);
        log('Delete head test passed');
    });

    test(':delete non-existent value', () => {
        list.delete(4);

        assert.deepStrictEqual(list.toArray(), [1, 2, 3, 5]);
        log('Delete non-existent value test passed');
    });
    test(':tarverse', async t => {
        const arr = [1, 2, 3, 4, 5];
        await t.test(':linear while', t => {
            assert.deepStrictEqual(traverse_linear(list.head), arr);
        });
        await t.test(':linear for', t => {
            assert.deepStrictEqual(traverse_linear_for(list.head), arr);
        });
        await t.test('recursive', t => {
            assert.deepStrictEqual(traverse_recursive(list.head), arr);
        });
    });
});
