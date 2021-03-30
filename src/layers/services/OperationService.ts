import { validate } from 'class-validator';
import { getCustomRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import AppValidationError from '../../errors/AppValidationError';
import { IOperationRequest } from '../interfaces/IOperation';
import Operation from '../models/Operation';
import OperationRepository from '../repositories/OperationRepository';

class OperationService {
	/**
	 * Register
	 */
	public async save(request: IOperationRequest): Promise<void> {
		try {
			const operation: Operation = new Operation();
			operation.idClient = request.idClient;
			operation.idAsset = request.idAsset;
			operation.quantity = request.quantity;
			operation.executed = request.executed;
			operation.unitaryValue = request.unitaryValue;
			operation.taxValue = request.taxValue;
			operation.type = request.type;
			const errors = await validate(operation);
			if (errors.length > 0) {
				throw new AppValidationError(errors, 400);
			}
			const operationRepository = getCustomRepository(OperationRepository);
			await operationRepository.save(operation);
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
