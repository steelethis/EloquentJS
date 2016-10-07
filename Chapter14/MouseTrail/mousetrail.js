var body = document.querySelector('body');

body.addEventListener('mousemove', function(event) {
    console.log('Mouse movement detected, X: ' + event.clientX + ' Y: ' + event.clientY);
});