import { Router } from 'express';
import OperationStatusController from '../layers/controllers/OperationStatusController';
import ensureAnthenticated from '../middlewares/ensureAnthenticated';

const routes = Router();

routes.post('/api/operation-status', ensureAnthenticated, OperationStatusController.save);
routes.get('/api/operation-status/:idOperation', ensureAnthenticated, OperationStatusController.list);

export default routes;
