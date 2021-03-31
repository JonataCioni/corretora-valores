import { IsEnum, IsNotEmpty, Length } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AssetType } from '../Enums';
import Company from './Company';

@Entity({ schema: 'corretora', name: 'asset' })
class Asset {
	/**
	 * Properties
	 */
	@PrimaryGeneratedColumn('increment', { unsigned: true, name: 'id', type: 'int' })
	id: number;

	@IsNotEmpty({ message: 'The Company not be empty' })
	@Column('int', { name: 'company_id' })
	idCompany: number;

	@IsNotEmpty({ message: 'The Code not be empty' })
	@Length(5, 8, { message: 'The name code must be between 5 and 8 characters' })
	@Column('varchar', { name: 'code' })
	code: string;

	@IsEnum(AssetType, { message: 'Incorrect Type' })
	@Column('enum', { name: 'type', enum: AssetType, enumName: 'assetType' })
	type: AssetType;

	@ManyToOne(() => Company, { eager: true })
	@JoinColumn({ name: 'company_id' })
	company: Company;
}

export default Asset;
