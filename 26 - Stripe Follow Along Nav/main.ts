// Get the direct descendants of <ul class='cool'> using ".cool > li"
const triggers = document.querySelectorAll(
  ".cool > li"
) as NodeListOf<HTMLLIElement>;

// Grab our highlighting/tracking background div
const background = document.querySelector(
  ".dropdownBackground"
) as HTMLDivElement;

const nav = document.querySelector(".top");

// Handlers for mouseenter and mouseleave
function handleEnter() {
  // Add a custom class to li element
  this.classList.add("trigger-enter");
  // Add a slight delay before attaching active class to give animation effect
  setTimeout(() => {
    // NOTE Best to add conditional check that class exists otherwise can be janky
    // This ensures that add() never runs unless already have 'trigger-enter'
    if (this.classList.contains("trigger-enter")) {
      this.classList.add("trigger-enter-active");
    }
  }, 150);
  // Now let's get our background tracking div displayed
  background.classList.add("open");

  const dropdownCoords = this.querySelector(
    ".dropdown"
  ).getBoundingClientRect();
  // console.log("dropdownCoords: ", dropdownCoords);

  const linkCoords = this.getBoundingClientRect();
  // console.log("linkCoords: ", linkCoords);

  // NOTE Wes used navCoords instead of my linkCoords
  const navCoords = nav.getBoundingClientRect();

  // Take the inner dropdownCoords and update style of background tracker
  // Use transform property to apply smooth animation
  // NOTE Can also use background.style.setProperty('width', `${dropdownCoords.width}px`)
  background.style.width = `${dropdownCoords.width}px`;
  background.style.height = `${dropdownCoords.height}px`;
  // background.style.transform = `translate(${
  //   dropdownCoords.left + window.scrollX
  // }px, ${dropdownCoords.top + window.scrollY}px)`;  // Too low on Y-axis
  // Let's try to adjust upward by subtracting link distance from top of window
  background.style.transform = `translate(${dropdownCoords.left}px, ${
    dropdownCoords.top - navCoords.top
  }px)`; //
}

function handleLeave() {
  // Remove the classes when we mouseleave
  this.classList.remove("trigger-enter", "trigger-enter-active");
  // Close the background tracking div
  background.classList.remove("open");
}

// Attach event listeners to our triggers
triggers.forEach((trigger) => {
  trigger.addEventListener("mouseenter", handleEnter);
});

triggers.forEach((trigger) => {
  trigger.addEventListener("mouseleave", handleLeave);
});
