import { IsEnum, IsNotEmpty } from 'class-validator';
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

	@IsNotEmpty({ message: 'The Operation not be empty' })
	@Column('bigint', { name: 'operation_id' })
	idOperation: number;

	@IsNotEmpty({ message: 'The quantity not be empty' })
	@Column('bigint', { name: 'quantity' })
	quantity: number;

	@IsEnum(OperationStatusType, { message: 'Type is not valid' })
	@IsNotEmpty({ message: 'The type not be empty' })
	@Column('enum', { name: 'type', enum: OperationStatusType, enumName: 'statusType' })
	type: OperationStatusType;

	@CreateDateColumn({ name: 'status_date' })
	statusDate: Date;

	@ManyToOne(() => Operation, (operation: Operation) => operation.operationStatus)
	@JoinColumn({ name: 'operation_id' })
	operation: Operation;
}

export default OperationStatus;
