// Select the Elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

// Classes names
const CHECK = "fa-check-circle-o";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// Variables
let LIST, id;

// get item from localStorage
let data = localStorage.getItem("TODO");

// Check if data is not empty
if (data) {
  LIST = JSON.parse(data);
  // set the id to the last one in the list
  id = LIST.length;
  // load the list to the user interface
  loadList(LIST);
} else {
  // if data isn't empty
  LIST = [];
  id = 0;
}

// load items to the user's interface
function loadList(array) {
  array.forEach(function (item) {
    addToDo(item.name, item.id, item.done, item.trash);
  });
}

// clear the local storage
clear.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});

// Show today's date

// Options shows how date will be displayed
const options = { weekday: "long", month: "short", day: "numeric" };

// Today gets today's date
const today = new Date();

// This displays the date on the screen
dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// add to do function
function addToDo(toDo, id, done, trash) {
  // if item is in trash, don't run rest of code
  if (trash) {
    return;
  }
  // Check if item is complete
  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : "";

  // The item to add to the list
  const item = `
            <li class="item">
            <i class="fa ${DONE} co" job="complete" id="${id}"></i>
            <p class="text ${LINE}">${toDo}</p>
            <i class="fa fa-trash de" job="delete" id="${id}"></i>
          </li>`;

  // Where to place item in list
  const position = "beforeend";

  // Adds item to list at specified position
  list.insertAdjacentHTML(position, item);
}

// Add an item to the list when user hits the enter key
document.addEventListener("keyup", function (even) {
  if (event.keyCode == 13) {
    const toDo = input.value;

    // if the input isn't empty, add item to list
    if (toDo) {
      addToDo(toDo, id, false, false);

      LIST.push({
        name: toDo,
        id: id,
        done: false,
        trash: false,
      });

      // add item to localStorage (this code must be added where the LIST array is updated)
      localStorage.setItem("TODO", JSON.stringify(LIST));

      // increment id for next item
      id++;
    }

    // return input value back to empty after item is added
    input.value = "";
  }
});

// Complete to do
function completeToDo(element) {
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

  // update List array
  LIST[element.id].done = LIST[element.id].done ? false : true;
}
// remove to do
function removeToDo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);

  LIST[element.id].trash = true;
}

// target the items created dynamically
list.addEventListener("click", function (event) {
  // Return the clicked element inside list
  const element = event.target;

  // Get the job value & return wheither it's complete or delete
  const elementJob = element.attributes.job.value;

  if (elementJob == "complete") {
    completeToDo(element);
  } else if (elementJob == "delete") {
    removeToDo(element);
  }
  // add item to localStorage (this code must be added where the LIST array is updated)
  localStorage.setItem("TODO", JSON.stringify(LIST));
  id++;
});
