function deepEqual(value1, value2) {
    if ((typeof value1 === "object" && typeof value2 === "object") &&
        (value1 !== null && value2 !== null)) {
        if (Object.keys(value1).length !== Object.keys(value2).length) {
            return false;
        }

        for (var property in value1) {
            if (!value2.hasOwnProperty(property)) {
                return false;
            }
            return deepEqual(value1[property], value2[property]);
        }
    }
    else {
        return value1 === value2;
    }
}


var obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
// true
console.log(deepEqual(obj, {here: 1, object: 2}));
// false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
//true
