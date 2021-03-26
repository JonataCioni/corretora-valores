import { getRepository } from 'typeorm';
import { IExternalAccountRequest } from '../interfaces/IExternalAccount';
import ExternalAccount from '../models/ExternalAccount';

class ExternalAccountRepository {
	/**
	 * Register
	 */
	public async save(request: IExternalAccountRequest): Promise<void> {
		const externalAccountRepository = getRepository(ExternalAccount);
		const externalAccount = externalAccountRepository.create(request);
		await externalAccountRepository.save(externalAccount);
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
