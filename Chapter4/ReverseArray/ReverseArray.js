function reverseArray(array) {
    var reversedArray = [];

    for (var i = 0; i < array.length; i++) {
        reversedArray.unshift(array[i]);
    }
    return reversedArray;
}

// [1, 2, 3, 4, 5]
function reverseArrayInPlace(array) {

    // loops over the first half of the array,
    // swapping elements from the opposite side of the array.
    // ie array[0] and array[4], array[1] and array[3], etc.
    for (var i = 0; i < Math.floor(array.length / 2); i++) {
        var holdingvar = array[i];
        // array.length - 1 represents the final element in the array.
        array[i] = array[array.length - 1 - i];
        array[array.length - 1 - i] = holdingvar;
    }
    return array;
}


console.log(reverseArray([1, 2, 3, 4, 5]));

console.log(reverseArrayInPlace([1, 2, 3, 4, 5]));
