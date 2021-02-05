import { Router } from 'express';
import cors from 'cors';
// eslint-disable-next-line import/no-named-as-default
import TaskController from './app/controllers/TaskController/TaskController';

const routes = new Router();
routes.use(cors());
routes.post('/createtask', TaskController.store);
routes.patch('/task/:id', TaskController.updateTask);
routes.get('/tasks', TaskController.getTasks);
routes.post('/randomTasks', TaskController.createRandonTasks);

export default routes;
