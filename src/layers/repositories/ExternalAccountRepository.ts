import { EntityRepository, getRepository } from 'typeorm';
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
	public async list(): Promise<ExternalAccount[]> {
		const externalAccountRepository = getRepository(ExternalAccount);
		const resultList = await externalAccountRepository.find();
		return resultList;
	}
}

export default ExternalAccountRepository;
