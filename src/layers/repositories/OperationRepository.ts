import { EntityRepository, getRepository } from 'typeorm';
import Operation from '../models/Operation';

@EntityRepository(Operation)
class OperationRepository {
	/**
	 * Register
	 */
	public async save(operation: Operation): Promise<Operation> {
		const operationRepository = getRepository(Operation);
		const result = operationRepository.create(operation);
		return await operationRepository.save(result);
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
