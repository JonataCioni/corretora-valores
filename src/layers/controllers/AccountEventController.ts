import { Request, Response } from 'express';
import AccountEventService from '../services/AccountEventService';

class AccountEventController {
	public async save(request: Request, response: Response): Promise<Response<any, Record<string, any>>> {
		const accountEventService = new AccountEventService();
		const accountEvent = await accountEventService.save(request.body);
		return response.json(accountEvent);
	}

	public async list(_: Request, response: Response): Promise<Response<any, Record<string, any>>> {
		const accountEventService = new AccountEventService();
		const accountEvents = await accountEventService.list();
		return response.json(accountEvents);
	}
}

export default new AccountEventController();
