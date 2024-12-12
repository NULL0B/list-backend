import { ITaskRepository } from '../../../domain/repositories/ITaskRepository';
import { Task } from '../../../domain/entities/Task';

export class GetTaskByIdUseCase {
    constructor(private readonly taskRepository: ITaskRepository) {}

    async execute(id: number): Promise<Task> {
        const task = await this.taskRepository.findById(id);
        if (!task) {
            throw new Error('Task not found');
        }
        return task;
    }
}
