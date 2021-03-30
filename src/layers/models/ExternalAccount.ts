import { IsNotEmpty, Length } from 'class-validator';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'corretora', name: 'external_account' })
class ExternalAccount {
	/**
	 * Properties
	 */
	@PrimaryGeneratedColumn('increment', { unsigned: true, name: 'id', type: 'bigint' })
	id: number;

	@IsNotEmpty({ message: 'The Client not be empty' })
	@Column('bigint', { name: 'client_id' })
	idClient: number;

	@IsNotEmpty({ message: 'The bank code not be empty' })
	@Length(5, 8, { message: 'The name code must be 5 characters' })
	@Column('varchar', { name: 'bank_code' })
	bankCode: string;

	@IsNotEmpty({ message: 'The bank branch not be empty' })
	@Length(5, 8, { message: 'The name code must be 8 characters' })
	@Column('varchar', { name: 'bank_branch' })
	bankBranch: string;

	@CreateDateColumn({ name: 'register_date' })
	registerDate: Date;
}

export default ExternalAccount;
