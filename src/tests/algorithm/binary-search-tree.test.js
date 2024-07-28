const assert = require('assert/strict');

const { test, describe, before, beforeEach } = require('node:test');
const { log } = require('../../hepler');
const { BinarySearchTree } = require('../../algorithm/BinarySearchTree');

describe('BinarySearchTree', () => {
    let tree = new BinarySearchTree();

    beforeEach(() => {
        tree = new BinarySearchTree();
        tree.insert(10);
        tree.insert(5);
        tree.insert(15);
        tree.insert(3);
        tree.insert(7);
        tree.insert(12);
        tree.insert(18);
    });

    test('BinarySearchTree: insert and in-order traversal', () => {
        assert.deepStrictEqual(tree.toArray('inOrder'), [3, 5, 7, 10, 12, 15, 18]);
        log('Insert and in-order traversal test passed');
    });

    test('BinarySearchTree: pre-order traversal', () => {
        assert.deepStrictEqual(tree.toArray('preOrder'), [10, 5, 3, 7, 15, 12, 18]);
        log('Pre-order traversal test passed');
    });

    test('BinarySearchTree: post-order traversal', () => {
        assert.deepStrictEqual(tree.toArray('postOrder'), [3, 7, 5, 12, 18, 15, 10]);
        log('Post-order traversal test passed');
    });

    test('BinarySearchTree: search', () => {
        const node1 = tree.search(10);
        const node2 = tree.search(5);
        const node3 = tree.search(15);
        const node4 = tree.search(99);

        assert.strictEqual(node1.value, 10);
        assert.strictEqual(node2.value, 5);
        assert.strictEqual(node3.value, 15);
        assert.strictEqual(node4, null);
        log('Search test passed');
    });

    test('BinarySearchTree: insert duplicate', () => {
        const tree = new BinarySearchTree();
        tree.insert(10);
        tree.insert(10); // Insert duplicate value
        assert.deepStrictEqual(tree.toArray(), [10]); // Should only contain one instance of 10
        log('Insert duplicate test passed');
    });
});
