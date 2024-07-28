const { BaseTree, TreeNode } = require('./BaseTree');

class BinaryTree extends BaseTree {
    constructor(val) {
        super();
        this.root = new TreeNode(val);
    }
    insertLeft(parentNode, val) {
        const newNode = new TreeNode(val);
        parentNode.left = newNode;
    }
    insertRight(parentNode, val) {
        const newNode = new TreeNode(val);
        parentNode.right = newNode;
    }
}

module.exports = {
    BinaryTree,
};
