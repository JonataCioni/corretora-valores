import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AssetType } from '../Enums';

@Entity({ schema: 'corretora', name: 'asset' })
class Asset {
	/**
	 * Properties
	 */
	@PrimaryGeneratedColumn('increment', { unsigned: true, name: 'id', type: 'int' })
	id: number;

	@Column('int', { name: 'company_id' })
	idCompany: number;

	@Column('varchar', { name: 'code' })
	code: string;

	@Column('enum', { name: 'type', enum: AssetType, enumName: 'assetType' })
	type: AssetType;
}

export default Asset;
