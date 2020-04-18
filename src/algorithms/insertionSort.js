export const insertionSortAnimations = (array) => {
    let tmpArr = array;
    let animations = [];
    insertionSort(tmpArr, animations);
    return animations;
};

// TO DO

const insertionSort = (inputArr, animations) => {
    const length = inputArr.length;

    for (let i = 1; i < length; i++) {
        animations.push([0, i, i]);
        let key = inputArr[i];
        let j = i - 1;
        while (j >= 0 && inputArr[j] > key) {
            animations.push([1, j, j + 1]);
            inputArr[j + 1] = inputArr[j];
            j = j - 1;
        }
        inputArr[j + 1] = key;
    }
    return inputArr;
};
