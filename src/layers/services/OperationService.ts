import { getCustomRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import { IOperationRequest } from '../interfaces/IOperation';
import Operation from '../models/Operation';
import OperationRepository from '../repositories/OperationRepository';

class OperationService {
	/**
	 * Register
	 */
	public async save(request: IOperationRequest): Promise<void> {
		try {
			const operationRepository = getCustomRepository(OperationRepository);
			await operationRepository.save(request);
		} catch (error) {
			throw new AppError(`Error on register operation: ${error}!`);
		}
	}
	/**
	 * List
	 */
	public async list(idClient: number): Promise<Operation[]> {
		try {
			const operationRepository = getCustomRepository(OperationRepository);
			const resultList = await operationRepository.list(idClient);
			return resultList;
		} catch (error) {
			throw new AppError(`Error on list companies: ${error}!`);
		}
	}
}

export default OperationService;
