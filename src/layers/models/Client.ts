import { IsDate, IsNotEmpty, Length } from 'class-validator';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'corretora', name: 'client' })
class Client {
	/**
	 * Properties
	 */
	@PrimaryGeneratedColumn('increment', { unsigned: true, name: 'id', type: 'int' })
	id: number;

	@IsNotEmpty({ message: 'The field name not be empty' })
	@Length(5, 120, { message: 'The name must be between 5 and 120 characters' })
	@Column('varchar', { name: 'name' })
	name: string;

	@IsNotEmpty({ message: 'The field CPF not be empty' })
	@Length(14, 14, { message: 'The CPF must be 14 characters' })
	@Column('varchar', { name: 'cpf' })
	cpf: string;

	@IsNotEmpty({ message: 'The field Account not be empty' })
	@Length(6, 6, { message: 'The Account must be 6 characters' })
	@Column('varchar', { name: 'account' })
	account: string;

	@IsNotEmpty({ message: 'The field email not be empty' })
	@Length(5, 120, { message: 'The email must be between 5 and 120 characters' })
	@Column('varchar', { name: 'email' })
	email: string;

	@IsNotEmpty({ message: 'The field password not be empty' })
	@Column('varchar', { name: 'password' })
	password: string;

	@IsNotEmpty({ message: 'The field birth date not be empty' })
	@IsDate({ message: 'The field birth date not valid' })
	@Column('date', { name: 'birth_date' })
	birthDate: Date;

	@Column('varchar', { name: 'amount', default: 0 })
	amount: number;

	@CreateDateColumn({ name: 'register_date' })
	registerDate: Date;
}

export default Client;
