// Use the reduce method in combination with the concat method
// to 'flatten' an array of arrays into a single array that has all the elements
// of the input arrays.

var arrayOfArrays = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

console.log(arrayOfArrays);

// This was kind of hard to understand.
// reduce is taking each element of each array in arrayOfArrays
// concatenating each element of each array into an empty array.
// The result is a flattened version of arrayOfArrays, which gets logged to the
// javascript console
console.log(arrayOfArrays.reduce(function(previous, current) {
  return previous.concat(current);
}, []))
