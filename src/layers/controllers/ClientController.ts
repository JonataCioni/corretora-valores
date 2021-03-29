import { Request, Response } from 'express';
import ClientService from '../services/ClientService';

class ClientController {
	public async save(request: Request, response: Response): Promise<Response<any, Record<string, any>>> {
		const clientService = new ClientService();
		const client = await clientService.save(request.body);
		return response.json(client);
	}

	public async list(_: Request, response: Response): Promise<Response<any, Record<string, any>>> {
		const clientService = new ClientService();
		const clients = await clientService.list();
		return response.json(clients);
	}
}

export default new ClientController();
