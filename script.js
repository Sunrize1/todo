let form = document.forms.createTask;
let createTaskButton = document.querySelector(".create");
let undoneTasksPlace = document.querySelector(".undoneTasks")
let doneTasksPlace = document.querySelector(".doneTasks")

let clearButton = document.querySelector(".clear");
let allDoneButton = document.querySelector(".allDone");

let undoneTasks = [];
let doneTasks = [];

function refresh() {
    undoneTasksPlace.innerHTML = "";
    doneTasksPlace.innerHTML = "";

    for(let task of undoneTasks) {
        undoneTasksPlace.innerHTML += `<div class="task d-flex text-body-secondary pt-3">
            <svg class="switchToBlue svg-red bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#e83e8c"></rect><text x="50%" y="50%" fill="#e83e8c" dy=".3em">32x32</text></svg>
            <div class="pb-3 mb-0 small lh-sm border-bottom w-100">
              <div class="d-flex justify-content-between">
                <strong class="text-gray-dark">` + task + `</strong>
                <div>
                  <a class="edit" href="#">Редактировать</a>
                  <a class="delete" href="#">Удалить</a>
                </div>
              </div>
            </div>
          </div>`
    }

    for(let task of doneTasks) {
        doneTasksPlace.innerHTML += `<div class="task d-flex text-body-secondary pt-3">
            <svg class="svg-blue bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#007bff"></rect><text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text></svg>
            <p class="pb-3 mb-0 small lh-sm border-bottom w-100">
              ` + task + `
            </p>
          </div>`
    }
    buttonsReady();
}

function buttonsReady() {
  let switchButtons = document.querySelectorAll(".switchToBlue");
  let editButtons = document.querySelectorAll(".edit");
  let deleteButtons = document.querySelectorAll(".delete");

  switchButtons.forEach(button => button.addEventListener("click", switchTask));
  editButtons.forEach(button => button.addEventListener("click", editTask));
  deleteButtons.forEach(button => button.addEventListener("click", deleteTask));
}

function editTask(e) {
  let taskElement = e.target.closest(".d-flex");
  let taskNameElement = taskElement.querySelector("strong");

  let currentTaskName = taskNameElement.innerText;

  let input = document.createElement("input");
  input.type = "text";
  input.value = currentTaskName;
  input.classList.add("form-control");
  input.style.width = "80%";

  taskNameElement.replaceWith(input);
  input.focus();

  input.addEventListener("blur", () => {
    saveTask(input, currentTaskName);
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      saveTask(input, currentTaskName);
    }
  });
}

function deleteTask(e) {
  let taskElement = e.target.closest(".d-flex");
  let taskName = taskElement.querySelector("strong").innerText;

  let taskIndex = undoneTasks.indexOf(taskName);
  undoneTasks.splice(taskIndex, 1);
  refresh();
}

function switchTask(e) {
  let taskElement = e.target.closest(".d-flex");
  let taskName = taskElement.querySelector("strong").innerText;

  let taskIndex = undoneTasks.indexOf(taskName);
  doneTasks.push(undoneTasks[taskIndex]);
  undoneTasks.splice(taskIndex, 1);
  refresh();
}

function clearTasks() {
  doneTasks.length = 0;
  refresh();
}

function allDoneTasks() {
  while (undoneTasks.length > 0) {
    let task = undoneTasks.shift(); 
    doneTasks.push(task); 
  }
  refresh();
}

function saveTask(input, oldTaskName) {
  let newTaskName = input.value.trim();

  if (newTaskName !== "") {
    let taskIndex = undoneTasks.indexOf(oldTaskName);
    undoneTasks[taskIndex] = newTaskName;
  }

  refresh();
}


createTaskButton.addEventListener("click", () => {
    let inputTask = form.elements.task;
    let inputIsDone = form.elements.isDone;

    if(inputTask.value.trim() !== "") {
        inputIsDone.checked ? doneTasks.push(inputTask.value) : undoneTasks.push(inputTask.value);
        inputTask.value = "";
        inputIsDone.checked = false;
        refresh();
    }
    else {
        alert("Введите информацию!")
    }
})

clearButton.addEventListener("click", clearTasks);
allDoneButton.addEventListener("click", allDoneTasks);