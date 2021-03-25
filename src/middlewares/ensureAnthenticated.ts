import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from '../../src/errors/AppError';
import authConfig from '../config/auth';

interface TokenPayload {
	iat: number;
	exp: number;
	sub: string;
}

const ensureAnthenticated = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
	const authHeader = request.headers.authorization;
	if (!authHeader) {
		throw new AppError('Token JWT não presente na requisição');
	}
	const [, token] = authHeader.split(' ');
	try {
		const decoded = verify(token, authConfig.jwt.secret);
		const { sub } = decoded as TokenPayload;
		request.user = {
			id: parseInt(sub)
		};
		return next();
	} catch (ex) {
		throw new AppError('Token JWT inválido');
	}
};

export default ensureAnthenticated;
