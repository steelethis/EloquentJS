function every(array, action) {
  for (var i = 0; i < array.length; i++) {
    if(action(array[i]) === false) {
      return action(array[i]);
    }
  }

  return action(array[i]);
}

function some(array, action) {
  for (var i = 0; i < array.lenght; i++) {
    if(action(array[i]) === true) {
      return action(array[i]);
    }
  }

  return action(array[i]);
}

console.log(every([NaN, NaN, NaN], isNaN));

console.log(every([NaN, NaN, 4], isNaN));

console.log(some([NaN, 3, 4], isNaN));

console.log(some([2, 3, 4], isNaN));
