import Project from "./scripts/project.js";
import Todo from "./scripts/todo.js";
import TodoList from "./scripts/todoList.js";

const nav = document.querySelector("nav");

const title = document.querySelector("#title");
const description = document.querySelector("#description");
const date = document.querySelector("#date");
const priority = document.querySelector("#priority");
const projectName = document.querySelector("#project-name");
const projectColor = document.querySelector("#project-color");

const submitTodoBtn = document.querySelector("#submit-todo");
const addTodoBtn = document.querySelector("#add-todo");

const submitProjectBtn = document.querySelector("#submit-project");
const addProjectBtn = document.querySelector("#add-project");
const display = document.querySelector("#display-tasks");

const addProject = document.querySelector("#addProject");
const todoDialog = document.querySelector("#addTodo");
const closeBtn = document.querySelectorAll("#close");

const editDialog = document.querySelector("#todo-edit");
const todoIdx = document.querySelector("#todo-idx");
const newheading = document.querySelector("#todo-edit-heading");
const newtitle = document.querySelector("#edit-title");
const newdescription = document.querySelector("#edit-description");
const newdate = document.querySelector("#edit-date");
const newpriority = document.querySelector("#edit-priority");
const editBtn = document.querySelector("#submit-edit-todo");

let dfault = new Project("Default");
let chores = new Project("Chores");
const app = new TodoList();
app.addProject(dfault);
app.addProject(chores);

const selectProject = function(e) {
    let index = parseInt(e.target.dataset.project);
    app.updateIndex(index);
    displayProjectTasks();
}

const createNavButton = function(project) {
    const button = document.createElement('button');
    button.type = 'button';
    button.id = project.name;
    button.dataset.project = app.getAppIndex();
    button.textContent = project.name;
    button.addEventListener("click", selectProject);
    nav.appendChild(button);
    
    if (project.name === "Default") {
        button.dispatchEvent(new MouseEvent("click", {bubbles: false}));
    }
}

const createNewNavButton = function(project) {
    const button = document.createElement('button');
    button.type = 'button';
    button.id = project.name;
    button.dataset.project = app.getProjectLength() - 1;
    button.textContent = project.name;
    button.addEventListener("click", selectProject);
    nav.appendChild(button);
}

const editModalShow = function(e) {
    const idx = e.target.dataset.index;
    let project = app.getProject(app.getAppIndex());
    let todo = project.viewTodo(idx)

    newheading.textContent = `Edit task: ${todo.title}`;
    newtitle.value = todo.title;
    newdescription.value = todo.description;
    newdate.value = todo.date;
    newpriority.value = todo.priority;

    todoIdx.value = idx;
    editDialog.show();
}

const editTodo = function(e) {
    const idx = todoIdx.value;
    const project = app.getProject(app.getAppIndex());
    let todo = project.viewTodo(idx);
    todo.title = newtitle.value;
    todo.description = newdescription.value;
    todo.date = newdate.value;
    todo.priority = newpriority.value;
    
    displayProjectTasks();
    editDialog.close();
}

editBtn.addEventListener("click", editTodo)

const addTaskToScreen = function(project, todo) {
    const item = document.createElement("div");
    const todo_title = document.createElement("h3");
    const todo_description = document.createElement("p");
    const todo_date = document.createElement("p");
    const todo_priority = document.createElement("p");
    const deleteBtn = document.createElement("button");
    let idx = project.getTodoCount() - 1;
    deleteBtn.type = "button";
    deleteBtn.textContent = "Delete";
    deleteBtn.dataset.index = idx;
    deleteBtn.addEventListener("click", (e) => {
        let project = app.getProject(app.getAppIndex());
        let index = e.target.dataset.index;
        project.removeTodo(index);
        e.target.parentNode.remove();
    });

    const editBtn = document.createElement("button");
    editBtn.type = "button";
    editBtn.textContent = "Edit";
    editBtn.dataset.index = idx;
    editBtn.addEventListener("click", editModalShow);

    todo_title.textContent = todo.title;
    todo_description.textContent = todo.description;
    todo_date.textContent = todo.date;
    todo_priority.textContent = todo.priority;

    item.appendChild(todo_title);
    item.appendChild(todo_description);
    item.appendChild(todo_date);
    item.appendChild(todo_priority);
    item.appendChild(editBtn);
    item.appendChild(deleteBtn);
    display.appendChild(item);
}

const addNewTask = function(e) {
    e.preventDefault();
    let todo = new Todo(
        title.value,
        description.value,
        date.value,
        priority.value
        );
    let project = app.getProject(app.getAppIndex());
    project.addTodo(todo);
    todoDialog.close();
}

submitTodoBtn.addEventListener('click', addNewTask);

const addNewProject = function(e) {
    e.preventDefault();
    let project = new Project(
        projectName.value,
        projectColor.value
    );
    
    createNewNavButton(project);
    app.addProject(project);
    addProject.close();
}

submitProjectBtn.addEventListener('click', addNewProject);

const openDialog = function(e) {
    e.preventDefault();
    todoDialog.show();
}

for (const button of [addTodoBtn, addProjectBtn]) {}
addTodoBtn.addEventListener('click', openDialog);

addProjectBtn.addEventListener('click', () => {
    addProject.show()
});

const closeDialog = function(e) {
    e.preventDefault();
    e.target.parentNode.close();
}

closeBtn.forEach((button) => {
    button.addEventListener('click', closeDialog);
})


const displayProjectTasks = function() {
    const project = app.getProject(app.getAppIndex());
    let tasks = project.viewAllTodos();
    display.textContent = "";
    if (tasks.length > 0) {
        tasks.forEach((task) => {
            addTaskToScreen(project, task)
        });
    }
}

for (const project of app.projects) {
    createNavButton(project)
    app.updateIndex(app.getAppIndex() + 1);
}

