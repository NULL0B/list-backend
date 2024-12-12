import { Router, Request, Response } from 'express';
import { body, param, ValidationChain } from 'express-validator';
import { TaskController } from '../controllers/TaskController';
import { PrismaTaskRepository } from '../../infrastructure/repositories/PrismaTaskRepository';

const taskRepository: PrismaTaskRepository = new PrismaTaskRepository();
const taskController: TaskController = new TaskController(taskRepository);

const router: Router = Router();

// Route handler types
type RouteHandler = (req: Request, res: Response) => Promise<void>;
type ValidationMiddleware = ValidationChain[];
type Route = {
    handler: RouteHandler;
    validations?: ValidationMiddleware;
};

// Define route handlers
const routes: Record<string, Route> = {
    getAll: {
        handler: (req: Request, res: Response) => taskController.getAllTasks(req, res)
    },
    get: {
        validations: [
            param('id').isInt().withMessage('Invalid task ID'),
        ],
        handler: (req: Request, res: Response) => taskController.getTaskById(req, res)
    },
    create: {
        validations: [
            body('title').trim().notEmpty().withMessage('Title is required'),
            body('color').optional().isString(),
        ],
        handler: (req: Request, res: Response) => taskController.createTask(req, res)
    },
    update: {
        validations: [
            param('id').isInt().withMessage('Invalid task ID'),
            body('title').optional().trim().notEmpty(),
            body('color').optional().isString(),
            body('completed').optional().isBoolean(),
        ],
        handler: (req: Request, res: Response) => taskController.updateTask(req, res)
    },
    delete: {
        validations: [
            param('id').isInt().withMessage('Invalid task ID'),
        ],
        handler: (req: Request, res: Response) => taskController.deleteTask(req, res)
    }
};

// Register routes
router.get('/', routes.getAll.handler);
router.get('/:id', routes.get.validations || [], routes.get.handler);
router.post('/', routes.create.validations || [], routes.create.handler);
router.put('/:id', routes.update.validations || [], routes.update.handler);
router.delete('/:id', routes.delete.validations || [], routes.delete.handler);

export default router;
