import { EntityRepository, FindManyOptions, getRepository } from 'typeorm';
import ExternalAccount from '../models/ExternalAccount';

@EntityRepository(ExternalAccount)
class ExternalAccountRepository {
	/**
	 * Register
	 */
	public async save(externalAccount: ExternalAccount): Promise<ExternalAccount> {
		const externalAccountRepository = getRepository(ExternalAccount);
		const result = externalAccountRepository.create(externalAccount);
		return await externalAccountRepository.save(result);
	}
	/**
	 * List
	 */
	public async list(idClient: number): Promise<ExternalAccount[]> {
		const externalAccountRepository = getRepository(ExternalAccount);
		const resultList = await externalAccountRepository.find({ where: { idClient: idClient } });
		return resultList;
	}
	/**
	 * Filter
	 */
	public async filter(options?: FindManyOptions<ExternalAccount>): Promise<ExternalAccount[]> {
		const externalAccountRepository = getRepository(ExternalAccount);
		const resultList = await externalAccountRepository.find(options);
		return resultList;
	}
}

export default ExternalAccountRepository;
