import Project from "./scripts/project.js";
import Todo from "./scripts/todo.js";
import TodoList from "./scripts/todoList.js";

const title = document.querySelector("#title");
const description = document.querySelector("#description");
const date = document.querySelector("#date");
const priority = document.querySelector("#priority");
const submitBtn = document.querySelector("#submit");
const addBtn = document.querySelector("#add");
const printBtn = document.querySelector("#print");
const dialog = document.querySelector("dialog");
const closeBtn = document.querySelector("#close");

let dfault = new Project("Default");
const app = new TodoList();
app.addProject(dfault);

const printAll = function(e) {
    e.preventDefault();
    console.log(dfault.viewAllTodos());
}

printBtn.addEventListener("click", printAll);

const addToScreen = function(todo) {
    const item = document.createElement("div");
    const todo_title = document.createElement("h3");
    const todo_description = document.createElement("p");
    const todo_date = document.createElement("p");
    const todo_priority = document.createElement("p");

    todo_title.textContent = todo.title;
    todo_description.textContent = todo.description;
    todo_date.textContent = todo.date;
    todo_priority.textContent = todo.priority;

    item.appendChild(todo_title);
    item.appendChild(todo_description);
    item.appendChild(todo_date);
    item.appendChild(todo_priority);
    document.body.appendChild(item);
}

const addNew = function(e) {
    e.preventDefault();
    let todo = new Todo(
        title.value,
        description.value,
        date.value,
        priority.value
        );
    dfault.addTodo(todo);
    addToScreen(todo);
    dialog.close();
}

submitBtn.addEventListener('click', addNew);

const openDialog = function(e) {
    e.preventDefault();
    dialog.show();
}

addBtn.addEventListener('click', openDialog);

const closeDialog = function(e) {
    e.preventDefault();
    e.target.parentNode.close();
}

closeBtn.addEventListener('click', closeDialog);
