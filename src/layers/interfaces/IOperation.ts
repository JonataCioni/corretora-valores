import { OperationType } from '../Enums';

export interface IOperationRequest {
	idClient: number;
	idAsset: number;
	quantity: number;
	unitaryValue: number;
	type: OperationType;
}
