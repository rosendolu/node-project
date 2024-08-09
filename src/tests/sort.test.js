const { describe, test } = require('node:test');

describe('sort', () => {
    test('bubble sort', async t => {
        function bubbleSort(arr) {
            for (let i = 0; i < arr.length - 1; i++) {
                for (let j = 0; j < arr.length - 1 - i; j++) {
                    if (arr[j] > arr[j + 1]) {
                        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    }
                }
            }
            return arr;
        }
    });
    test('selectionSort', t => {
        function selectionSort(arr) {
            for (let i = 0; i < arr.length; i++) {
                let minIndex = i;
                for (let j = i + 1; j < arr.length; j++) {
                    if (arr[j] < arr[i]) {
                        minIndex = j;
                    }
                }
                if (minIndex !== i) {
                    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
                }
            }
            return arr;
        }
    });
    test('insertionSort', t => {
        function insertionSort(arr) {
            for (let i = 1; i < arr.length; i++) {
                let j = i - 1;
                while (j >= 0 && arr[j] > arr[i]) {
                    arr[j + 1] = arr[j];
                    j--;
                }

                arr[j + 1] = arr[i];
            }
            return arr;
        }
    });

    test('customSort', t => {
        function sort(arr) {
            for (let i = 1; i < arr.length; i++) {
                let j = arr.length - i;
                while (j < arr.length) {
                    j++;
                }
            }
        }
    });

    test('quickSort', t => {
        function quickSort(arr) {
            if (arr.length === 1) return arr;
            let pivot = arr[(arr.length / 2 / 2) >> 0];

            const left = [],
                right = [];

            for (let i = 0; i < arr.length; i++) {
                if (arr[i] < pivot) {
                    left.push(arr[i]);
                } else {
                    right.push(arr[i]);
                }
            }

            return quickSort(left).concat(quickSort(right));
        }
    });

    test('mergeSort', t => {
        function mergeSort(arr) {
            if (arr.length === 1) {
                return arr;
            }
            const midIndex = ((arr.length - 1) / 2) >> 0;
            return merge(mergeSort(arr.slice(0, midIndex)), mergeSort(arr.slice(midIndex)));
        }
        function merge(left, right) {
            let result = [];
            let leftIndex = 0,
                rightIndex = 0;
            while (left < left.length && rightIndex < right.length) {
                if (left[leftIndex] < right[rightIndex]) {
                    result.push(left[leftIndex]);
                } else {
                    result.push(right[rightIndex]);
                }
            }

            return result.concat(left.slice(leftIndex), right.slice(rightIndex));
        }
    });
});
