import { EntityRepository, getRepository } from 'typeorm';
import Client from '../models/Client';

@EntityRepository(Client)
class ClientRepository {
	/**
	 * Register
	 */
	public async save(client: Client): Promise<Client> {
		const clientRepository = getRepository(Client);
		const result = clientRepository.create(client);
		return await clientRepository.save(result);
	}
	/**
	 * Register
	 */
	public async countClients(): Promise<number> {
		const clientRepository = getRepository(Client);
		return await clientRepository.count();
	}
	/**
	 * List
	 */
	public async list(): Promise<Client[]> {
		const clientRepository = getRepository(Client);
		const resultList = await clientRepository.find();
		return resultList;
	}
	/**
	 * Get Client By Id
	 */
	public async getById(id: number): Promise<Client> {
		const clientRepository = getRepository(Client);
		return await clientRepository.findOneOrFail({ where: { id: id } });
	}
	/**
	 * Get Client By CPF
	 */
	public async getByCpf(cpf: string): Promise<Client | null> {
		const clientRepository = getRepository(Client);
		const resultList = await clientRepository.find({ where: { cpf: cpf } });
		if (resultList.length > 0) {
			return resultList[0];
		}
		return null;
	}
	/**
	 * Get Client By Email
	 */
	public async getByEmail(email: string): Promise<Client | null> {
		const clientRepository = getRepository(Client);
		const resultList = await clientRepository.find({ where: { email: email } });
		if (resultList.length > 0) {
			return resultList[0];
		}
		return null;
	}
	/**
	 * Update Account Amount
	 */
	public async updateAccountAmount(idClient: number, amountToUpdate: number): Promise<boolean> {
		const clientRepository = getRepository(Client);
		const resultList = await clientRepository.findOne({ where: { id: idClient } });
		if (resultList !== undefined) {
			const sum = parseFloat(resultList.amount.toString()) + parseFloat(amountToUpdate.toString());
			const result = await clientRepository.update({ id: idClient }, { amount: sum });
			if (result.affected !== undefined && result.affected > 0) {
				return true;
			}
		}
		return false;
	}
}

export default ClientRepository;
