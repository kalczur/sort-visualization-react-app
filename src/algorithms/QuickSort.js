import { swap } from "./AlgorithmsHelpfulMethods";

export const quickSortAnimations = (array) => {
    let animations = [];
    quickSort(array, 0, array.length - 1, animations);
    return animations;
};

function partition(items, left, right, animations) {
    let pivotIdx = Math.floor((right + left) / 2);
    let pivot = items[pivotIdx],
        i = left,
        j = right;
    while (i <= j) {
        while (items[i] < pivot) {
            i++;
            animations.push([0, i, pivotIdx]);
        }
        while (items[j] > pivot) {
            j--;
            animations.push([0, j, pivotIdx]);
        }
        if (i <= j) {
            swap(items, i, j);
            animations.push([1, i, j]);
            i++;
            j--;
        }
    }
    return i;
}

function quickSort(items, left, right, animations) {
    let index;
    if (items.length > 1) {
        index = partition(items, left, right, animations);
        if (left < index - 1) {
            quickSort(items, left, index - 1, animations);
        }
        if (index < right) {
            quickSort(items, index, right, animations);
        }
    }
}
