import { EventType } from '../Enums';

export interface IAccountEventRequest {
	event: EventType;
	target: {
		bank: string;
		branch: string;
		account: string;
	};
	origin: {
		bank: string;
		branch: string;
		cpf: string;
	};
	amount: number;
}
