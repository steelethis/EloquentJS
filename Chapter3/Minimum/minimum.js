function min(arg1, arg2) {
    // if arg1 is less than arg2, return arg1.
    if (arg1 < arg2) {
        return arg1;
    }
    // if arg2 is less than arg1, return arg2.
    if (arg2 < arg1) {
        return arg2;
    }

    // if neither of the above are true (if the two are equal, return undefined.)
    return;
}

console.log(min(1, 2));
console.log(min(10, 5));
console.log(min(10, 10));
