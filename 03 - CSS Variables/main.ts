const controlsElement = document.querySelector(".controls") as HTMLDivElement;
const spacingInput = document.getElementById("spacing") as HTMLInputElement;
const blurInput = document.getElementById("blur") as HTMLInputElement;
const baseInput = document.getElementById("base") as HTMLInputElement;
const inputs = document.querySelectorAll(".controls input") as NodeListOf<
  HTMLInputElement
>;

// console.log(inputs); // NodeList(3)

// === Attach 'change' event listener to each input using forEach
function handleUpdate(this: HTMLInputElement): void {
  // console.log(this.value);
  // console.log(e.target); // El that initiated event <input>
  // console.log(e.currentTarget); // DOM El that registered event <input>
  // console.log(e.target.value); // Error: 'value' doesn't exist on type EventTarget
  // console.log(e.currentTarget.value); // Error: 'value' doesn't exist on type EventTarget
  // console.log(this); // <input> Same as target
  // ====================
  // Need to update the value on the element to use our custom CSS properties
  // Let's get the suffix value on the element's data-sizing attribute via dataset
  const suffix = (this.dataset.sizing || "") as string;
  // console.log(suffix);

  // Access root node of document (:root/<html>) on the element using el.style.setProperty("--foobar", jsVar);
  // NOTE This is literally adding style="--blur:10px" to the <html> (:root) element!
  // document.documentElement.style.setProperty(`--${this.name}`, this.value); // --spacing:20; --blur:10;
  // FIXME Missing the suffix! Need to concat suffix to the this.value!
  // console.log(this.name);
  document.documentElement.style.setProperty(
    `--${this.name}`,
    this.value + suffix
  ); // --spacing:20px; --blur:10px;

  // FIXME ? Can I just apply these styles to the <img> instead?
  // BROKEN! Too narrow and so it only affects <img> but not our "JS" in the title!
  // document
  //   .querySelector("img")
  //   .style.setProperty(`--${this.name}`, this.value + suffix);
}

inputs.forEach((input) => {
  input.addEventListener("change", handleUpdate);
  // Trigger on mousemove as well so it updates while you drag/slide as well.
  // FIXME Could add conditions/flags of 'click' plus 'mousemove' happen together then true
  input.addEventListener("mousemove", handleUpdate);
});
// inputs.forEach((input) => input.addEventListener("change", handleUpdate));
// inputs.forEach((input) => input.addEventListener("mousemove", handleUpdate));

// // Need to listen for when these input values change
// // === BLUR
// blurInput.addEventListener("change", function (e: Event) {
//   // Need to update the value on the element to use our custom CSS properties
//   // console.log(e.target); // El that initiated event <input>
//   // console.log(e.currentTarget); // DOM El that registered event <input>
//   // console.log(e.target.value); // Error: 'value' doesn't exist on type EventTarget
//   // console.log(e.currentTarget.value); // Error: 'value' doesn't exist on type EventTarget
//   // console.log(this); // <input> Same as target
//   console.log(this.value);
// });

// FIXME Can I use event bubbling or delegation for this? Does the 'change' event.bubbles?
// === updateStyle Handler
function updateStyle(this: HTMLInputElement, e: Event): void {
  // Need to target my input fields
  console.log(e.target);
  console.log(e.currentTarget);
  console.log(this);
  console.log(e.bubbles); // undefined
}

// === USE DELEGATION ON PARENT CONTROLS ELEMENT
controlsElement.addEventListener("change", updateStyle);
