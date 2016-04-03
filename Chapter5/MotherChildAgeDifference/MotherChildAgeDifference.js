// Javascript relies on external libraries to import modules in ES2015, like require.js
// If you put two scripts in the same HTML document, they layer on top of each other.
// ES6 supports an 'import' statement but you can't use it in any browsers yet!

// Convert the ANCESTRY_FILE JSON into an array of objects.
var ancestry = JSON.parse(ANCESTRY_FILE);
console.log(ancestry);

function average(array) {
  function plus(a, b) { return a + b; }
    return array.reduce(plus) / array.length;
}

var byName = {};
ancestry.forEach(function (person) {
  byName[person.name] = person;
});

console.log(byName);


var ageDifference = ancestry.map(function (person) {
  if (byName[person.mother] == null) {
    return null;
  }

  var personBirthDate = byName[person.name].born;
  var motherBirthDate = byName[person.mother].born;

  return personBirthDate - motherBirthDate;
});

console.log(average(ageDifference.filter(function (age) {
  return age != null;
})));
