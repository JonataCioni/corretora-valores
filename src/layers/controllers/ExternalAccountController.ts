import { Request, Response } from 'express';
import ExternalAccount from '../models/ExternalAccount';
import ExternalAccountService from '../services/ExternalAccountService';

class ExternalAccountController {
	public async save(request: Request, response: Response): Promise<Response<any, Record<string, any>>> {
		const externalAccountService = new ExternalAccountService();
		const externalAccount = await externalAccountService.save(request.body);
		return response.json(externalAccount);
	}

	public async list(request: Request, response: Response): Promise<Response<any, Record<string, any>>> {
		const externalAccountService = new ExternalAccountService();
		let externalAccounts = new Array<ExternalAccount>();
		if (request.params?.idCliente) {
			const clientId = parseInt(request.params?.idCliente);
			externalAccounts = await externalAccountService.list(clientId);
		}
		return response.json(externalAccounts);
	}
}

export default new ExternalAccountController();
