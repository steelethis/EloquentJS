function byTagName(node, tagName) {
    var elementArray = [];

}

console.log(byTagName(document.body, 'h1').length);
// → 1
console.log(byTagName(document.body, 'span').length);
// → 3

const para = document.querySelector('p');
console.log(byTagName(para, 'span').length);
// → 2
