import { AssetType } from '../Enums';

export interface IAssetRequest {
	idCompany: number;
	code: string;
	type: AssetType;
}
