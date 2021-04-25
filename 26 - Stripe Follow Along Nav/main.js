// Get the direct descendants of <ul class='cool'> using ".cool > li"
var triggers = document.querySelectorAll(".cool > li");
// Grab our highlighting/tracking background div
var background = document.querySelector(".dropdownBackground");
var nav = document.querySelector(".top");
// Handlers for mouseenter and mouseleave
function handleEnter() {
    var _this = this;
    // Add a custom class to li element
    this.classList.add("trigger-enter");
    // Add a slight delay before attaching active class to give animation effect
    setTimeout(function () {
        // NOTE Best to add conditional check that class exists otherwise can be janky
        // This ensures that add() never runs unless already have 'trigger-enter'
        if (_this.classList.contains("trigger-enter")) {
            _this.classList.add("trigger-enter-active");
        }
    }, 150);
    // Now let's get our background tracking div displayed
    background.classList.add("open");
    var dropdownCoords = this.querySelector(".dropdown").getBoundingClientRect();
    // console.log("dropdownCoords: ", dropdownCoords);
    var linkCoords = this.getBoundingClientRect();
    // console.log("linkCoords: ", linkCoords);
    // NOTE Wes used navCoords instead of my linkCoords
    var navCoords = nav.getBoundingClientRect();
    // Take the inner dropdownCoords and update style of background tracker
    // Use transform property to apply smooth animation
    // NOTE Can also use background.style.setProperty('width', `${dropdownCoords.width}px`)
    background.style.width = dropdownCoords.width + "px";
    background.style.height = dropdownCoords.height + "px";
    // background.style.transform = `translate(${
    //   dropdownCoords.left + window.scrollX
    // }px, ${dropdownCoords.top + window.scrollY}px)`;  // Too low on Y-axis
    // Let's try to adjust upward by subtracting link distance from top of window
    background.style.transform = "translate(" + dropdownCoords.left + "px, " + (dropdownCoords.top - navCoords.top) + "px)"; //
}
function handleLeave() {
    // Remove the classes when we mouseleave
    this.classList.remove("trigger-enter", "trigger-enter-active");
    // Close the background tracking div
    background.classList.remove("open");
}
// Attach event listeners to our triggers
triggers.forEach(function (trigger) {
    trigger.addEventListener("mouseenter", handleEnter);
});
triggers.forEach(function (trigger) {
    trigger.addEventListener("mouseleave", handleLeave);
});
