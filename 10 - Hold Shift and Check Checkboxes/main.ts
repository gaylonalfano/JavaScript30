// ===== Grab some UI elements to work with
const inboxElement = document.querySelector(".inbox") as HTMLDivElement;
const itemsDivs = document.querySelectorAll(".item") as NodeListOf<
  HTMLDivElement
>;
const checkboxes = document.querySelectorAll(
  "input[type=checkbox]"
) as NodeListOf<HTMLInputElement>;

// ============= MouseEvent.shiftKey + Children Inputs =============
// NOTE I need access to the individual 'this' of the inputs.
// Plus, I think it'll be easier to work with as I need to mark each
// input I click to keep track of position in list.
// ===== Add event listeners to all the checkboxes + Handler inline


// Add a marker or sorts that tags the lastChecked <input> element
let lastChecked: HTMLInputElement;
let firstChecked: HTMLInputElement;

// TODO ? Need to really better understand why 'this' in a separate handler
// points to the right target element, whereas if I write the handler
// directly inside .addEventListener(), 'this' points to Window object.
// UPDATE If we use a function expression we can use 'this' 
// instead of event.currentTarget.
function handleCheck(e: MouseEvent): void {
  // console.group("Inspecting...")  // Add collapsable output
  console.groupCollapsed("Inspecting...")  // Add collapsable output
  console.log(e.target); // <input type="checkbox">
  console.log(e.currentTarget); // <input type="checkbox">
  console.log(this); // <input type="checkbox">
  console.log(this.attributes); // NamedNodeMap 'type'
  console.log(this.checked); // true
  console.log((e.target as HTMLInputElement).checked); // true
  console.log(e.type); // click
  // console.log(this.propertyName); // undefined
  console.log(this.dataset); // DOMStringMap {} empty
  console.log(`shiftKey?: ${e.shiftKey}`); // boolean
  // console.log(checkboxes.values());
  // console.log(checkboxes.length); // 9
  console.groupEnd();

  /* TODO Need to distinguish between clicks and shiftKey+click
  If it's just a normal click (to enable 'checked') then we 
  mark 'this' as the lastChecked element. Otherwise, if it's
  a shiftKey+click scenario, then we want to mark a firstChecked
  element and then shiftKey+click another element to set it as
  the lastChecked element. Then, we need to loop over entire array
  of checkboxes and check each element to see if it is the between
  firstChecked and lastChecked elements. Otherwise, leave it alone.*/
  let inBetween = false; // Can't access in Console as it's not global scoped
  // FIXME Need to handle the case when they shiftKey+click FIRST vs. normal click
  // In this case, lastChecked is undefined still so we should just treat it like
  // a normal click and assign lastChecked = this
  if (e.shiftKey && this.checked && lastChecked !== undefined) {
    // TODO It's a shiftKey+click AND they are checking the box
    // We're going loop over ALL checkboxes and look for the 
    // first input checked. Then we continue iterating and checking (this.checked = true)
    // for all elements until we get to the lastChecked element.
    // We're going to use a new variable inBetween: boolean and if true,
    // then check the checkbox. 
    checkboxes.forEach((checkbox: HTMLInputElement) => {
      console.log(checkbox);
      // Check whether checkbox === this or === lastChecked
      // NOTE THIS IS THE KEY! Because I'm nesting within a conditional
      // that is referencing this.checked (above), now with this nested if
      // statement I can compare/assert that checkbox === this
      // REMEMBER 'this' refers to the input that just got checked!
      // NOTE 'lastChecked' is almost better named as 'previouslyChecked' I think...
      if (checkbox === this || checkbox === lastChecked) {
        console.group("this || lastChecked")
        console.log("This <input> is either 'this' or lastChecked!")
        // console.log({ inBetween }) // false for FIRST, true for LAST
        console.assert(checkbox === this, "!this => lastChecked");  // Assertion failed
        console.assert(checkbox === lastChecked, "!lastChecked => this"); // Assertion failed
        console.groupEnd();
        // Toggle inBetween value. First checkbox turns true, Second checkbox turns back to false.
        inBetween = !inBetween; 
        console.log("Starting to check them in between...")
      }

      // TODO If inBetween === true then we need to enable the 'checked' property to the checkbox
      if (inBetween) {
        checkbox.checked = true;
      }
    });

    // console.log(`shiftKey+click. lastChecked: ${lastChecked}`)
    // Can I add a unique data-* attribute to 'this' element?
    // this.dataset.shiftClicked = "true" // or "false"
    // this.dataset.clickOrder = "first" // or "last"
  }

  lastChecked = this;

  // // Loop through checkboxes
  // let i: number = 0;
  // checkboxes.forEach((checkbox: HTMLInputElement) => {
  //   console.log(`index: ${i}`);
  //   console.assert(this === lastChecked); // All pass or fail. Doesn't id single <input>
  //   i++
  // })

  // Mark this as the lastChecked item/input
  // lastChecked = this;
}

checkboxes.forEach((checkbox: HTMLInputElement) => {
  checkbox.addEventListener("click", handleCheck);
});

// // ===== Add event listeners to all the checkboxes + Handler inline
// // TODO ? Do I add listeners for all checkboxes?
// // Or should I add one to the parent inbox and listen for bubbling?
// // FIXME ? What TS type to use with 'change' events?
// // SOLVED (e.target as HTMLInputElement).checked
// checkboxes.forEach((checkbox: HTMLInputElement) => {
//   checkbox.addEventListener("click", (e: Event) => {
// console.log(e.target); // <input type="checkbox">
// console.log(this); // Window object
// console.log(this.attributes); // undefined
// console.log(this.checked); // undefined
// console.log((e.target as HTMLInputElement).checked); // TS Error 2339 but it shows true/false!
// console.log(e.type); // change

//     // == Okay, I know the various logs (above)
//     if ((e.target as HTMLInputElement).checked) {
//       console.log("Checked!");
//     } else {
//       console.log("Unchecked!");
//     }
//   });
// });

// ============= MouseEvent.shiftKey + Parent Inbox =============
// NOTE 'click' works with keyboard presses too compared to 'change'
// // ===== ADD MouseEvent.shiftKey event listener
// inboxElement.addEventListener("click", (e: MouseEvent) => {
//   console.log(e.target); // <input type="checkbox"> (or wherever you click)
//   console.log((e.target as HTMLInputElement).checked); // TS Error 2339 if don't Type cast
//   // console.log(this.checked); // undefined
//   // console.log(this); // Window object
//   console.log(e.currentTarget); // <div class="inbox">
//   // Let's see if the e.shiftKey was pressed:
//   console.log(`shiftKey: ${e.shiftKey}`); // boolean
//   console.log((e.target as HTMLInputElement).type); // checkbox || undefined
//   console.log((e.target as HTMLInputElement).attributes); // NamedNodeMap - 'type' (from <input type="checkbox")
//   console.log((e.currentTarget as HTMLDivElement).children); // HTMLCollection [div.item, div.item ...]

//   // === TODO Determine if clicked or clicked with shiftKey
//   // === Determine if <input type="checkbox"> is clicked or not
//   // If so, then toggle the 'checked' attribute.
//   const childrenDivs = Array.from(
//     (e.currentTarget as HTMLDivElement).children
//   ) as HTMLDivElement[];
//   const target = e.target as HTMLInputElement;
//   // console.log(childrenDivs); // Array
//   // console.log(target);
// });

// ================= keypress, change, etc. testing (below) ===============
// // ===== Let's add a global variable denoting e.shiftKey value
// // let shiftKeyPressed: boolean = false;
// let shiftKeyPressed: boolean;
// document.body.addEventListener("keypress", (e: KeyboardEvent) => {
//   // NOTE e.shiftKey = true ONLY when holding down Shift Key!
//   console.log(`SHIFT key pressed: ${e.shiftKey}`);
//   // if (e.shiftKey) {
//   //   shiftKeyPressed = true;
//   // } else {
//   //   shiftKeyPressed = false;
//   // }  // BROKEN

//   // if (e.shiftKey) {
//   //   // Try toggling the value??
//   //   shiftKeyPressed = !shiftKeyPressed;
//   // } // BROKEN - Toggles every shiftKey press

//   // if (e.shiftKey && !shiftKeyPressed) {
//   //   // Try toggling the value??
//   //   shiftKeyPressed = !shiftKeyPressed;
//   // } else {
//   //   shiftKeyPressed = false;
//   // } // BROKEN - Toggles every false

//   // FIXME ? Should I move the shiftKeyPressed var INSIDE this function?
//   // let shiftKeyPressed: boolean;

//   if (e.shiftKey) {
//     shiftKeyPressed = true;
//   } else {
//     shiftKeyPressed = false;
//   }

//   // shiftKeyPressed = e.shiftKey; // BROKEN
//   console.log(`shiftKeyPressed: ${shiftKeyPressed}`);
//   // return e.shiftKey ? true : false;
//   // console.log(`${e.charCode}`);
// });

// // ===== Add 'change' event listeners to all the checkboxes
// // TODO ? Do I add listeners for all checkboxes?
// // Or should I add one to the parent inbox and listen for bubbling?
// // FIXME ? What TS type to use with 'change' events?
// // SOLVED (e.target as HTMLInputElement).checked
// checkboxes.forEach((checkbox: HTMLInputElement) => {
//   checkbox.addEventListener("change", (e: Event) => {
//     console.log("Changed!");
//     console.log(e.target); // <input type="checkbox">
//     console.log(this); // Window object
//     console.log(this.attributes); // undefined
//     console.log(this.checked); // undefined
//     console.log((e.target as HTMLInputElement).checked); // TS Error 2339 but it shows true/false!
//     console.log(e.type); // change

//     // == Okay, I know the various logs (above)
//     if ((e.target as HTMLInputElement).checked) {
//       console.log("Checked!");
//     } else {
//       console.log("Unchecked!");
//     }
//   });
// });

// // ===== Add to parent inbox instead?
// inboxElement.addEventListener("change", (e: Event) => {
//   // FIXME ? Ideally I could modify the e.target directly
//   // by adding/removing the checked attribute but can't.
//   // console.log("Changed!");
//   // console.log(e.target); // <input type="checkbox">
//   // console.log(e.target.checked); // TS Error 2339 but it shows true/false!
//   // console.log(this.checked); // undefined
//   // console.log(e.currentTarget); // <div class="inbox">
//   console.log({ shiftKeyPressed });

//   // == Okay, I know the various logs (above)
//   if ((e.target as HTMLInputElement).checked) {
//     // console.log((e.target.checked = true));
//     console.log("Checked!");
//   } else {
//     // console.log((e.target.checked = false));
//     console.log("Unchecked!");
//   }

//   // == What about shiftKey + 'change'?
//   if ((e.target as HTMLInputElement).checked && shiftKeyPressed === true) {
//     // console.log((e.target.checked = true));
//     console.log("Checked AND SHIFT");
//   }
// });
