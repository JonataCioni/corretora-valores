import { Router } from 'express';
import ClientController from '../layers/controllers/ClientController';

const routes = Router();

routes.post('/api/client', ClientController.save);
routes.get('/api/client', ClientController.list);

export default routes;
