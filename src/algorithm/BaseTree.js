class TreeNode {
    constructor(val, left = null, right = null) {
        this.value = val;
        this.left = left;
        this.right = right;
    }
}

class BaseTree {
    constructor() {
        this.root = null;
    }
    bfs(callback) {
        if (this.root === null) return;
        const queue = [this.root];
        while (queue.length) {
            const item = queue.shift();
            callback(item.value);
            item.left && queue.push(item.left);
            item.right && queue.push(item.right);
        }
    }
    toArrayBFS() {
        const result = [];
        this.bfs(val => result.push(val));
        return result;
    }
    toArrayLinear(order = 'inOrder') {
        let result = [];
        this.traverseLinear(this.root, val => result.push(val), order);
        return result;
    }
    traverseLinear(node, callback, order) {
        if (node === null) return;
        switch (order) {
            case 'preOrder':
                {
                    let stack = [this.root];
                    while (stack.length) {
                        const item = stack.pop();
                        callback(item.value);
                        item.right && stack.push(item.right);
                        item.left && stack.push(item.left);
                    }
                }
                break;
            case 'inOrder':
                {
                    let node = this.root;
                    const stack = [];
                    while (node || stack.length) {
                        while (node) {
                            stack.push(node);
                            node = node.left;
                        }
                        const last = stack.pop();
                        callback(last.value);

                        node = last.right;
                    }
                }
                break;
            case 'postOrder':
                {
                    const stack = [this.root];
                    let result = [];
                    while (stack.length) {
                        const last = stack.pop();
                        result.push(last.value);
                        last.left && stack.push(last.left);
                        last.right && stack.push(last.right);
                    }
                    result.reverse().forEach(val => callback(val));
                }
                break;
        }
    }
    traverseRecursive(node, callback, order) {
        if (node === null) return;
        switch (order) {
            case 'preOrder':
                callback(node.value);
                this.traverseRecursive(node.left, callback, order);
                this.traverseRecursive(node.right, callback, order);
                break;
            case 'inOrder':
                this.traverseRecursive(node.left, callback, order);
                callback(node.value);
                this.traverseRecursive(node.right, callback, order);
                break;
            case 'postOrder':
                this.traverseRecursive(node.left, callback, order);
                this.traverseRecursive(node.right, callback, order);
                callback(node.value);
                break;
        }
    }
    toArray(order = 'inOrder') {
        let result = [];
        this.traverseRecursive(this.root, val => result.push(val), order);
        return result;
    }
}

module.exports = {
    TreeNode,
    BaseTree,
};
