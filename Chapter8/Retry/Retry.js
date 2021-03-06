function MultiplicatorUnitFailure() {}

function primitiveMultiply(a, b) {
    "use strict";
    if (Math.random() < 0.5) {
        return a * b;
    }
    else {
        throw new MultiplicatorUnitFailure();
    }
}

function reliableMultiply(a, b) {
    "use strict";
    var result;
    try {
        result = primitiveMultiply(a, b);
        return result;
    } catch (e) {
        if (e instanceof MultiplicatorUnitFailure) {
            return reliableMultiply(a, b);
        } else {
            throw e;
        }
    }
}

console.log(reliableMultiply(8, 8));
// 64