import { ITaskRepository } from '../../../domain/repositories/ITaskRepository';
import { Task } from '../../../domain/entities/Task';

export class DeleteTaskUseCase {
    constructor(private taskRepository: ITaskRepository) {}

    async execute(id: number): Promise<Task> {
        return this.taskRepository.delete(id);
    }
}
