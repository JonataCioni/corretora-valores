import { EntityRepository, getRepository } from 'typeorm';
import { IAccountEventRequest } from '../interfaces/IAcountEvent';
import AccountEvent from '../models/AccountEvent';

@EntityRepository(AccountEvent)
class AccountEventRepository {
	/**
	 * Register
	 */
	public async save(request: IAccountEventRequest): Promise<void> {
		const accountEventRepository = getRepository(AccountEvent);
		const accountEvent = accountEventRepository.create(request);
		await accountEventRepository.save(accountEvent);
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
