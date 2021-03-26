import { getCustomRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import { IAccountEventRequest } from '../interfaces/IAcountEvent';
import AccountEvent from '../models/AccountEvent';
import AccountEventRepository from '../repositories/AccountEventRepository';

class AccountEventService {
	/**
	 * Register
	 */
	public async save(request: IAccountEventRequest): Promise<void> {
		try {
			const accountEventRepository = getCustomRepository(AccountEventRepository);
			await accountEventRepository.save(request);
		} catch (error) {
			throw new AppError(`Error on register event: ${error}!`);
		}
	}
	/**
	 * List
	 */
	public async list(): Promise<AccountEvent[]> {
		try {
			const accountEventRepository = getCustomRepository(AccountEventRepository);
			const resultList = await accountEventRepository.list();
			return resultList;
		} catch (error) {
			throw new AppError(`Error on list events: ${error}!`);
		}
	}
}

export default AccountEventService;
