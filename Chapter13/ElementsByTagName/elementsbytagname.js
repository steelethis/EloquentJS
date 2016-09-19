function byTagName(node, tagName) {
    var elementArray = [];

    function findTag(nodeToSearch, nameOfTag) {
        for (let i = 0; i < nodeToSearch.childNodes.length; i++) {
            if (nodeToSearch.childNodes[i].nodeType === document.ELEMENT_NODE) {
                if (nodeToSearch.childNodes[i].tagName.toLowerCase() === nameOfTag) {
                    elementArray.push(nodeToSearch.childNodes[i]);
                }
                if (nodeToSearch.childNodes[i].childNodes.length > 0) {
                    findTag(nodeToSearch.childNodes[i], nameOfTag);
                }
            }
        }
    }

    findTag(node, tagName);
    return elementArray;
}

console.log(byTagName(document.body, 'h1').length);
// → 1
console.log(byTagName(document.body, 'span').length);
// → 3

const para = document.querySelector('p');
console.log(byTagName(para, 'span').length);
// → 2
