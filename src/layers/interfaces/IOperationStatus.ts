import { OperationStatusType } from '../Enums';

export interface IOperationStatusRequest {
	idOperation: number;
	quantity: number;
	type: OperationStatusType;
}
