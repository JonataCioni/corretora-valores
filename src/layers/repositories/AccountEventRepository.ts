import { EntityRepository, getRepository } from 'typeorm';
import { EventStatus } from '../Enums';
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
	/**
	 * Get By Id
	 */
	public async getById(id: number): Promise<AccountEvent> {
		const accountEventRepository = getRepository(AccountEvent);
		return await accountEventRepository.findOneOrFail({ where: { id: id } });
	}
	/**
	 * Register
	 */
	public async updateStatus(id: number): Promise<boolean> {
		const accountEventRepository = getRepository(AccountEvent);
		const result = await accountEventRepository.update({ id: id }, { status: EventStatus.PROCESSED });
		return result.affected !== undefined && result.affected > 0;
	}
}

export default AccountEventRepository;
