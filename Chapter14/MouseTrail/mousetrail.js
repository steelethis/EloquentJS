var body = document.querySelector('body');

var trails = (function() {
    var trailsArray = [];
    for (var i = 0; i < 10; i++) {
        var trail = document.createElement('div');
        trail.setAttribute('class', 'trail');
        trail.setAttribute('id', 'trail_' + i);
        trailsArray.push(trail);
    }

    return trailsArray;
})();

var count = 0;

for (var i = 0; i < 10; i++) {
    document.body.appendChild(trails[i]);
}
body.addEventListener('mousemove', function(event) {
    var trail = document.getElementById('trail_' + (count % 10));
    trail.style.left = event.clientX + 'px';
    trail.style.top = event.clientY + 'px';
    count++;
});