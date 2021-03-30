import { Router } from 'express';
import CompanyController from '../layers/controllers/CompanyController';

const routes = Router();

routes.post('/api/company', CompanyController.save);
routes.get('/api/company', CompanyController.list);

export default routes;
