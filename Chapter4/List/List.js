// This is a list
// var list = {value: 1, rest: {value: 3, rest: null}};

function arrayToList(array) {
    var list = null;

    for (var i = array.length - 1; i >= 0; i--) {

        // if we're at the end of the array
        // set object value property to value of array element
        // and the next property to null.
        if (i === array.length ) {
            list = {value: array[i], next: null};
        }

        // next: list is actually assigning the previous value of list
        // to the next property of the object, chaining objects together.
        list = {value: array[i], next: list};
    }

    return list;
}

function listToArray(list) {
    var array = [];

    // When list is a null object, stop looping.
    // while(list) {
    //     array.push(list.value);
    //     list = list.next;
    // }

    for (var node = list; node; node = node.next) {
        array.push(node.value);
    }

    return array;
}

function prepend(element, list) {
    var newList = {value: element, next: list};

    return newList;
}

function nth(list, number) {
    var element = undefined;
    var passes = 0;
    // for (var i = 0; i <= number; i++) {
    //     element = list.value;
    //     list = list.next;
    // }

    for (var node = list; node; node = node.next) {
        if (passes === number) {
            element = list.value
        }
        list = list.next;
        passes++;
    }
    return element;
}

// This was a pain to wrap my head around.
function nthRecursive(list, number) {
    if (list === null) {
        return undefined;
    }
    else if (number === 0) {
        return list.value;
    }

    // If return isn't here, the function never updates its values.
    // It will eventually return whatever was set initially at the first call of the recursion.
    // (In this case it was 'undefined')
    return nthRecursive(list.next, number - 1);

}

// outputs the following:
// {value: 10, next: {value: 20, next: null}}
console.log(arrayToList([10, 20]));

// Outputs [10, 20, 30]
console.log(listToArray(arrayToList([10, 20, 30])));

// Output: {value: 10, next: {value: 20, rest:null}}
console.log(prepend(10, prepend(20, null)));

// Output: 20
console.log(nth(arrayToList([10, 20, 30]), 1));

console.log(nthRecursive(arrayToList([10, 20, 30]), 1));
