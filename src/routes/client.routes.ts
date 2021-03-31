import { Router } from 'express';
import ClientController from '../layers/controllers/ClientController';
import ensureAnthenticated from '../middlewares/ensureAnthenticated';

const routes = Router();

routes.post('/api/client', ClientController.save);
routes.post('/api/client/login', ClientController.login);
routes.get('/api/client', ClientController.list);
routes.get('/api/client/:id', ensureAnthenticated, ClientController.listPositions);

export default routes;
