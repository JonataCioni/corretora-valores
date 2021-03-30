import { EntityRepository, getRepository } from 'typeorm';
import AccountEvent from '../models/AccountEvent';

@EntityRepository(AccountEvent)
class AccountEventRepository {
	/**
	 * Register
	 */
	public async save(accountEvent: AccountEvent): Promise<AccountEvent> {
		const accountEventRepository = getRepository(AccountEvent);
		const result = accountEventRepository.create(accountEvent);
		return await accountEventRepository.save(result);
	}
	/**
	 * List
	 */
	public async list(): Promise<AccountEvent[]> {
		const accountEventRepository = getRepository(AccountEvent);
		const resultList = await accountEventRepository.find();
		return resultList;
	}
}

export default AccountEventRepository;
