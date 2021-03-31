import { Router } from 'express';
import ExternalAccountController from '../layers/controllers/ExternalAccountController';
import ensureAnthenticated from '../middlewares/ensureAnthenticated';

const routes = Router();

routes.post('/api/external-account', ensureAnthenticated, ExternalAccountController.save);
routes.get('/api/external-account/:idCliente', ensureAnthenticated, ExternalAccountController.list);

export default routes;
