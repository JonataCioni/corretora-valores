import { Router } from 'express';
import OperationController from '../layers/controllers/OperationController';
import ensureAnthenticated from '../middlewares/ensureAnthenticated';

const routes = Router();

routes.post('/api/operation', ensureAnthenticated, OperationController.save);
routes.get('/api/operation/:idCliente', ensureAnthenticated, OperationController.list);

export default routes;
