import { IsNotEmpty, Length } from 'class-validator';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'corretora', name: 'account_event' })
class AccountEvent {
	/**
	 * Properties
	 */
	@PrimaryGeneratedColumn('increment', { unsigned: true, name: 'id', type: 'bigint' })
	id: number;

	@IsNotEmpty({ message: 'The External Account not be empty' })
	@Column('bigint', { name: 'external_account_id' })
	idExternalAccount: number;

	@Length(3, 10, { message: 'The name field must be between 3 and 10 characters' })
	@Column('varchar', { name: 'name' })
	name: string;

	@Length(8, 8, { message: 'The account field must be 8 characters' })
	@Column('varchar', { name: 'account' })
	account: string;

	@IsNotEmpty({ message: 'The amount not be empty' })
	@Column('decimal', { name: 'amount' })
	amount: number;

	@CreateDateColumn({ name: 'event_date' })
	eventDate: Date;
}

export default AccountEvent;
