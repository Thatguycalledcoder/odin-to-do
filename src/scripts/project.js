export default class Project {
    todos = [];
    constructor(name, color = "grey") {
        this.todos = [];
        this.name = name;
        this.color = color;
    }

    addTodo(Todo) {
        this.todos.push(Todo);
    }

    viewTodo(index) {
        return this.todos[index];
    }

    viewAllTodos() {
        return this.todos;
    }

    getTodoCount() {
        return this.todos.length;
    }

    getProjectName() {
        return this.name;
    }

    retrieveTodos(todos) {
        this.todos = todos;
    }

    removeTodo(index) {
        this.todos.splice(index, 1);
    }
}