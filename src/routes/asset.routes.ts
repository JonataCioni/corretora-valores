import { Router } from 'express';
import AssetController from '../layers/controllers/AssetController';

const routes = Router();

routes.post('/api/asset', AssetController.save);
routes.get('/api/asset', AssetController.list);
routes.get('/api/asset/:idClient', AssetController.list);

export default routes;
