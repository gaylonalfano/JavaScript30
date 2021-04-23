const triggers = document.querySelectorAll(
  "a"
) as NodeListOf<HTMLAnchorElement>;

// Create a highlight span element
const highlight = document.createElement("span") as HTMLSpanElement;
// Add a CSS class of 'highlight' to this element;
highlight.classList.add("highlight");
// Insert into the DOM. Adds <span> to bottom of body
// NOTE Can't see it bc it doesn't have width/height
document.body.append(highlight);

// Listen for when user enters a link
function highlightLink() {
  // console.log(this, "highlight!");
  // Next, need to find the width/height of the element we're hovering over
  // and where on the page is it located using this.getBoundingClientRect();
  const linkCoords = this.getBoundingClientRect();
  console.log(linkCoords);
  // Now that we have coords let's apply styles to our highlight to match
  // Method 1: Pure CSS properties
  // NOTE Only need left and top (right/bottom alone doesn't work!). Don't need all.
  // highlight.style.width = `${linkCoords.width}px`;
  // highlight.style.height = `${linkCoords.height}px`;
  // highlight.style.left = `${linkCoords.left}px`;
  // highlight.style.right = `${linkCoords.right}px`;
  // highlight.style.top = `${linkCoords.top}px`;
  // highlight.style.bottom = `${linkCoords.bottom}px`;

  // Method 2: Using Transform property to apply for smoother animation
  highlight.style.width = `${linkCoords.width}px`;
  highlight.style.height = `${linkCoords.height}px`;
  // NOTE You only need top/left
  highlight.style.transform = `translate(${
    linkCoords.left + window.scrollX
  }px, ${linkCoords.top + window.scrollY}px)`;

  // IMPORTANT It seems to work but if you scroll down a little then it's off.
  // You can compensate using two approaches:
  // 1. You can compute the offset of the PARENT element
  // 2. Compute how far the user has scrolled down and take away from trigger
}

// Listen for mouseenter event on each link/trigger
triggers.forEach((trigger) => {
  trigger.addEventListener("mouseenter", highlightLink);
});
