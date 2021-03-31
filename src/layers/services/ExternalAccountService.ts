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
	public async save(request: IExternalAccountRequest): Promise<ExternalAccount> {
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
			return await externalAccountRepository.save(externalAccount);
		} catch (error) {
			if (error instanceof AppValidationError) {
				throw error;
			}
			throw new AppError(`Error on register external account: ${error}!`);
		}
	}
	/**
	 * List
	 */
	public async list(idClient: number): Promise<ExternalAccount[]> {
		try {
			const externalAccountRepository = getCustomRepository(ExternalAccountRepository);
			const resultList = await externalAccountRepository.list(idClient);
			return resultList;
		} catch (error) {
			throw new AppError(`Error on list external accounts: ${error}!`);
		}
	}
}

export default ExternalAccountService;
