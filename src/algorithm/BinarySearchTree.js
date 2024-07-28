const { TreeNode, BaseTree } = require('./BaseTree');

class BinarySearchTree extends BaseTree {
    constructor() {
        super();
        this.root = null;
    }
    insert(val) {
        const newNode = new TreeNode(val);
        if (this.root === null) {
            this.root = newNode;
            return;
        }

        let current = this.root;
        while (current) {
            if (current.value === val) {
                break;
            }
            // find left smallest
            if (val < current.value) {
                if (current.left === null) {
                    current.left = newNode;
                    break;
                }
                current = current.left;
            } else {
                if (current.right === null) {
                    current.right = newNode;
                    break;
                }
                current = current.right;
            }
        }
    }
    search(val) {
        let current = this.root;
        while (current !== null) {
            if (val === current.value) {
                return current;
            }
            current = val < current.value ? current.left : current.right;
        }
        return null;
    }
}

module.exports = {
    BinarySearchTree,
};
