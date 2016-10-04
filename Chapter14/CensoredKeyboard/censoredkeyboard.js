var field = document.querySelector("input");

field.addEventListener("keydown", function(event) {
    if (/[qwx]/i.test(event.key)) {
        console.log("Ignored key pressed");
        event.preventDefault();
    }
});
