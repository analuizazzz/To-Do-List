
export interface Task {
    id?: number,
    title: string,
    description: string,
    completed: boolean,
    dueDate: string,
    dueDays: string,
    taskType: string,
    priority: string
}