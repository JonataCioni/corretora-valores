import { validate } from 'class-validator';
import { getCustomRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import AppValidationError from '../../errors/AppValidationError';
import { EventStatus, EventType } from '../Enums';
import { IAccountEventRequest } from '../interfaces/IAcountEvent';
import AccountEvent from '../models/AccountEvent';
import AccountEventRepository from '../repositories/AccountEventRepository';
import ClientRepository from '../repositories/ClientRepository';
import ExternalAccountRepository from '../repositories/ExternalAccountRepository';

class AccountEventService {
	/**
	 * Register
	 */
	public async save(request: IAccountEventRequest): Promise<AccountEvent> {
		try {
			const externalAccountRepository = getCustomRepository(ExternalAccountRepository);
			const resultExternalAccount = await externalAccountRepository.filter({
				where: { bankCode: request.origin.bank, bankBranch: request.origin.branch }
			});
			if (resultExternalAccount.length <= 0) {
				throw new AppError('No External Account Found');
			}
			const clientRepository = getCustomRepository(ClientRepository);
			const resultClient = await clientRepository.getByCpf(request.origin.cpf);
			if (resultClient === null) {
				throw new AppError('No Client Found');
			}
			const accountEvent: AccountEvent = new AccountEvent();
			accountEvent.idExternalAccount = resultExternalAccount[0].id;
			accountEvent.name = request.event;
			accountEvent.account = request.target.account;
			accountEvent.amount = request.amount;
			accountEvent.status = EventStatus.NONPROCESSED;
			const errors = await validate(accountEvent);
			if (errors.length > 0) {
				throw new AppValidationError(errors, 400);
			}
			const accountEventRepository = getCustomRepository(AccountEventRepository);
			const result = await accountEventRepository.save(accountEvent);
			let resultUpdateAmountAccount = false;
			if (accountEvent.name === EventType.DRAFT) {
				resultUpdateAmountAccount = await clientRepository.updateAccountAmount(resultClient.id, request.amount * -1);
			} else {
				resultUpdateAmountAccount = await clientRepository.updateAccountAmount(resultClient.id, request.amount);
			}
			if (!resultUpdateAmountAccount) {
				throw new AppError('Error on update account amount');
			}
			const resultUpdate = accountEventRepository.updateStatus(result.id);
			if (!resultUpdate) {
				throw new AppError('Error on update account event status');
			}
			return await accountEventRepository.getById(result.id);
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
