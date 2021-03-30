import { validate } from 'class-validator';
import { getCustomRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import AppValidationError from '../../errors/AppValidationError';
import { IAccountEventRequest } from '../interfaces/IAcountEvent';
import AccountEvent from '../models/AccountEvent';
import AccountEventRepository from '../repositories/AccountEventRepository';

class AccountEventService {
	/**
	 * Register
	 */
	public async save(request: IAccountEventRequest): Promise<AccountEvent> {
		try {
			const accountEvent: AccountEvent = new AccountEvent();
			accountEvent.idExternalAccount = request.idExternalAccount;
			accountEvent.name = request.name;
			accountEvent.account = request.account;
			accountEvent.amount = request.amount;
			const errors = await validate(accountEvent);
			if (errors.length > 0) {
				throw new AppValidationError(errors, 400);
			}
			const accountEventRepository = getCustomRepository(AccountEventRepository);
			return await accountEventRepository.save(accountEvent);
		} catch (error) {
			if (error instanceof AppValidationError) {
				throw error;
			}
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
