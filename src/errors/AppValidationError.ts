import { ValidationError } from 'class-validator';

class AppValidationError {
	public readonly errors: ValidationError[];
	public readonly statusCode: number;

	constructor(errors: ValidationError[], statusCode = 400) {
		this.errors = errors;
		this.statusCode = statusCode;
	}
}

export default AppValidationError;
