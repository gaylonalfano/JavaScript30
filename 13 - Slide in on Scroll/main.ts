// Add debounce function (code provided)

function debounce(
  func: FunctionStringCallback, // {(data: string): void}
  wait: number = 20,
  immediate: boolean = true
): EventListenerOrEventListenerObject {
  let timeout: number | undefined;
  return function (this: Window): void {
    let context = this,
      args = arguments;
    let later = function (): void {
      timeout = undefined;
      if (!immediate) func.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// ===== Select all the images we're going to be listening for
const sliderImages = document.querySelectorAll(
  ".slide-in"
) as NodeListOf<HTMLImageElement>;

// ===== Create a function that runs when user is scrolling ('scroll' event)
function checkSlide(): void {
  // console.log(e.type); // scroll
  // console.count(e.type); // Increases rapidly! With debounce(checkSlide) much better!
  // console.log(window.scrollY); // 2
  // console.log(window.innerHeight); // 350
  // console.log(`bottomLocation: ${window.scrollY + window.innerHeight}`);
  // console.log(this); // Window object
  // === Loop over all images and determine where they need to be shown
  // i.e., when the image is 'peeking' by showing ~50%
  sliderImages.forEach((sliderImage) => {
    // TODO We need our location using scrollY + innerHeight,
    // But, we also need subtract the height of the actual sliderImage
    // to get to the bottom. However, to get the center we divide height by 2.
    const slideInLocation: number =
      window.scrollY + window.innerHeight - sliderImage.height / 2;
    // console.log(`slideIn: ${slideInLocation}`);

    // TODO Need to compute when the image scrolls back out of view (exits the top)
    const imageBottom: number = sliderImage.offsetTop + sliderImage.height;
    const isHalfShown: boolean = slideInLocation > sliderImage.offsetTop;
    const isNotScrolledPast: boolean = window.scrollY < imageBottom;
    console.group("Location details...");
    console.log({ slideInLocation });
    console.log({ imageBottom });
    console.log({ isHalfShown });
    console.log({ isNotScrolledPast });
    console.groupEnd();

    // Toggle the active class to make the images slide in/out
    if (isHalfShown && isNotScrolledPast) {
      sliderImage.classList.add("active");
    } else {
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
