function isEven(number) {
    // Make number positive so that we can correctly determine evenness.
    // Otherwise the function will call itself recursively forever.
    if (number < 0) {
        number = number * -1;
    }


    // 0 is an even number.
    if (number == 0) {
        return true;
    }
    // 1 is an odd number.
    if (number == 1) {
        return false;
    }
    // Evenness for any other number is the same as N - 2
    // This means that we just subtract 2 until we get 1 or 0, recursively calling
    // isEven until we can return true or false.
    return isEven(number - 2);
}

console.log(isEven(0));
console.log(isEven(1));
console.log(isEven(20));
console.log(isEven(50));
console.log(isEven(75));
console.log(isEven(-1));
console.log(isEven(-80));
