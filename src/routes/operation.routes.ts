import { Router } from 'express';
import OperationController from '../layers/controllers/OperationController';

const routes = Router();

routes.post('/api/operation', OperationController.save);
routes.get('/api/operation/:idCliente', OperationController.list);

export default routes;
