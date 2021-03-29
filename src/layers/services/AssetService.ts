import { getCustomRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import { IAssetRequest } from '../interfaces/IAsset';
import Asset from '../models/Asset';
import AssetRepository from '../repositories/AssetRepository';

class AssetService {
	/**
	 * Register
	 */
	public async save(request: IAssetRequest): Promise<void> {
		try {
			const assetRepository = getCustomRepository(AssetRepository);
			await assetRepository.save(request);
		} catch (error) {
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
