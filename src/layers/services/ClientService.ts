import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import { IClientRequest } from '../interfaces/IClient';
import Client from '../models/Client';
import ClientRepository from '../repositories/ClientRepository';

class ClientService {
	/**
	 * Register
	 */
	public async save(request: IClientRequest): Promise<void> {
		try {
			const clientRepository = getCustomRepository(ClientRepository);
			request.password = await hash(request.password, 8);
			await clientRepository.save(request);
		} catch (error) {
			throw new AppError(`Error on register client: ${error}!`);
		}
	}
	/**
	 * List
	 */
	public async list(): Promise<Client[]> {
		try {
			const clientRepository = getCustomRepository(ClientRepository);
			const resultList = await clientRepository.list();
			return resultList;
		} catch (error) {
			throw new AppError(`Error on list clients: ${error}!`);
		}
	}
}

export default ClientService;
