import { EntityRepository, getRepository } from 'typeorm';
import Asset from '../models/Asset';

@EntityRepository(Asset)
class AssetRepository {
	/**
	 * Register
	 */
	public async save(asset: Asset): Promise<Asset> {
		const assetRepository = getRepository(Asset);
		const result = assetRepository.create(asset);
		return await assetRepository.save(result);
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
