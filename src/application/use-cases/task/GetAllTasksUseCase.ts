import { ITaskRepository } from '../../../domain/repositories/ITaskRepository';
import { Task } from '../../../domain/entities/Task';

export class GetAllTasksUseCase {
    constructor(private taskRepository: ITaskRepository) {}

    async execute(): Promise<Task[]> {
        return this.taskRepository.findAll();
    }
}
