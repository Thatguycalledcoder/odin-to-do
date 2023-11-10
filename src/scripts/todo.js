export default class Todo {
    constructor(title, description, date, priority) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.priority = priority;
    }

    updateTodoTitle(newTitle) {
        this.title = newTitle;
    }

    updateTodoDescription(newDescription) {
        this.description = newDescription;
    }

    updateTododDate(newDate) {
        this.date = newDate;
    }

    updateTodoPriority(newPriority) {
        this.priority = newPriority;
    }
}