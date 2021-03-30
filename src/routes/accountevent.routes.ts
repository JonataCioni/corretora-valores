import { Router } from 'express';
import AccountEventController from '../layers/controllers/AccountEventController';

const routes = Router();

routes.post('/api/account-event', AccountEventController.save);
routes.get('/api/account-event', AccountEventController.list);

export default routes;
