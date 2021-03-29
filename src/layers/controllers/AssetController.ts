import { Request, Response } from 'express';
import AssetService from '../services/AssetService';

class AssetController {
	public async save(request: Request, response: Response): Promise<Response<any, Record<string, any>>> {
		const assetService = new AssetService();
		const asset = await assetService.save(request.body);
		return response.json(asset);
	}

	public async list(_: Request, response: Response): Promise<Response<any, Record<string, any>>> {
		const assetService = new AssetService();
		const assets = await assetService.list();
		return response.json(assets);
	}
}

export default new AssetController();
