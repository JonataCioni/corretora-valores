import { getCustomRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import { IOperationStatusRequest } from '../interfaces/IOperationStatus';
import OperationStatus from '../models/OperationStatus';
import OperationStatusRepository from '../repositories/OperationStatusRepository';

class OperationStatusService {
	/**
	 * Register
	 */
	public async save(request: IOperationStatusRequest): Promise<void> {
		try {
			const operationRepository = getCustomRepository(OperationStatusRepository);
			await operationRepository.save(request);
		} catch (error) {
			throw new AppError(`Error on register operation: ${error}!`);
		}
	}
	/**
	 * List
	 */
	public async list(idOperation: number): Promise<OperationStatus[]> {
		try {
			const operationRepository = getCustomRepository(OperationStatusRepository);
			const resultList = await operationRepository.list(idOperation);
			return resultList;
		} catch (error) {
			throw new AppError(`Error on list companies: ${error}!`);
		}
	}
}

export default OperationStatusService;
