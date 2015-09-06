// Original function
// function countBs(string) {
//     var bCount = 0;
//
//     for (var i = 0; i < string.length; i++) {
//         // If the character at index 'i' in the string is 'B'
//         // Add 1 to the bCount
//         if (string.charAt(i) == "B") {
//             bCount++;
//         }
//     }
//
//     return bCount;
// }

// Refactored with two methods.

function countChar(string, character) {
    var charCount = 0;

    for (var i = 0; i < string.length; i++) {
        if (string.charAt(i) == character) {
            charCount++;
        }
    }

    return charCount;
}

function countBs(string) {
    return countChar(string, "B");
}

// Prints 3 to console.
console.log(countBs("BUBBLE"));
