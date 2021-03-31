import { IsEnum, IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OperationType } from '../Enums';
import Asset from './Asset';
import OperationStatus from './OperationStatus';

@Entity({ schema: 'corretora', name: 'operation', orderBy: { idAsset: 'DESC', type: 'DESC' } })
class Operation {
	/**
	 * Properties
	 */
	@PrimaryGeneratedColumn('increment', { unsigned: true, name: 'id', type: 'bigint' })
	id: number;

	@IsNotEmpty({ message: 'The Client not be empty' })
	@Column('bigint', { name: 'client_id' })
	idClient: number;

	@IsNotEmpty({ message: 'The Asset not be empty' })
	@Column('int', { name: 'asset_id' })
	idAsset: number;

	@IsNotEmpty({ message: 'The total quantity not be empty' })
	@Column('bigint', { name: 'quantity' })
	quantity: number;

	@IsNotEmpty({ message: 'The total executed not be empty' })
	@Column('bigint', { name: 'executed' })
	executed: number;

	@IsNotEmpty({ message: 'The unitary value not be empty' })
	@Column('decimal', { name: 'unitary_value' })
	unitaryValue: number;

	@IsNotEmpty({ message: 'The tax value not be empty' })
	@Column('decimal', { name: 'tax_value' })
	taxValue: number;

	@IsEnum(OperationType, { message: 'Type is not valid' })
	@IsNotEmpty({ message: 'The type not be empty' })
	@Column('enum', { name: 'type', enum: OperationType, enumName: 'operationType' })
	type: OperationType;

	@ManyToOne(() => Asset, { eager: true })
	@JoinColumn({ name: 'asset_id' })
	asset: Asset;

	@OneToMany(() => OperationStatus, (operationStatus) => operationStatus.operation, { eager: true })
	operationStatus: OperationStatus[];
}

export default Operation;
