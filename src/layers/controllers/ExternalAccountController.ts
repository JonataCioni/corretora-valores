import { Request, Response } from 'express';
import ExternalAccountService from '../services/ExternalAccountService';

class ExternalAccountController {
	public async save(request: Request, response: Response): Promise<Response<any, Record<string, any>>> {
		const externalAccountService = new ExternalAccountService();
		const externalAccount = await externalAccountService.save(request.body);
		return response.json(externalAccount);
	}

	public async list(_: Request, response: Response): Promise<Response<any, Record<string, any>>> {
		const externalAccountService = new ExternalAccountService();
		const externalAccounts = await externalAccountService.list();
		return response.json(externalAccounts);
	}
}

export default new ExternalAccountController();
