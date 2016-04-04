// Convert the ANCESTRY_FILE JSON into an array of objects.
var ancestry = JSON.parse(ANCESTRY_FILE);
console.log(ancestry);

function average(array) {
  	function plus(a, b) { return a + b; }
    	return array.reduce(plus) / array.length;
}

var agesByCentury = {};
ancestry.forEach(function (person) {
  century = Math.ceil(person.died / 100);
  if(agesByCentury[century] == null) {
    agesByCentury[century] = [];
  }
  agesByCentury[century].push(person.died - person.born);
});

console.log(agesByCentury);

for (var century in agesByCentury) {
  console.log(century + ": " + average(agesByCentury[century]).toFixed(1));
}

// TODO:
// For bonus points, write a function groupBy that abstracts the grouping operation
// It should accept as arguments an array and a function that computes the group
// for an element in the array and returns an object that maps group names to arrays
// of group members.
