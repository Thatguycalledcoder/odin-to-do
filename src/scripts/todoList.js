export default class TodoList {
    #index = 0;
    projects = [];
    constructor(projects = []) {
        this.projects = projects;
    }

    addProject(Project) {
        this.projects.push(Project);
    }

    getProject(index) {
        return this.projects[index];
    }

    getProjectLength() {
        return this.projects.length;
    }

    getAppIndex() {
        return this.#index;
    }

    updateIndex(index) {
        this.#index = index;
    }

    viewProjects() {
        return this.projects.map(project => project.name);
    }
}