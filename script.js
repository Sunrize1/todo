import axios from 'axios';

const URL_ = "http://127.0.0.1:8000/api/";
let form = document.forms.createTask;
let createTaskButton = document.querySelector(".create");
let undoneTasksPlace = document.querySelector(".undoneTasks")
let doneTasksPlace = document.querySelector(".doneTasks")
let saveButton = document.querySelector("footer a:first-child");
let dropZone = document.querySelector(".dropZone")

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
                <strong class="red text-gray-dark">` + `${task.text}` + `</strong>
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
            <svg class="switchToBlue svg-blue bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#007bff"></rect><text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text></svg>
            <div class="pb-3 mb-0 small lh-sm border-bottom w-100">
              <div class="d-flex justify-content-between">
                <strong class="blue text-gray-dark">` + `${task.text}` + `</strong>
              </div>
            </div>
          </div>`
    }
    buttonsReady();
}

function buttonsReady() {
  let switchButtons = document.querySelectorAll(".switchToBlue");
  let editButtons = document.querySelectorAll(".edit");
  let deleteButtons = document.querySelectorAll(".delete");

  switchButtons.forEach(button => button.addEventListener("click", switchTask));
  editButtons.forEach(button => button.addEventListener("click", updateTask));
  deleteButtons.forEach(button => button.addEventListener("click", deleteTask));
}

async function createTask() {
  let inputTask = form.elements.task;
  let inputIsDone = form.elements.isDone;

  if(inputTask.value.trim() !== "") {
      try {
        const response = await axios.post(URL_ + "tasks" + "/", {
          text: inputTask.value,
          is_done: inputIsDone.checked
        })

        getTasks();
      } catch(error) {
        console.error(error);
      }

      inputTask.value = "";
      inputIsDone.checked = false;
    }
  else {
      alert("Введите информацию!")
    }
}

async function getTasks() {
  try{
    const response = await axios.get(URL_ + "tasks" + "/");
    const allTasks = response.data;

    
    doneTasks = allTasks.filter(task => task.is_done === true);
    undoneTasks = allTasks.filter(task => task.is_done === false);
  } catch (error) {
    console.error(error);
  }
  refresh();
}

function updateTask(e) {
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
    refresh();
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      saveTask(input, currentTaskName);
    }
  });
}

async function deleteTask(e) {
  let taskElement = e.target.closest(".d-flex");
  let taskName = taskElement.querySelector("strong").innerText;

  let taskIndex = undoneTasks.map(e => e.text).indexOf(taskName);

  try {
    const response = await axios.delete(URL_ + "tasks" + "/" + `${undoneTasks[taskIndex].id}` + "/");
    
    getTasks();
  } catch(error) {
    console.error(error);
  }

}

async function switchTask(e) {
  let taskElement = e.target.closest(".d-flex");
  let task = taskElement.querySelector("strong");
  let taskName = taskElement.querySelector("strong").innerText;

  
  if(task.classList.contains("red")) {
    let taskIndex = undoneTasks.map(e => e.text).indexOf(taskName);
    
    try {
      const response = await axios.patch(URL_ + "tasks" + "/" + `${undoneTasks[taskIndex].id}` + "/" + "mark_as_done" + "/")
      
      getTasks();
    } catch (error) {
      console.error(error);
    }

  } else if(task.classList.contains("blue")) {
    let taskIndex = doneTasks.map(e => e.text).indexOf(taskName);

    try {
      const response = await axios.patch(URL_ + "tasks" + "/" + `${doneTasks[taskIndex].id}` + "/" + "mark_as_undone" + "/")
      
      getTasks();
    } catch (error) {
      console.error(error);
    }

  }

}

 async function clearTasks() {
  try {
    const response = await axios.delete(URL_ + "tasks" + "/" + "clear_tasks" + "/");

    getTasks()
  } catch (error) {
    console.error(error)
   }
   
 }

async function allDoneTasks() {
  try {
    const response = await axios.patch(URL_ + "tasks" + "/" + "all_done_tasks" + "/");

    getTasks();
  } catch (error) {
    console.error(error)
  }
  
}

async function saveTask(input, oldTaskName) {
  let newTaskName = input.value.trim();

  if (newTaskName !== "") {
    try {
      let taskIndex = undoneTasks.map(e => e.text).indexOf(oldTaskName);
    
      const response = await axios.patch(URL_ + "tasks" + "/" + `${undoneTasks[taskIndex].id}` + '/', {
        text: newTaskName
      })

      getTasks();
    } catch(error) {
      console.error(error);
    }
  }
}

function saveTasksToFile() {
  let tasks = {
      undone: undoneTasks,
      done: doneTasks
  };
  let tasksJSON = JSON.stringify(tasks);
  let blob = new Blob([tasksJSON], { type: "application/json" });
  let link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "tasks.json";
  link.click();
}


function loadTasksFromFile(file) {
  const reader = new FileReader();

  reader.onload = async (e) => {
    try {
      const tasksData = JSON.parse(e.target.result);
      const response = await axios.post(URL_ + "tasks" + "/" + "replace_tasks" + "/", {
        tasks: tasksData.undone.concat(tasksData.done)
      });     
      getTasks();
    } catch (error) {
      console.error(error);     
    }
  };

  reader.readAsText(file);
}


createTaskButton.addEventListener("click", createTask);

clearButton.addEventListener("click", clearTasks);
allDoneButton.addEventListener("click", allDoneTasks);
saveButton.addEventListener("click", saveTasksToFile);

dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropZone.classList.add('hover');
});

dropZone.addEventListener('dragleave', () => {
  dropZone.classList.remove('hover');
});

dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropZone.classList.remove('hover');

  const file = e.dataTransfer.files[0];
  if (file && file.type === 'application/json') {
      loadTasksFromFile(file);
  } else {
      alert("Пожалуйста, перетащите корректный JSON файл.");
  }
});

getTasks();

