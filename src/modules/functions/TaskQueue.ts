import { Task } from "../functions/Task"

export class TaskQueue {
    private task_list: Task[];

    /**
     *
     */
    constructor() {
        this.task_list = [];
    }

    /**
     * Takes a list of available parts and returns all tasks that can be completed by these parts
     * Ordered by priority
     *
     * @param parts
     * @memberof TaskQueue
     */
    public available_tasks(parts: string[]) {
    }
}
