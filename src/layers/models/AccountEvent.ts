import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'corretora', name: 'account_event' })
class AccountEvent {
	/**
	 * Properties
	 */
	@PrimaryGeneratedColumn('increment', { unsigned: true, name: 'id', type: 'bigint' })
	id: number;

	@Column('bigint', { name: 'external_account_id' })
	idExternalAccount: number;

	@Column('varchar', { name: 'name' })
	name: string;

	@Column('varchar', { name: 'account' })
	account: string;

	@Column('decimal', { name: 'amount' })
	amount: number;

	@CreateDateColumn({ name: 'event_date' })
	eventDate: Date;
}

export default AccountEvent;
