import { swap, compareArrays } from "./AlgorithmsHelpfulMethods";

export const quickSortAnimations = (array) => {
    let tmpArr = array;
    let animations = [];
    quickSort(array, 0, array.length - 1, animations);
    return animations;
};

function partition(items, left, right, animations) {
    var pivot = items[Math.floor((right + left) / 2)], //middle element
        i = left, //left pointer
        j = right; //right pointer
    while (i <= j) {
        while (items[i] < pivot) {
            i++;
            animations.push([0, i, pivot]);
        }
        while (items[j] > pivot) {
            j--;
            animations.push([0, j, pivot]);
        }
        if (i <= j) {
            swap(items, i, j); //sawpping two elements
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
        index = partition(items, left, right, animations); //index returned from partition
        if (left < index - 1) {
            //more elements on the left side of the pivot

            quickSort(items, left, index - 1, animations);
        }
        if (index < right) {
            //more elements on the right side of the pivot

            quickSort(items, index, right, animations);
        }
    }
}
