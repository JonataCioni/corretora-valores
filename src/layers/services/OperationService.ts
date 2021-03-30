import { validate } from 'class-validator';
import { getCustomRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import AppValidationError from '../../errors/AppValidationError';
import { OperationStatusType } from '../Enums';
import { IOperationRequest } from '../interfaces/IOperation';
import Operation from '../models/Operation';
import OperationStatus from '../models/OperationStatus';
import OperationRepository from '../repositories/OperationRepository';
import OperationStatusRepository from '../repositories/OperationStatusRepository';

class OperationService {
	/**
	 * Register
	 */
	public async save(request: IOperationRequest): Promise<Operation> {
		try {
			//save operation
			let operation: Operation = new Operation();
			operation.idClient = request.idClient;
			operation.idAsset = request.idAsset;
			operation.quantity = request.quantity;
			operation.unitaryValue = request.unitaryValue;
			operation.executed = 0;
			operation.taxValue = 0;
			operation.type = request.type;
			const errors = await validate(operation);
			if (errors.length > 0) {
				throw new AppValidationError(errors, 400);
			}
			const operationRepository = getCustomRepository(OperationRepository);
			operation = await operationRepository.save(operation);
			//save initial operation status
			const operationStatus: OperationStatus = new OperationStatus();
			operationStatus.idOperation = operation.id;
			operationStatus.quantity = request.quantity;
			operationStatus.type = OperationStatusType.PENDING;
			const operationStatusRepository = getCustomRepository(OperationStatusRepository);
			operationStatusRepository.save(operationStatus);
			//return operation
			return operation;
		} catch (error) {
			if (error instanceof AppValidationError) {
				throw error;
			}
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
