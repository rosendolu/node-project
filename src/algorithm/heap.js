class Heap {
    constructor() {
        this.heap = [];
    }
    getParentIndex(index) {
        return ((index - 1) / 2) >> 0;
    }
    getLeftChildIndex(index) {
        return 2 * index + 1;
    }
    getRightChildIndex(index) {
        return 2 * index + 1;
    }
    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }
    insert(val) {
        this.heap.push(val);
        this.heapifyUp();
    }
    size() {
        return this.heap.length;
    }
    heapifyUp() {
        let index = this.size() - 1;
        let parentIndex = this.getParentIndex(index);
        while (parentIndex >= 0 && this.heap[parentIndex] > this.heap[index]) {
            this.swap(parentIndex, index);

            index = parentIndex;
            parentIndex = this.getParentIndex(index);
        }
    }
    remove() {
        if (this.size() === 0) return null;
        if (this.size() === 1) return this.heap.pop();
        const root = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown();
        return root;
    }
    heapifyDown() {
        let index = 0;
        while (this.getLeftChildIndex(index) < this.heap.length) {
            let smallerChildIndex = this.getLeftChildIndex(index);

            if (
                this.getRightChildIndex(index) < this.heap.length &&
                this.heap[this.getRightChildIndex(index)] < this.heap[smallerChildIndex]
            ) {
                smallerChildIndex = this.getRightChildIndex(index);
            }

            if (this.heap[index] < this.heap[smallerChildIndex]) {
                break;
            } else {
                this.swap(index, smallerChildIndex);
            }
            index = smallerChildIndex;
        }
    }
}
