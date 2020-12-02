// ===== Grab our UI Elements
const addItemsForm = document.querySelector(".add-items") as HTMLFormElement;
const itemsList = document.querySelector(".plates") as HTMLUListElement;
const itemInput = addItemsForm.querySelector("[name=item]") as HTMLInputElement;

// ===== Create an Item interface
interface Item {
  text: string;
  isDone: boolean;
}

// ===== Create an items array to store our data
// TODO Let's also check for existing items in localStorage
const items: Item[] = JSON.parse(localStorage.getItem("items") as string) || [];

// ===== Create our functions
function addItem(this: HTMLFormElement, e: Event): void {
  // console.log(e); // SubmitEvent type="submit"
  // Let's retrieve user input
  const itemText: string = itemInput.value;

  const item: Item = {
    text: itemText,
    isDone: false,
  };

  // Add item to our list
  items.push(item);

  // Create the <li> elements and update itemsList.innerHTML
  populateList(items, itemsList);

  // Update/add to localStorage
  // localStorage.setItem("items", JSON.stringify(items));
  updateLocalStorage("items", items);

  this.reset();

  e.preventDefault();
}

function populateList(plates: Item[] = [], platesList: HTMLUListElement): void {
  // Loop through our plates/items and construct <li> elements for each
  // Could break this up into more variables for readability
  // NOTE We link the <input checkbox> with its <label> via 'id' and 'for' props
  platesList.innerHTML = plates
    .map((plate, i) => {
      return `
      <li>
        <input type="checkbox" data-index=${i} id="item${i}" ${
        plate.isDone ? "checked" : ""
      } />
        <label for="item${i}">${plate.text}</label>
      </li>
    `;
    })
    .join("");
}

function toggleDone(e: Event): void {
  console.log(e); // MouseEvent type='click' or Event type="input"
  console.log(e.target); // type='input' => ALWAYS getting correct <input> element!
  console.log(this); // <ul class="plates">

  // === Using 'click' event (not as good as 'input'!)
  // if (!e.target.matches("input")) return; // Skip this unless it's an <input> element
  // const el = e.target;
  // const index = el.dataset.index;
  // items[index].isDone = !items[index].isDone;
  // localStorage.setItem("items", JSON.stringify(items));
  // populateList(items, itemsList);

  // === Using 'input' event. Let's update the item's isDone value
  // NOTE e.target gives me <input type="checkbox" data-index="0" id="item0"> if Event type="input"
  // which matches to the corresponding <label for="item0">
  // The data-index="0" helps me find the correct Item in items array (and localStorage)!
  // console.group("Input.dataset.index");
  // console.log((e.target as HTMLInputElement).attributes); // NamedNodeMap
  // console.log((e.target as HTMLInputElement).dataset.index); // 0
  // console.log(typeof (e.target as HTMLInputElement).dataset.index); // string
  // console.groupEnd();
  const itemIndex: number = Number(
    (e.target as HTMLInputElement).dataset.index as string
  ); // or use parseFloat(string);

  // Retrieve the item and update isDone
  // console.log(items[Number(itemIndex)]); // true
  items[itemIndex].isDone = !items[itemIndex].isDone;
  // console.log(items[Number(itemIndex)]); // false - WORKS!

  // Update localStorage with updated isDone value
  updateLocalStorage("items", items);
}

function updateLocalStorage(key: string, value: Item[]): void {
  localStorage.setItem(key, JSON.stringify(value));
}

// ===== Add listeners
// == Add 'submit' listener to the form element
addItemsForm.addEventListener("submit", addItem);
// == Add listener to parent <ul> element for event delegation
// itemsList.addEventListener("click", toggleDone);
// NOTE The 'input' event is also an option when dealing with inputs and checkboxes
itemsList.addEventListener("input", toggleDone);

// ===== Run populateList() to retrieve data from localStorage on page load
// NOTE Don't need to use a listener! Just calling the function suffices!
// Originally 'items' doesn't exist on page load but we gave initialized it
// with JSON.parse(localStorage.getItem("items")) || [];
populateList(items, itemsList);
