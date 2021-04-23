import { OperationType } from '../Enums';

export interface IOperationRequest {
	idClient: number;
	idAsset: number;
	quantity: number;
	unitaryValue: number;
	type: OperationType;
}

export interface ITaxValues {
	totalOperationValue: number;
	totalOperationWithTaxes: number;
	totalNegotiationTax: number;
	totalSaleOffTax: number;
	totalTaxes: number;
}
