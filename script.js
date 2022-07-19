const tasks = [
  { id: 1, task: "Wash Car", price: "10" },
  { id: 2, task: "Mow Lawn", price: "20" },
  { id: 3, task: "Pull Weeds", price: "30" },
];
let selectedTasks = [];
const container = document.getElementById("container");
const taskAdded = document.getElementById("task");
const priceGiven = document.getElementById("price");
const inputBtn = document.getElementById("inputBtn");
const deleteBtn = document.getElementById("deleteBtn");
const itemList = document.getElementById("itemList");
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
  } else {
    itemList.innerHTML = "";
    for (let i = 0; i < tasksFromLocalStorage.length; i++) {
      itemList.innerHTML += ` 
      <div class="items"> 
      <div id="task">
      ${tasksFromLocalStorage[i].task} <span style="color:#d8d8d4;font-size:10px;font-weight:400;" onclick="deleteTask(${i})" id="deleteBtn">remove</span>
      </div>
      <div id="price" >
      <span style="color:#918E9B">$</span>${tasksFromLocalStorage[i].price}
      </div>
      </div>`;
      itemList.innerHTML += "<br>";
    }
  }
}

function btnClicked(index) {
  let task = tasks[index];
  console.log(task.task);
  tasksFromLocalStorage.push(task);
  localStorage.setItem("selectedTasks", JSON.stringify(tasksFromLocalStorage));
  showInvoice();
}

function deleteTask(index) {
  let removedTask = selectedTasks[index];
  console.log(`task removed ${removedTask.task}`);
  tasksFromLocalStorage.pop(removedTask);
  localStorage.removeItem(
    "selectedTasks",
    JSON.stringify(tasksFromLocalStorage)
  );

  showInvoice();
}
