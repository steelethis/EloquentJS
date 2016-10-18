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
    var mouseX = event.clientX;
    var mouseY = event.clientY;

    count++;
    requestAnimationFrame(attractor(mouseX, mouseY));
});

function attractor(mouseX, mouseY) {
    var speed = 0.80;
    var trailSpacing = 5;
    for (var i = 0; i < trails.length; i++) {
        var trail = document.getElementById('trail_' + i);
        var trailX = trail.getBoundingClientRect().left;
        var trailY = trail.getBoundingClientRect().top;

        if (trailX < mouseX) {
            trail.style.left = (trailX + speed) + (trailSpacing * i) + 'px';
        }
        if (trailX > mouseX) {
            trail.style.left = (trailX - speed) - (trailSpacing * i) + 'px';
        }
        if (trailY < mouseY) {
            trail.style.top = (trailY + speed) + (trailSpacing * i) + 'px';
        }
        if (trailY > mouseY) {
            trail.style.top = (trailY - speed) - (trailSpacing * i) + 'px';
        }
    }

}