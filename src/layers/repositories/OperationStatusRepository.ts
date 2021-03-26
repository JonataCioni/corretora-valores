import { getRepository } from 'typeorm';
import { IOperationStatusRequest } from '../interfaces/IOperationStatus';
import OperationStatus from '../models/OperationStatus';

class OperationStatusRepository {
	/**
	 * Register
	 */
	public async save(request: IOperationStatusRequest): Promise<void> {
		const operationStatusRepository = getRepository(OperationStatus);
		const operationStatus = operationStatusRepository.create(request);
		await operationStatusRepository.save(operationStatus);
	}
	/**
	 * List
	 */
	public async list(idOperation: number): Promise<OperationStatus[]> {
		const operationStatusRepository = getRepository(OperationStatus);
		const resultList = await operationStatusRepository.find({ where: { idOperation: idOperation } });
		return resultList;
	}
}

export default OperationStatusRepository;
