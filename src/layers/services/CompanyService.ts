import { getCustomRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import { ICompanyRequest } from '../interfaces/ICompany';
import Company from '../models/Company';
import CompanyRepository from '../repositories/CompanyRepository';

class CompanyService {
	/**
	 * Register
	 */
	public async save(request: ICompanyRequest): Promise<void> {
		try {
			const companyRepository = getCustomRepository(CompanyRepository);
			await companyRepository.save(request);
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
