import { EntityRepository, getRepository } from 'typeorm';
import Company from '../models/Company';

@EntityRepository(Company)
class CompanyRepository {
	/**
	 * Register
	 */
	public async save(company: Company): Promise<void> {
		const companyRepository = getRepository(Company);
		const result = companyRepository.create(company);
		await companyRepository.save(result);
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
