import { IsNotEmpty, Length } from 'class-validator';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'corretora', name: 'external_account' })
class ExternalAccount {
	/**
	 * Properties
	 */
	@PrimaryGeneratedColumn('increment', { unsigned: true, name: 'id', type: 'int' })
	id: number;

	@IsNotEmpty({ message: 'The Client not be empty' })
	@Column('int', { name: 'client_id' })
	idClient: number;

	@IsNotEmpty({ message: 'The bank code not be empty' })
	@Length(3, 5, { message: 'The bank code must be between 3 and 5 characters' })
	@Column('varchar', { name: 'bank_code' })
	bankCode: string;

	@IsNotEmpty({ message: 'The bank branch not be empty' })
	@Length(5, 8, { message: 'The bank branch must be between 5 and 8 characters' })
	@Column('varchar', { name: 'bank_branch' })
	bankBranch: string;

	@CreateDateColumn({ name: 'register_date' })
	registerDate: Date;
}

export default ExternalAccount;
