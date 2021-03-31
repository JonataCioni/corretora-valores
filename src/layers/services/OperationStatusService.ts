import { validate } from 'class-validator';
import { getCustomRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import AppValidationError from '../../errors/AppValidationError';
import { OperationStatusType } from '../Enums';
import { IOperationStatusRequest } from '../interfaces/IOperationStatus';
import OperationStatus from '../models/OperationStatus';
import ClientRepository from '../repositories/ClientRepository';
import OperationRepository from '../repositories/OperationRepository';
import OperationStatusRepository from '../repositories/OperationStatusRepository';

class OperationStatusService {
	/**
	 * Register
	 */
	public async save(request: IOperationStatusRequest): Promise<OperationStatus> {
		try {
			//get operation
			const operationRepository = getCustomRepository(OperationRepository);
			const operation = await operationRepository.getById(request.idOperation);
			//get client
			const clientRepository = getCustomRepository(ClientRepository);
			//register status of operation
			const operationStatus: OperationStatus = new OperationStatus();
			operationStatus.idOperation = request.idOperation;
			operationStatus.quantity = request.quantity;
			operationStatus.type = request.type;
			const errors = await validate(operationStatus);
			if (errors.length > 0) {
				throw new AppValidationError(errors, 400);
			}
			const operationStatusRepository = getCustomRepository(OperationStatusRepository);
			const result = await operationStatusRepository.save(operationStatus);
			const totalAmountStatus = operation.unitaryValue * request.quantity * -1;
			const resultUpdateAmountAccount = await clientRepository.updateAccountAmount(operation.idClient, totalAmountStatus);
			if (!resultUpdateAmountAccount) {
				throw new AppError('Error on update account amount');
			}
			const resultUpdateExecutedQtt = operationRepository.updateExecutedQuantity(operation.id, request.quantity);
			if (!resultUpdateExecutedQtt) {
				throw new AppError('Error on update executed quantity');
			}
			if (request.type === OperationStatusType.TTLEXEC) {
				const calcTaxValue = operation.quantity * operation.unitaryValue * 0.0003;
				const resultUpdateAmountAccountTax = await clientRepository.updateAccountAmount(operation.idClient, calcTaxValue * -1);
				const resultUpdatetaxValue = operationRepository.updateTaxValue(operation.id, calcTaxValue);
				if (!resultUpdatetaxValue || !resultUpdateAmountAccountTax) {
					throw new AppError('Error on update tax value');
				}
			}
			return result;
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
