let form = document.forms.createTask;
let createTaskButton = document.querySelector(".create");

let tasks = [];

function createTask(name, task, isDone) {
    return {name, task, isDone}
}


createTaskButton.addEventListener("click", () => {
    let inputPerson = form.elements.person;
    let inputTask = form.elements.task;
    let inputIsDone = form.elements.isDone;

    if(inputPerson.value.trim() !== "" && inputTask.value.trim() !== "") {
        tasks.push(createTask(inputPerson.value, inputTask.value, inputIsDone.checked));
        inputPerson.value = "";
        inputTask.value = "";
        inputIsDone.checked = false;
    }
    else {
        alert("Введите информацию!")
    }

    console.log(tasks);
})