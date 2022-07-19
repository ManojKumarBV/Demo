const tasks = [
  { id: 1, task: "Wash Car", price: "10" },
  { id: 2, task: "Mow Lawn", price: "20" },
  { id: 3, task: "Pull Weeds", price: "30" },
  { id: 4, task: "Pull Clean", price: "40" },
];

let count = 0;
let selectedTasks = [];
const tbodyEl = document.querySelector("tbody");
const taskAdded = document.getElementById("task");
const priceGiven = document.getElementById("price");
const inputBtn = document.getElementById("inputBtn");
const submitEl = document.getElementById("submitBtn");
const deleteBtn = document.getElementById("deleteBtn");
const container = document.getElementById("container");
const costFieldEl = document.getElementById("costField");
const textFieldEl = document.getElementById("textField");

let tasksFromLocalStorage = JSON.parse(localStorage.getItem("selectedTasks"));

if (tasksFromLocalStorage) {
  selectedTasks = tasksFromLocalStorage;
  showInvoice();
}

if (!tasksFromLocalStorage) {
  tasksFromLocalStorage = [];
}

function renderButtons() {
  let taskDOM = "";
  for (let i = 0; i < tasks.length; i++) {
    taskDOM += `<button class="inputBtn" onclick="btnClicked(${i})">${tasks[i].task}: $${tasks[i].price}</button>`;
  }
  container.innerHTML = taskDOM;
}
renderButtons();

function showInvoice() {
  if (tasksFromLocalStorage.length === 0) {
    tbodyEl.innerHTML = [];
  } else {
    tbodyEl.innerHTML = "";
    for (let i = 0; i < tasksFromLocalStorage.length; i++) {
      tbodyEl.innerHTML += `
      <tr>
        <td id="task">${tasksFromLocalStorage[i].task} <span style="color:#d8d8d4;font-size:10px;font-weight:400;" onclick="deleteTask(${i})" id="deleteBtn">remove</span></td>
        <td id="price"><span style="color:#918E9B">$</span>${tasksFromLocalStorage[i].price}</td>
      </tr>`;
      totalAmount();
    }
  }
}

function totalAmount() {
  if (tasksFromLocalStorage.length > 0) {
    let value = 0;
    for (let j = 0; j < tasksFromLocalStorage.length; j++) {
      value += parseInt(tasksFromLocalStorage[j].price);
    }
    if (value > 0) {
      costFieldEl.innerHTML = `<div id="costField" class="column">$${value}</div>`;
      textFieldEl.innerHTML = `<div id="textField" class="column">
      We accept cash, credit card, or PayPal
      </div>`;
    } else {
      costFieldEl.innerHTML = `<div id="costField" class="column">$0</div>`;
    }
  }
}

function btnClicked(index) {
  let task = tasks[index];
  if (checkAvailability(selectedTasks, task.id)) {
    alert("already added");
  } else {
    tasksFromLocalStorage.push(task);
    localStorage.setItem(
      "selectedTasks",
      JSON.stringify(tasksFromLocalStorage)
    );
  }
  location.reload();
}

function removeSkill(array, value) {
  var index = array.indexOf(value);
  if (index >= 0) {
    array.splice(index, 1);
    reIndexArray(array);
  }
}
function reIndexArray(array) {
  var result = [];
  for (var key in array) {
    result.push(array[key]);
  }
  return result;
}
function deleteTask(index) {
  let removedTask = selectedTasks[index];
  removeSkill(tasksFromLocalStorage, removedTask);
  localStorage.setItem("selectedTasks", JSON.stringify(tasksFromLocalStorage));
  location.reload();
}

submitEl.addEventListener("click", function () {
  if (selectedTasks.length === 0) {
    localStorage.clear();
    alert("No tasks to send");
  } else {
    localStorage.clear();
    selectedTasks = [];
    alert("Invoice sent to your mail");
    location.reload();
  }
});

function checkAvailability(arr, val) {
  return arr.some(function (arrVal) {
    return val === arrVal.id;
  });
}
