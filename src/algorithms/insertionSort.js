export const insertionSortAnimations = (array) => {
    let tmpArr = array;
    let animations = [];
    insertionSort(tmpArr, animations);
    return animations;
};

const insertionSort = (inputArr, animations) => {
    const length = inputArr.length;

    for (let i = 1; i < length; i++) {
        let key = inputArr[i];
        let j = i - 1;
        while (j >= 0 && inputArr[j] > key) {
            inputArr[j + 1] = inputArr[j];
            animations.push([0, i, j]);
            animations.push([2, j + 1, inputArr[j]]);
            j = j - 1;
        }
        inputArr[j + 1] = key;
        animations.push([2, j + 1, key]);
    }
    console.log(inputArr);
};
