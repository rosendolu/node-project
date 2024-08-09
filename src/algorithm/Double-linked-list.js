class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.freq = 1;
        this.prev = null;
        this.next = null;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = new Node(null, null);
        this.tail = new Node(null, null);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    addNode(node) {
        let realTail = this.tail.prev;
        realTail.next = node;
        node.prev = realTail;
        node.next = this.tail;
        this.tail.prev = node;
    }

    removeNode(node) {
        let prev = node.prev;
        let next = node.next;
        prev.next = next;
        next.prev = prev;
    }

    isEmpty() {
        return this.head.next === this.tail;
    }
}

module.exports = {
    Node,
    DoublyLinkedList,
};
