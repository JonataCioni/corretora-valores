import { IsDate, IsNotEmpty, Length } from 'class-validator';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'corretora', name: 'client' })
class Asset {
	/**
	 * Properties
	 */
	@PrimaryGeneratedColumn('increment', { unsigned: true, name: 'id', type: 'bigint' })
	id: number;

	@IsNotEmpty({ message: 'The field name not be empty' })
	@Length(5, 120, { message: 'The name must be between 5 and 120 characters' })
	@Column('varchar', { name: 'name' })
	name: string;

	@IsNotEmpty({ message: 'The field CPF not be empty' })
	@Length(5, 120, { message: 'The CPF must be 11 characters' })
	@Column('varchar', { name: 'cpf' })
	cpf: string;

	@IsNotEmpty({ message: 'The field password not be empty' })
	@Column('varchar', { name: 'password' })
	password: string;

	@IsNotEmpty({ message: 'The field birth date not be empty' })
	@IsDate({ message: 'The field birth date not valid' })
	@Column('date', { name: 'birth_date' })
	birthDate: Date;

	@CreateDateColumn({ name: 'register_date' })
	registerDate: Date;
}

export default Asset;
