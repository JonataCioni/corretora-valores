import { EntityRepository, getRepository } from 'typeorm';
import Client from '../models/Client';

@EntityRepository(Client)
class ClientRepository {
	/**
	 * Register
	 */
	public async save(client: Client): Promise<void> {
		const clientRepository = getRepository(Client);
		const result = clientRepository.create(client);
		await clientRepository.save(result);
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
	 * Get Client By CPF
	 */
	public async getByCpf(cpf: string): Promise<Client> {
		const clientRepository = getRepository(Client);
		let client: Client = new Client();
		const resultList = await clientRepository.find({ where: { cpf: cpf } });
		if (resultList.length > 0) {
			client = resultList[0];
		}
		return client;
	}
	/**
	 * Get Client By Email
	 */
	public async getByEmail(email: string): Promise<Client> {
		const clientRepository = getRepository(Client);
		let client: Client = new Client();
		const resultList = await clientRepository.find({ where: { email: email } });
		if (resultList.length > 0) {
			client = resultList[0];
		}
		return client;
	}
}

export default ClientRepository;
