import { ITaxValues } from '../interfaces/IOperation';

abstract class ServiceUtils {
	negotiationTax = 0.003006;
	saleOffTax = 0.0275;

	public calculateOperationValues(quantity: number, unitaryValue: number): ITaxValues {
		const operationValue = quantity * unitaryValue;
		const totalNegotiationTaxValue = this.negotiationTax * operationValue;
		const totalSaleOffTaxValue = this.saleOffTax * operationValue;
		const totalTaxesValue = totalNegotiationTaxValue + totalSaleOffTaxValue;
		const taxes: ITaxValues = {
			totalOperationValue: operationValue,
			totalOperationWithTaxes: operationValue + totalTaxesValue,
			totalNegotiationTax: totalNegotiationTaxValue,
			totalSaleOffTax: totalSaleOffTaxValue,
			totalTaxes: totalTaxesValue
		};
		return taxes;
	}
}

export default ServiceUtils;
