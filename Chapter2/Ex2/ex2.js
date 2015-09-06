// loops from 1 to 100
// If number is divisible by 3 and 5, print FizzBuzz
// Else, if number is divisible by 3, print Fizz
// Else, if number is divisible by 5, print Buzz
// If none of the above is true, print the number.

for (i = 1; i <= 100; i += 1) {
    if (i % 3 == 0 && i % 5 == 0) {
        console.log("FizzBuzz");
    }
    else if (i % 3 == 0) {
        console.log("Fizz");
    }
    else if (i % 5 == 0) {
        console.log("Buzz");
    }
    else {
        console.log(i);
    }
}
