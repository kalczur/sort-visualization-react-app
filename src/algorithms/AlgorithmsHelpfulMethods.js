export const swap = (array, firstIndex, secondIndex) => {
    let tmp = array[firstIndex];
    array[firstIndex] = array[secondIndex];
    array[secondIndex] = tmp;
};
