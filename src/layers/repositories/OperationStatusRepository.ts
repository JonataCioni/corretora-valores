import { EntityRepository, getRepository } from 'typeorm';
import OperationStatus from '../models/OperationStatus';

@EntityRepository(OperationStatus)
class OperationStatusRepository {
	/**
	 * Register
	 */
	public async save(operationStatus: OperationStatus): Promise<void> {
		const operationStatusRepository = getRepository(OperationStatus);
		const result = operationStatusRepository.create(operationStatus);
		await operationStatusRepository.save(result);
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
