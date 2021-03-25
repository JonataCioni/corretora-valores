import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'corretora', name: 'company' })
class Company {
	/**
	 * Properties
	 */
	@PrimaryGeneratedColumn('increment', { unsigned: true, name: 'id', type: 'int' })
	id: number;

	@Column('varchar', { name: 'name' })
	name: string;

	@Column('varchar', { name: 'cnpj' })
	cnpj: string;
}

export default Company;
