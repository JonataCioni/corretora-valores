import { Request, Response } from 'express';
import OperationStatus from '../models/OperationStatus';
import OperationStatusService from '../services/OperationStatusService';

class OperationStatusController {
	public async save(request: Request, response: Response): Promise<Response<any, Record<string, any>>> {
		const operationService = new OperationStatusService();
		const operation = await operationService.save(request.body);
		return response.json(operation);
	}

	public async list(request: Request, response: Response): Promise<Response<any, Record<string, any>>> {
		const operationService = new OperationStatusService();
		let operations = new Array<OperationStatus>();
		if (request.params?.idOperation) {
			const operationId = parseInt(request.params?.idOperation);
			operations = await operationService.list(operationId);
		}
		return response.json(operations);
	}
}

export default new OperationStatusController();
