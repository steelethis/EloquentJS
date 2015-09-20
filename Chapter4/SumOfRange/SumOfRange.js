function range(start, end, step) {
    if (step === undefined) step = 1;
    var array = [];

    // If step is less than 0 the for loop needs to be set up so that
    // it loops while i is greater than or equal to the end parameter.
    if (step <= 0) {
        for(var i = start; i >= end; i = i + step) {
            array.push(i);
        }
    }
    else {
        for (var i = start; i <= end; i = i + step) {
            array.push(i);
        }
    }

    return array;
}

function sum(numberArray) {
    var sumOfNumbers = 0;
    for (var i = 0; i < numberArray.length; i++) {
        sumOfNumbers += numberArray[i];
    }

    return sumOfNumbers;
}

console.log(sum(range(1,10)));

console.log(sum(range(1, 20, 3)));

console.log(sum(range(5,2,-1)));
