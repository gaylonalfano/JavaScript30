// Add debounce function (code provided)
function debounce(func, // {(data: string): void}
wait, immediate) {
    if (wait === void 0) { wait = 20; }
    if (immediate === void 0) { immediate = true; }
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = undefined;
            if (!immediate)
                func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow)
            func.apply(context, args);
    };
}
// ===== Select all the images we're going to be listening for
var sliderImages = document.querySelectorAll(".slide-in");
// ===== Create a function that runs when user is scrolling ('scroll' event)
function checkSlide() {
    // console.log(e.type); // scroll
    // console.count(e.type); // Increases rapidly! With debounce(checkSlide) much better!
    // console.log(window.scrollY); // 2
    // console.log(window.innerHeight); // 350
    // console.log(`bottomLocation: ${window.scrollY + window.innerHeight}`);
    // console.log(this); // Window object
    // === Loop over all images and determine where they need to be shown
    // i.e., when the image is 'peeking' by showing ~50%
    sliderImages.forEach(function (sliderImage) {
        // TODO We need our location using scrollY + innerHeight,
        // But, we also need subtract the height of the actual sliderImage
        // to get to the bottom. However, to get the center we divide height by 2.
        var slideInLocation = window.scrollY + window.innerHeight - sliderImage.height / 2;
        // console.log(`slideIn: ${slideInLocation}`);
        // TODO Need to compute when the image scrolls back out of view (exits the top)
        var imageBottom = sliderImage.offsetTop + sliderImage.height;
        var isHalfShown = slideInLocation > sliderImage.offsetTop;
        var isNotScrolledPast = window.scrollY < imageBottom;
        console.group("Location details...");
        console.log({ slideInLocation: slideInLocation });
        console.log({ imageBottom: imageBottom });
        console.log({ isHalfShown: isHalfShown });
        console.log({ isNotScrolledPast: isNotScrolledPast });
        console.groupEnd();
        // Toggle the active class to make the images slide in/out
        if (isHalfShown && isNotScrolledPast) {
            sliderImage.classList.add("active");
        }
        else {
            sliderImage.classList.remove("active");
        }
    });
}
// ===== Add scrolling listener to window
// FIXME To not overwhelm the browser, we need to run debounce()
// Need to wrap our checkSlide() function with debounce() to only run
// every 20ms instead.
// FIXME How to add Type for e:Event - FunctionStringCallback data:string?
// There doesn't seem to be a 'FunctionEventCallback' or whatever...
window.addEventListener("scroll", debounce(checkSlide));
