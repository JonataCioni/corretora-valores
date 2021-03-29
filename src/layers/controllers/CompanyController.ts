import { Request, Response } from 'express';
import CompanyService from '../services/CompanyService';

class CompanyController {
	public async save(request: Request, response: Response): Promise<Response<any, Record<string, any>>> {
		const companyService = new CompanyService();
		const company = await companyService.save(request.body);
		return response.json(company);
	}

	public async list(_: Request, response: Response): Promise<Response<any, Record<string, any>>> {
		const companyService = new CompanyService();
		const companies = await companyService.list();
		return response.json(companies);
	}
}

export default new CompanyController();
