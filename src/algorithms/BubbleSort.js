import { swap } from "./AlgorithmsHelpfulMethods";

export const bubbleSortAnimations = (array) => {
    let animations = [];
    bubbleSort(array, animations);
    return animations;
};

const bubbleSort = (array, animations) => {
    const N = array.length;
    for (let i = 0; i < N - 1; i++) {
        for (let j = 0; j < N - i - 1; j++) {
            animations.push([0, j, j + 1]);

            if (array[j] > array[j + 1]) {
                swap(array, j, j + 1);
                animations.push([1, j, j + 1]);
            }
        }
    }
};
