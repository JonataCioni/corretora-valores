import { compare, hash } from 'bcryptjs';
import { validate } from 'class-validator';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import authConfig from '../../config/auth';
import AppError from '../../errors/AppError';
import AppValidationError from '../../errors/AppValidationError';
import { IClientLoginResponse, IClientRequest } from '../interfaces/IClient';
import Client from '../models/Client';
import ClientRepository from '../repositories/ClientRepository';

class ClientService {
	/**
	 * Register
	 */
	public async save(request: IClientRequest): Promise<Client> {
		try {
			const client: Client = new Client();
			client.name = request.name;
			client.cpf = request.cpf;
			client.email = request.email;
			client.birthDate = new Date(request.birthDate);
			client.password = await hash(request.password, 8);
			const errors = await validate(client);
			if (errors.length > 0) {
				throw new AppValidationError(errors, 400);
			}
			const clientRepository = getCustomRepository(ClientRepository);
			return await clientRepository.save(client);
		} catch (error) {
			if (error instanceof AppValidationError) {
				throw error;
			}
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
	/**
	 * Authentication
	 */
	public async login(login: string, password: string): Promise<IClientLoginResponse> {
		const clientRepository = getCustomRepository(ClientRepository);
		let client: Client = new Client();
		const regexVerifyTypeLogin = new RegExp('^[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}$', 'gim');
		const matchLogin = login.match(regexVerifyTypeLogin);
		if (matchLogin !== undefined && matchLogin !== null && matchLogin.length > 0) {
			client = await clientRepository.getByCpf(login);
		} else {
			client = await clientRepository.getByEmail(login);
		}
		if (client.id > 0) {
			const validCombination = await compare(password, client.password);
			if (validCombination) {
				const token = sign({}, authConfig.jwt.secret, {
					subject: client.id.toString(),
					expiresIn: authConfig.jwt.expiresIn
				});
				return { client, token };
			}
		}
		throw new AppError('Login/Senha Inválidos!', 401);
	}
}

export default ClientService;
