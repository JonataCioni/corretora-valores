import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { OperationType } from '../Enums';

@Entity({ schema: 'corretora', name: 'operation' })
class Operation {
	/**
	 * Properties
	 */
	@PrimaryGeneratedColumn('increment', { unsigned: true, name: 'id', type: 'bigint' })
	id: number;

	@Column('bigint', { name: 'client_id' })
	idClient: number;

	@Column('int', { name: 'asset_id' })
	idAsset: number;

	@Column('bigint', { name: 'quantity' })
	quantity: number;

	@Column('bigint', { name: 'executed' })
	executed: number;

	@Column('decimal', { name: 'unitary_value' })
	unitaryValue: number;

	@Column('decimal', { name: 'tax_value' })
	taxValue: number;

	@Column('enum', { name: 'type', enum: OperationType, enumName: 'operationType' })
	type: OperationType;
}

export default Operation;
