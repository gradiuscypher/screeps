export class Task {
    private parent: Task;
    private priority: number;
    private action: string;
    private required_parts: string[];

    constructor(parent: Task, priority: number, action: string, required_parts: string[]) {
        this.parent = parent;
        this.priority = priority;
        this.action = action;
        this.required_parts = required_parts;
    }
}
