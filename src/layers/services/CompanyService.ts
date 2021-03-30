import { validate } from 'class-validator';
import { getCustomRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import AppValidationError from '../../errors/AppValidationError';
import { ICompanyRequest } from '../interfaces/ICompany';
import Company from '../models/Company';
import CompanyRepository from '../repositories/CompanyRepository';

class CompanyService {
	/**
	 * Register
	 */
	public async save(request: ICompanyRequest): Promise<void> {
		try {
			const company: Company = new Company();
			company.name = request.name;
			company.cnpj = request.cnpj;
			const errors = await validate(company);
			if (errors.length > 0) {
				throw new AppValidationError(errors, 400);
			}
			const companyRepository = getCustomRepository(CompanyRepository);
			await companyRepository.save(company);
		} catch (error) {
			throw new AppError(`Error on register company: ${error}!`);
		}
	}
	/**
	 * List
	 */
	public async list(): Promise<Company[]> {
		try {
			const companyRepository = getCustomRepository(CompanyRepository);
			const resultList = await companyRepository.list();
			return resultList;
		} catch (error) {
			throw new AppError(`Error on list companies: ${error}!`);
		}
	}
}

export default CompanyService;
