import { EntityRepository, getRepository } from 'typeorm';
import { ITaxValues } from '../interfaces/IOperation';
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
		const resultList = await operationRepository.find({ where: { id: id } });
		const result = resultList[0];
		return result;
	}
	/**
	 * Update Tax Value
	 */
	public async updateExecutedQuantity(id: number, partialExecuted: number): Promise<boolean> {
		const operationRepository = getRepository(Operation);
		const result = await operationRepository.find({ where: { id: id } });
		const calcExecuted = parseInt(result[0].executed.toString()) + parseInt(partialExecuted.toString());
		const resultUpdate = await operationRepository.update({ id: id }, { executed: calcExecuted });
		return resultUpdate.affected !== undefined && resultUpdate.affected > 0;
	}
	/**
	 * Update Tax Value
	 */
	public async updateTaxValue(id: number, taxValues: ITaxValues): Promise<boolean> {
		const operationRepository = getRepository(Operation);
		const resultUpdate = await operationRepository.update(
			{ id: id },
			{
				negotiationTaxValue: taxValues.totalNegotiationTax,
				saleOffTaxValue: taxValues.totalSaleOffTax
			}
		);
		return resultUpdate.affected !== undefined && resultUpdate.affected > 0;
	}
}

export default OperationRepository;
