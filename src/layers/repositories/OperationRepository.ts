import { EntityRepository, getRepository } from 'typeorm';
import { IOperationRequest } from '../interfaces/IOperation';
import Operation from '../models/Operation';

@EntityRepository(Operation)
class OperationRepository {
	/**
	 * Register
	 */
	public async save(request: IOperationRequest): Promise<void> {
		const operationRepository = getRepository(Operation);
		const operation = operationRepository.create(request);
		await operationRepository.save(operation);
	}
	/**
	 * List
	 */
	public async list(idClient: number): Promise<Operation[]> {
		const operationRepository = getRepository(Operation);
		const resultList = await operationRepository.find({ where: { idClient: idClient } });
		return resultList;
	}
}

export default OperationRepository;
