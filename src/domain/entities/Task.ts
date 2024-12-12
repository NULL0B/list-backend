export interface Task {
    id: number;
    title: string;
    color?: string;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateTaskDTO {
    title: string;
    color?: string;
}

export interface UpdateTaskDTO {
    title?: string;
    color?: string;
    completed?: boolean;
}
