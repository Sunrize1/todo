let form = document.forms.createTask;
let createTaskButton = document.querySelector(".create");
let undoneTasksPlace = document.querySelector(".undoneTasks")
let doneTasksPlace = document.querySelector(".doneTasks")

let undoneTasks = [];
let doneTasks = [];

function refresh() {
    undoneTasksPlace.innerHTML = "";
    doneTasksPlace.innerHTML = "";

    for(let task of undoneTasks) {
        undoneTasksPlace.innerHTML += `<div class="d-flex text-body-secondary pt-3">
            <svg class="svg-red bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#e83e8c"></rect><text x="50%" y="50%" fill="#e83e8c" dy=".3em">32x32</text></svg>
            <div class="pb-3 mb-0 small lh-sm border-bottom w-100">
              <div class="d-flex justify-content-between">
                <strong class="text-gray-dark">` + task + `</strong>
                <div>
                  <a href="#">Редактировать</a>
                  <a href="#">Удалить</a>
                </div>
              </div>
            </div>
          </div>`
    }

    for(let task of doneTasks) {
        doneTasksPlace.innerHTML += `<div class="d-flex text-body-secondary pt-3">
            <svg class="svg-blue bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#007bff"></rect><text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text></svg>
            <p class="pb-3 mb-0 small lh-sm border-bottom w-100">
              ` + task + `
            </p>
          </div>`
    }
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

    console.log(undoneTasks);
    console.log(doneTasks);
})