import { validate } from 'class-validator';
import { getCustomRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import AppValidationError from '../../errors/AppValidationError';
import { IAssetRequest } from '../interfaces/IAsset';
import Asset from '../models/Asset';
import AssetRepository from '../repositories/AssetRepository';

class AssetService {
	/**
	 * Register
	 */
	public async save(request: IAssetRequest): Promise<Asset> {
		try {
			const asset: Asset = new Asset();
			asset.idCompany = request.idCompany;
			asset.code = request.code;
			asset.type = request.type;
			const errors = await validate(asset);
			if (errors.length > 0) {
				throw new AppValidationError(errors, 400);
			}
			const assetRepository = getCustomRepository(AssetRepository);
			return await assetRepository.save(asset);
		} catch (error) {
			if (error instanceof AppValidationError) {
				throw error;
			}
			throw new AppError(`Error on register asset: ${error}!`);
		}
	}
	/**
	 * List
	 */
	public async list(): Promise<Asset[]> {
		try {
			const assetRepository = getCustomRepository(AssetRepository);
			const resultList = await assetRepository.list();
			return resultList;
		} catch (error) {
			throw new AppError(`Error on list assets: ${error}!`);
		}
	}
}

export default AssetService;
