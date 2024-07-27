const { log } = require('../hepler');

class LinkNode {
    constructor(val, next = null) {
        this.value = val;
        this.next = next;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }
    insert(val) {
        if (this.head === null) {
            this.head = new LinkNode(val);
            return;
        }
        // find the last node
        let current = this.head;
        while (current.next !== null) {
            current = current.next;
        }
        // next pointer to the new node
        current.next = new LinkNode(val);
    }
    delete(val) {
        if (!this.head) return;
        // head
        if (this.head.value === val) {
            this.head = this.head.next;
            return;
        }

        let current = this.head;
        while (current.next !== null && current.next.value !== val) {
            current = current.next;
        }
        // middle
        if (current.next !== null) {
            current.next = current.next.next;
        }
        // tail
    }
    find(val) {
        let current = this.head;
        while (current !== null) {
            if (current.value === val) {
                return current;
            }
            current = current.next;
        }

        return null;
    }
    toArray() {
        const result = [];
        let current = this.head;
        while (current !== null) {
            result.push(current.value);
            current = current.next;
        }
        return result;
    }
}

function traverse_linear(head) {
    const result = [];
    let current = head;
    while (current !== null) {
        result.push(current.value);
        current = current.next;
    }
    return result;
}
function traverse_linear_for(head) {
    const result = [];
    for (let node = head; node !== null; node = node.next) {
        result.push(node.value);
    }
    return result;
}

function traverse_recursive(head) {
    let result = [];
    traverse(head);

    function traverse(node) {
        if (!node) return;
        result.push(node.value);
        traverse(node.next);
    }
    return result;
}

module.exports = {
    LinkNode,
    LinkedList,
    traverse_linear_for,
    traverse_linear,
    traverse_recursive,
};
