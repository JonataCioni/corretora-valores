import { compare, hash } from 'bcryptjs';
import { validate } from 'class-validator';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import authConfig from '../../config/auth';
import { currentPrice } from '../../database/currentPrice';
import AppError from '../../errors/AppError';
import AppValidationError from '../../errors/AppValidationError';
import {
	ICalcPosition,
	IClientAccountDataResponse,
	IClientLoginRequest,
	IClientLoginResponse,
	IClientRequest,
	IPosition
} from '../interfaces/IClient';
import Client from '../models/Client';
import ClientRepository from '../repositories/ClientRepository';
import OperationRepository from '../repositories/OperationRepository';

class ClientService {
	/**
	 * Register
	 */
	public async save(request: IClientRequest): Promise<Client> {
		try {
			const clientRepository = getCustomRepository(ClientRepository);
			const numberAccountGenerate = await clientRepository.countClients();
			const client: Client = new Client();
			client.name = request.name;
			client.cpf = request.cpf;
			client.email = request.email;
			client.birthDate = new Date(request.birthDate);
			client.password = await hash(request.password, 8);
			client.account = (numberAccountGenerate + 1).toString().padStart(6, '0');
			const errors = await validate(client);
			if (errors.length > 0) {
				throw new AppValidationError(errors, 400);
			}
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
	 * List Positions
	 */
	public async listPositions(id: number): Promise<IClientAccountDataResponse> {
		try {
			const position: IClientAccountDataResponse = {
				positions: new Array<IPosition>(),
				consolidated: 0,
				checkingAccountAmount: 0,
				consolidatedGain: ''
			};
			const clientRepository = getCustomRepository(ClientRepository);
			const client = await clientRepository.getById(id);
			position.checkingAccountAmount = client.amount;
			const operationRepository = getCustomRepository(OperationRepository);
			const resultList = await operationRepository.getByClient(id);
			const calcPositions: ICalcPosition[] = new Array<ICalcPosition>();
			resultList.forEach((operation) => {
				const cp = currentPrice.filter((cpr) => cpr.symbol === operation.asset.code)[0];
				const getCalcPosition = calcPositions.filter((p) => p.symbol === operation.asset.code);
				if (getCalcPosition.length <= 0) {
					calcPositions.push({
						symbol: operation.asset.code,
						quantity: [operation.executed],
						values: [operation.unitaryValue]
					});
				} else {
					getCalcPosition[0].quantity.push(operation.executed);
					getCalcPosition[0].values.push(operation.unitaryValue);
				}
				position.consolidated += cp.value * operation.executed;
			});
			let totalValue = 0;
			calcPositions.forEach((positionCalc) => {
				const cp = currentPrice.filter((cpr) => cpr.symbol === positionCalc.symbol)[0];
				let totalPositionValue = 0;
				let totalPositionQtt = 0;
				for (let i = 0; i < positionCalc.quantity.length; i++) {
					const actualQtt = parseInt(positionCalc.quantity[i].toString());
					totalPositionQtt += actualQtt;
					const actualPrice = parseFloat(positionCalc.values[i].toString());
					totalPositionValue += actualQtt * actualPrice;
				}
				totalValue += totalPositionValue;
				const averagePrice = parseFloat((totalPositionValue / totalPositionQtt).toFixed(2));
				const currentGain = `${((cp.value / averagePrice) * 100 - 100).toFixed(2)}%`;
				position.positions.push({
					symbol: positionCalc.symbol,
					currentPrice: cp.value,
					quantity: totalPositionQtt,
					averagePrice: averagePrice,
					currentGain: currentGain
				});
			});
			position.consolidatedGain = `${((position.consolidated / totalValue) * 100 - 100).toFixed(2)}%`;
			return position;
		} catch (error) {
			throw new AppError(`Error on list clients: ${error}!`);
		}
	}
	/**
	 * Authentication
	 */
	public async login(request: IClientLoginRequest): Promise<IClientLoginResponse> {
		const clientRepository = getCustomRepository(ClientRepository);
		let client;
		const regexVerifyTypeLogin = new RegExp('^[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}$', 'gim');
		const matchLogin = request.login.match(regexVerifyTypeLogin);
		if (matchLogin !== undefined && matchLogin !== null && matchLogin.length > 0) {
			client = await clientRepository.getByCpf(request.login);
		} else {
			client = await clientRepository.getByEmail(request.login);
		}
		if (client !== null && client.id > 0) {
			const validCombination = await compare(request.password, client.password);
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
