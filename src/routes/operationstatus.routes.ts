import { Router } from 'express';
import OperationStatusController from '../layers/controllers/OperationStatusController';

const routes = Router();

routes.post('/api/operation-status', OperationStatusController.save);
routes.get('/api/operation-status/:idOperation', OperationStatusController.list);

export default routes;
