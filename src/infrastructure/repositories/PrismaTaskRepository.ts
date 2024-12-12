import { PrismaClient } from '@prisma/client';
import { ITaskRepository } from '../../domain/repositories/ITaskRepository';
import { Task, CreateTaskDTO, UpdateTaskDTO } from '../../domain/entities/Task';

export class PrismaTaskRepository implements ITaskRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async findAll(): Promise<Task[]> {
        return this.prisma.task.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }

    async findById(id: number): Promise<Task | null> {
        return this.prisma.task.findUnique({
            where: { id }
        });
    }

    async create(data: CreateTaskDTO): Promise<Task> {
        return this.prisma.task.create({
            data: {
                title: data.title,
                color: data.color,
            },
        });
    }

    async update(id: number, data: UpdateTaskDTO): Promise<Task> {
        return this.prisma.task.update({
            where: { id },
            data,
        });
    }

    async delete(id: number): Promise<Task> {
        return this.prisma.task.delete({
            where: { id },
        });
    }
}
