import { NextFunction, Request, Response } from 'express';
import AppError from './AppError';
import AppValidationError from './AppValidationError';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GlobalErrorHandling = (error: Error, request: Request, response: Response, next: NextFunction): any => {
	if (error instanceof AppError) {
		return response.status(error.statusCode).json({
			status: 'error',
			message: error.message
		});
	}
	if (error instanceof AppValidationError) {
		return response.status(error.statusCode).json({
			status: 'error',
			message: error.errors
		});
	}
	return response.status(500).json({
		status: 'error',
		message: error.message,
		stack: error.stack
	});
};

export default GlobalErrorHandling;
