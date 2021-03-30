import { EntityRepository, getRepository } from 'typeorm';
import { IAssetRequest } from '../interfaces/IAsset';
import Asset from '../models/Asset';

@EntityRepository(Asset)
class AssetRepository {
	/**
	 * Register
	 */
	public async save(request: IAssetRequest): Promise<void> {
		const assetRepository = getRepository(Asset);
		const asset = assetRepository.create(request);
		await assetRepository.save(asset);
	}
	/**
	 * List
	 */
	public async list(): Promise<Asset[]> {
		const assetRepository = getRepository(Asset);
		const resultList = await assetRepository.find();
		return resultList;
	}
}

export default AssetRepository;
