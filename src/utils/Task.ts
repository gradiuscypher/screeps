export class Task {
    private parent: Task;
    private priority: number;
    private action: string;

    constructor(parent: Task, priority: number, action: string) {
        this.parent = parent;
        this.priority = priority;
        this.action = action;
    }
}
