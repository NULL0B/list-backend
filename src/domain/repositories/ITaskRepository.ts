import { Task, CreateTaskDTO, UpdateTaskDTO } from '../entities/Task';

export interface ITaskRepository {
    findAll(): Promise<Task[]>;
    findById(id: number): Promise<Task | null>;
    create(data: CreateTaskDTO): Promise<Task>;
    update(id: number, data: UpdateTaskDTO): Promise<Task>;
    delete(id: number): Promise<Task>;
}
