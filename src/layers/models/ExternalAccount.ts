import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'corretora', name: 'external_account' })
class ExternalAccount {
	/**
	 * Properties
	 */
	@PrimaryGeneratedColumn('increment', { unsigned: true, name: 'id', type: 'bigint' })
	id: number;

	@Column('bigint', { name: 'client_id' })
	idClient: number;

	@Column('varchar', { name: 'bank_code' })
	bankCode: string;

	@Column('varchar', { name: 'bank_branch' })
	bankBranch: string;

	@CreateDateColumn({ name: 'register_date' })
	registerDate: Date;
}

export default ExternalAccount;
