export default class TodoList {
    constructor(projects = []) {
        this.projects += projects;
    }

    addProject(Project) {
        this.projects.push(Project);
    }

    viewProject(index) {
        return this.projects[index];
    }
}