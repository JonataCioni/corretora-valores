import { Router } from 'express';
import ExternalAccountController from '../layers/controllers/ExternalAccountController';

const routes = Router();

routes.post('/api/external-account', ExternalAccountController.save);
routes.get('/api/external-account', ExternalAccountController.list);

export default routes;
