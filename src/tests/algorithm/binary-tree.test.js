const assert = require('assert/strict');

const { test, describe, beforeEach } = require('node:test');
const { log } = require('../../hepler');
const { BinaryTree } = require('../../algorithm/BinaryTree');

describe('binary-tree', () => {
    let tree = new BinaryTree(2);
    beforeEach(() => {
        tree = new BinaryTree(2);
        tree.insertLeft(tree.root, 1);
        tree.insertRight(tree.root, 3);
    });
    test('traverse', async t => {
        await t.test('preOrder', () => {
            assert.deepEqual([2, 1, 3], tree.toArray('preOrder'));
            assert.deepEqual([2, 1, 3], tree.toArrayLinear('preOrder'));
        });
        await t.test('inOrder', () => {
            assert.deepEqual([1, 2, 3], tree.toArray('inOrder'));
            assert.deepEqual([1, 2, 3], tree.toArrayLinear('inOrder'));
        });
        await t.test('postOrder', () => {
            assert.deepEqual([1, 3, 2], tree.toArray('postOrder'));
            assert.deepEqual([1, 3, 2], tree.toArrayLinear('postOrder'));
        });
    });
});
