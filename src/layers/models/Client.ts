import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'corretora', name: 'client' })
class Asset {
	/**
	 * Properties
	 */
	@PrimaryGeneratedColumn('increment', { unsigned: true, name: 'id', type: 'bigint' })
	id: number;

	@Column('varchar', { name: 'name' })
	name: string;

	@Column('varchar', { name: 'cpf' })
	cpf: string;

	@Column('varchar', { name: 'password' })
	password: string;

	@Column('date', { name: 'birth_date' })
	birthDate: Date;

	@CreateDateColumn({ name: 'register_date' })
	registerDate: Date;
}

export default Asset;
