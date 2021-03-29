import { Request, Response } from 'express';
import Operation from '../models/Operation';
import OperationService from '../services/OperationService';

class OperationController {
	public async save(request: Request, response: Response): Promise<Response<any, Record<string, any>>> {
		const operationService = new OperationService();
		const operation = await operationService.save(request.body);
		return response.json(operation);
	}

	public async list(request: Request, response: Response): Promise<Response<any, Record<string, any>>> {
		const operationService = new OperationService();
		let operations = new Array<Operation>();
		if (request.params?.idCliente) {
			const clientId = parseInt(request.params?.idCliente);
			operations = await operationService.list(clientId);
		}
		return response.json(operations);
	}
}

export default new OperationController();
