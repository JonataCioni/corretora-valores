import { validate } from 'class-validator';
import { getCustomRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import AppValidationError from '../../errors/AppValidationError';
import { OperationStatusType } from '../Enums';
import { IOperationRequest } from '../interfaces/IOperation';
import Operation from '../models/Operation';
import OperationStatus from '../models/OperationStatus';
import ClientRepository from '../repositories/ClientRepository';
import OperationRepository from '../repositories/OperationRepository';
import OperationStatusRepository from '../repositories/OperationStatusRepository';
import ServiceUtils from './ServiceUtils';

class OperationService extends ServiceUtils {
	/**
	 * Register
	 */
	public async save(request: IOperationRequest): Promise<Operation> {
		try {
			const clientRepository = getCustomRepository(ClientRepository);
			const resultClient = await clientRepository.getById(request.idClient);
			if (resultClient === null) {
				throw new AppError('No Client Found');
			}
			//save operation
			let operation: Operation = new Operation();
			operation.idClient = request.idClient;
			operation.idAsset = request.idAsset;
			operation.quantity = request.quantity;
			operation.unitaryValue = request.unitaryValue;
			operation.executed = 0;
			operation.negotiationTaxValue = 0;
			operation.saleOffTaxValue = 0;
			operation.type = request.type;
			const errors = await validate(operation);
			if (errors.length > 0) {
				throw new AppValidationError(errors, 400);
			}
			const calcValues = this.calculateOperationValues(request.quantity, request.unitaryValue);
			const operationRepository = getCustomRepository(OperationRepository);
			operation = await operationRepository.save(operation);
			//save initial operation status
			const operationStatus: OperationStatus = new OperationStatus();
			operationStatus.idOperation = operation.id;
			operationStatus.quantity = request.quantity;
			if (calcValues.totalOperationWithTaxes > parseFloat(resultClient.amount.toString())) {
				operationStatus.type = OperationStatusType.REJECTD;
			} else {
				operationStatus.type = OperationStatusType.PENDING;
			}
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
			resultList.forEach((op) => {
				op.sumTaxValues = parseInt(op.negotiationTaxValue.toString()) + parseInt(op.saleOffTaxValue.toString());
			});
			return resultList;
		} catch (error) {
			throw new AppError(`Error on list companies: ${error}!`);
		}
	}
}

export default OperationService;
