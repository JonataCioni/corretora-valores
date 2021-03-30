import { IsNotEmpty, Length } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'corretora', name: 'company' })
class Company {
	/**
	 * Properties
	 */
	@PrimaryGeneratedColumn('increment', { unsigned: true, name: 'id', type: 'int' })
	id: number;

	@IsNotEmpty({ message: 'The field name not be empty' })
	@Length(5, 200, { message: 'The name must be between 5 and 200 characters' })
	@Column('varchar', { name: 'name' })
	name: string;

	@IsNotEmpty({ message: 'The field CNPJ not be empty' })
	@Length(18, 18, { message: 'The name must be 18 characters' })
	@Column('varchar', { name: 'cnpj' })
	cnpj: string;
}

export default Company;
