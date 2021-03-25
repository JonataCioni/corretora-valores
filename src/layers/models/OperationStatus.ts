import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { OperationStatusType } from '../Enums';

@Entity({ schema: 'corretora', name: 'operation_status' })
class OperationStatus {
	/**
	 * Properties
	 */
	@PrimaryGeneratedColumn('increment', { unsigned: true, name: 'id', type: 'bigint' })
	id: number;

	@Column('bigint', { name: 'operation_id' })
	idOperation: number;

	@Column('bigint', { name: 'quantity' })
	quantity: number;

	@Column('enum', { name: 'type', enum: OperationStatusType, enumName: 'statusType' })
	type: OperationStatusType;

	@CreateDateColumn({ name: 'status_date' })
	statusDate: Date;
}

export default OperationStatus;
