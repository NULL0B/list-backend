import { Request, Response } from 'express';
import { GetAllTasksUseCase } from '../../application/use-cases/task/GetAllTasksUseCase';
import { CreateTaskUseCase } from '../../application/use-cases/task/CreateTaskUseCase';
import { UpdateTaskUseCase } from '../../application/use-cases/task/UpdateTaskUseCase';
import { DeleteTaskUseCase } from '../../application/use-cases/task/DeleteTaskUseCase';
import { ITaskRepository } from '../../domain/repositories/ITaskRepository';
import { GetTaskByIdUseCase } from '../../application/use-cases/task/GetTaskByIdUseCase';

export class TaskController {
    private getAllTasksUseCase: GetAllTasksUseCase;
    private getTaskByIdUseCase: GetTaskByIdUseCase;
    private createTaskUseCase: CreateTaskUseCase;
    private updateTaskUseCase: UpdateTaskUseCase;
    private deleteTaskUseCase: DeleteTaskUseCase;

    constructor(taskRepository: ITaskRepository) {
        this.getAllTasksUseCase = new GetAllTasksUseCase(taskRepository);
        this.getTaskByIdUseCase = new GetTaskByIdUseCase(taskRepository);
        this.createTaskUseCase = new CreateTaskUseCase(taskRepository);
        this.updateTaskUseCase = new UpdateTaskUseCase(taskRepository);
        this.deleteTaskUseCase = new DeleteTaskUseCase(taskRepository);
    }


    async getTaskById(req: Request, res: Response): Promise<void> {
        try {
            const task = await this.getTaskByIdUseCase.execute(parseInt(req.params.id));
            res.json(task);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch task' });
        }
    }

    async getAllTasks(_req: Request, res: Response): Promise<void> {
        try {
            const tasks = await this.getAllTasksUseCase.execute();
            res.json(tasks);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch tasks' });
        }
    }

    async createTask(req: Request, res: Response): Promise<void> {
        try {
            const task = await this.createTaskUseCase.execute({
                title: req.body.title,
                color: req.body.color
            });
            res.status(201).json(task);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create task' });
        }
    }

    async updateTask(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const task = await this.updateTaskUseCase.execute(id, {
                title: req.body.title,
                color: req.body.color,
                completed: req.body.completed
            });
            res.json(task);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update task' });
        }
    }

    async deleteTask(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            await this.deleteTaskUseCase.execute(id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete task' });
        }
    }
}
