import { IsNotEmpty, Length } from 'class-validator';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EventStatus, EventType } from '../Enums';

@Entity({ schema: 'corretora', name: 'account_event', orderBy: { name: 'ASC', id: 'ASC' } })
class AccountEvent {
	/**
	 * Properties
	 */
	@PrimaryGeneratedColumn('increment', { unsigned: true, name: 'id', type: 'bigint' })
	id: number;

	@IsNotEmpty({ message: 'The External Account not be empty' })
	@Column('bigint', { name: 'external_account_id' })
	idExternalAccount: number;

	@Column('enum', { name: 'name', enum: EventType, enumName: 'eventType' })
	name: EventType;

	@Length(6, 6, { message: 'The account field must be 6 characters' })
	@Column('varchar', { name: 'account' })
	account: string;

	@IsNotEmpty({ message: 'The amount not be empty' })
	@Column('decimal', { name: 'amount' })
	amount: number;

	@Column('enum', { name: 'status', enum: EventStatus, enumName: 'eventStatus' })
	status: EventStatus;

	@CreateDateColumn({ name: 'event_date' })
	eventDate: Date;
}

export default AccountEvent;
