import { OperationType } from '../Enums';

export interface IOperationRequest {
	idClient: number;
	idAsset: number;
	quantity: number;
	executed: number;
	unitaryValue: number;
	taxValue: number;
	type: OperationType;
}
