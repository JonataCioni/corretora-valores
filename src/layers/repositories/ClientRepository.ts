import { EntityRepository, getRepository } from 'typeorm';
import { IClientRequest } from '../interfaces/IClient';
import Client from '../models/Client';

@EntityRepository(Client)
class ClientRepository {
	/**
	 * Register
	 */
	public async save(request: IClientRequest): Promise<void> {
		const clientRepository = getRepository(Client);
		const client = clientRepository.create(request);
		await clientRepository.save(client);
	}
	/**
	 * List
	 */
	public async list(): Promise<Client[]> {
		const clientRepository = getRepository(Client);
		const resultList = await clientRepository.find();
		return resultList;
	}
}

export default ClientRepository;
