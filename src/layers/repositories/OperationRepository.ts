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
	/**
	 * Get By Id
	 */
	public async getById(id: number): Promise<Operation> {
		const operationRepository = getRepository(Operation);
		const resultList = await operationRepository.findOneOrFail({ where: { id: id } });
		return resultList;
	}
	/**
	 * Get By Id
	 */
	public async getByClient(idClient: number): Promise<Operation[]> {
		const operationRepository = getRepository(Operation);
		const resultList = await operationRepository.find({ where: { idClient: idClient } });
		return resultList;
	}
	/**
	 * Update Tax Value
	 */
	public async updateExecutedQuantity(id: number, partialExecuted: number): Promise<boolean> {
		const operationRepository = getRepository(Operation);
		const result = await operationRepository.findOneOrFail({ where: { id: id } });
		const calcExecuted = parseInt(result.executed.toString()) + parseInt(partialExecuted.toString());
		const resultUpdate = await operationRepository.update({ id: id }, { executed: calcExecuted });
		return resultUpdate.affected !== undefined && resultUpdate.affected > 0;
	}
	/**
	 * Update Tax Value
	 */
	public async updateTaxValue(id: number, calcTaxValue: number): Promise<boolean> {
		const operationRepository = getRepository(Operation);
		const resultUpdate = await operationRepository.update({ id: id }, { taxValue: calcTaxValue });
		return resultUpdate.affected !== undefined && resultUpdate.affected > 0;
	}
}

export default OperationRepository;
