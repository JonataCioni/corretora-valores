import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OperationStatusType } from '../Enums';
import Operation from './Operation';

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

	@ManyToOne(() => Operation, (operation: Operation) => operation.operationStatus)
	@JoinColumn({ name: 'operation_id' })
	operation: Operation;
}

export default OperationStatus;
