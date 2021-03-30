import Client from '../models/Client';

export interface IClientRequest {
	name: string;
	cpf: string;
	email: string;
	password: string;
	birthDate: Date;
}

export interface IClientLoginResponse {
	client: Client;
	token: string;
}
