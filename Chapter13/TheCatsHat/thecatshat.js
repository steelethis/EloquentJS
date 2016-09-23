var cat = document.querySelector("#cat");
var hat = document.querySelector("#hat");

var angle = 0, lastTime = null;

var initialCatPosition = {
    "top": cat.offsetTop,
    "left": cat.offsetLeft
};
var initialHatPosition = {
    "top": hat.offsetTop,
    "left": hat.offsetLeft
};

function animate(time) {
    if (lastTime !== null) {
        angle += (time - lastTime) * 0.001;
    }

    lastTime = time;
    cat.style.top = (initialCatPosition.top + (Math.sin(angle) * 20)) + "px";
    cat.style.left = (initialCatPosition.left + (Math.cos(angle) * 200)) + "px";
    hat.style.top = (initialHatPosition.top + (Math.sin(angle) * -20)) + "px";
    hat.style.left = (initialHatPosition.left + (Math.cos(angle) * -200)) + "px";
    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);