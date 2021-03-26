import { getRepository } from 'typeorm';
import { ICompanyRequest } from '../interfaces/ICompany';
import Company from '../models/Company';

class CompanyRepository {
	/**
	 * Register
	 */
	public async save(request: ICompanyRequest): Promise<void> {
		const companyRepository = getRepository(Company);
		const company = companyRepository.create(request);
		await companyRepository.save(company);
	}
	/**
	 * List
	 */
	public async list(): Promise<Company[]> {
		const companyRepository = getRepository(Company);
		const resultList = await companyRepository.find();
		return resultList;
	}
}

export default CompanyRepository;
