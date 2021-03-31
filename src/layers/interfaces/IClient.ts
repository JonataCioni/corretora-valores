import Client from '../models/Client';

export interface IClientRequest {
	name: string;
	cpf: string;
	email: string;
	password: string;
	birthDate: string;
}

export interface IClientLoginRequest {
	login: string;
	password: string;
}

export interface IClientLoginResponse {
	client: Client;
	token: string;
}

export interface ICalcPosition {
	symbol: string;
	quantity: number[];
	values: number[];
}

export interface IPosition {
	symbol: string;
	quantity: number;
	currentPrice: number;
	averagePrice: number;
	currentGain: string;
}

export interface IClientAccountDataResponse {
	checkingAccountAmount: number; // Saldo em conta corrente
	positions: IPosition[];
	consolidated: number;
	consolidatedGain: string;
}
