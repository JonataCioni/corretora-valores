import { validate } from 'class-validator';
import { getCustomRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import AppValidationError from '../../errors/AppValidationError';
import { IExternalAccountRequest } from '../interfaces/IExternalAccount';
import ExternalAccount from '../models/ExternalAccount';
import ExternalAccountRepository from '../repositories/ExternalAccountRepository';

class ExternalAccountService {
	/**
	 * Register
	 */
	public async save(request: IExternalAccountRequest): Promise<void> {
		try {
			const externalAccount: ExternalAccount = new ExternalAccount();
			externalAccount.idClient = request.idClient;
			externalAccount.bankCode = request.bankCode;
			externalAccount.bankBranch = request.bankBranch;
			const errors = await validate(externalAccount);
			if (errors.length > 0) {
				throw new AppValidationError(errors, 400);
			}
			const externalAccountRepository = getCustomRepository(ExternalAccountRepository);
			await externalAccountRepository.save(externalAccount);
		} catch (error) {
			throw new AppError(`Error on register external account: ${error}!`);
		}
	}
	/**
	 * List
	 */
	public async list(): Promise<ExternalAccount[]> {
		try {
			const externalAccountRepository = getCustomRepository(ExternalAccountRepository);
			const resultList = await externalAccountRepository.list();
			return resultList;
		} catch (error) {
			throw new AppError(`Error on list external accounts: ${error}!`);
		}
	}
}

export default ExternalAccountService;
