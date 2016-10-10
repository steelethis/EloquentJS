var body = document.querySelector('body');

var trails = (function() {
    var trailsArray = [];
    for (var i = 0; i < 10; i++) {
        var trail = document.createElement('div');
        trail.setAttribute('class', 'trail');
        trailsArray.push(trail);
    }

    return trailsArray;
})();

var count = 0;

for (var i = 0; i < 10; i++) {
    document.body.appendChild(trails[i]);
}
body.addEventListener('mousemove', function(event) {

});