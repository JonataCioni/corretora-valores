import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';
import { TableColumnOptions } from 'typeorm/schema-builder/options/TableColumnOptions';

export class CreateStartTables1616613601973 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		/**
		 * Creating Tables
		 */
		await this.createTableAccountEvent(queryRunner);
		await this.createTableAsset(queryRunner);
		await this.createTableClient(queryRunner);
		await this.createTableCompany(queryRunner);
		await this.createTableExternalAccount(queryRunner);
		await this.createTableOperation(queryRunner);
		await this.createTableOperationStatus(queryRunner);
		/**
		 * Creating Foreign Keys
		 */
		await this.createForeignKeys(queryRunner);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		/**
		 * Drop Table Foreign Keys
		 */
		await queryRunner.dropForeignKey('account_event', 'account_event_external_account');
		await queryRunner.dropForeignKey('asset', 'asset_company');
		await queryRunner.dropForeignKey('external_account', 'external_account_client');
		await queryRunner.dropForeignKey('operation', 'operation_client');
		await queryRunner.dropForeignKey('operation', 'operation_asset');
		await queryRunner.dropForeignKey('operation_status', 'operation_status_operation');
		/**
		 * Drop Tables
		 */
		await queryRunner.dropTable('account_event');
		await queryRunner.dropTable('asset');
		await queryRunner.dropTable('client');
		await queryRunner.dropTable('company');
		await queryRunner.dropTable('external_account');
		await queryRunner.dropTable('operation');
		await queryRunner.dropTable('operation_status');
		/**
		 * Drop Types
		 */
		await queryRunner.query('DROP TYPE "eventType"');
		await queryRunner.query('DROP TYPE "eventStatus"');
		await queryRunner.query('DROP TYPE "assetType"');
		await queryRunner.query('DROP TYPE "operationType"');
		await queryRunner.query('DROP TYPE "statusType"');
	}

	public configColumnsTable(otherColums: TableColumnOptions[], pkType = 'int', pkColumnName = 'id'): TableColumnOptions[] {
		return [
			{
				name: pkColumnName,
				type: pkType,
				unsigned: true,
				isPrimary: true,
				isGenerated: true,
				generationStrategy: 'increment'
			},
			...otherColums
		];
	}

	public async createTableAccountEvent(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'account_event',
				columns: this.configColumnsTable(
					[
						{
							name: 'external_account_id',
							type: 'int'
						},
						{
							name: 'name',
							type: 'enum',
							enum: ['DEPOSIT', 'DRAFT'],
							enumName: 'eventType'
						},
						{
							name: 'account',
							type: 'varchar(8)'
						},
						{
							name: 'amount',
							type: 'decimal(18, 2)'
						},
						{
							name: 'status',
							type: 'enum',
							enum: ['NONPROCESSED', 'PROCESSED'],
							enumName: 'eventStatus'
						},
						{
							name: 'event_date',
							type: 'timestamp',
							default: 'now()'
						}
					],
					'int'
				)
			})
		);
	}

	public async createTableAsset(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'asset',
				columns: this.configColumnsTable(
					[
						{
							name: 'company_id',
							type: 'int'
						},
						{
							name: 'code',
							type: 'varchar(10)'
						},
						{
							name: 'type',
							type: 'enum',
							enum: ['ON', 'PN', 'PNA', 'PNB', 'UNIT', 'FII', 'CALL', 'PUT'],
							enumName: 'assetType'
						}
					],
					'int'
				)
			})
		);
	}

	public async createTableClient(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'client',
				columns: this.configColumnsTable(
					[
						{
							name: 'name',
							type: 'varchar(120)'
						},
						{
							name: 'cpf',
							type: 'varchar(14)'
						},
						{
							name: 'account',
							type: 'varchar(6)'
						},
						{
							name: 'email',
							type: 'varchar(120)'
						},
						{
							name: 'password',
							type: 'varchar(120)'
						},
						{
							name: 'birth_date',
							type: 'date'
						},
						{
							name: 'amount',
							type: 'decimal(18, 2)',
							default: '0'
						},
						{
							name: 'register_date',
							type: 'timestamp',
							default: 'now()'
						}
					],
					'int'
				)
			})
		);
	}

	public async createTableCompany(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'company',
				columns: this.configColumnsTable(
					[
						{
							name: 'name',
							type: 'varchar(200)'
						},
						{
							name: 'cnpj',
							type: 'varchar(18)'
						}
					],
					'int'
				)
			})
		);
	}

	public async createTableExternalAccount(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'external_account',
				columns: this.configColumnsTable(
					[
						{
							name: 'client_id',
							type: 'int'
						},
						{
							name: 'bank_code',
							type: 'varchar(5)'
						},
						{
							name: 'bank_branch',
							type: 'varchar(8)'
						},
						{
							name: 'register_date',
							type: 'timestamp',
							default: 'now()'
						}
					],
					'int'
				)
			})
		);
	}

	public async createTableOperation(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'operation',
				columns: this.configColumnsTable(
					[
						{
							name: 'client_id',
							type: 'int'
						},
						{
							name: 'asset_id',
							type: 'int'
						},
						{
							name: 'quantity',
							type: 'int'
						},
						{
							name: 'executed',
							type: 'int',
							default: 0
						},
						{
							name: 'unitary_value',
							type: 'decimal(18, 2)'
						},
						{
							name: 'negotiation_tax_value',
							type: 'decimal(18, 2)',
							default: 0
						},
						{
							name: 'sale_off_tax_value',
							type: 'decimal(18, 2)',
							default: 0
						},
						{
							name: 'type',
							type: 'enum',
							enum: ['BUY', 'SELL'],
							enumName: 'operationType'
						}
					],
					'int'
				)
			})
		);
	}

	public async createTableOperationStatus(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'operation_status',
				columns: this.configColumnsTable(
					[
						{
							name: 'operation_id',
							type: 'int'
						},
						{
							name: 'quantity',
							type: 'int'
						},
						{
							name: 'type',
							type: 'enum',
							enum: ['PENDING', 'PRTEXEC', 'TTLEXEC', 'REJECTD', 'PRTCCLD', 'TTLCCLD'],
							enumName: 'statusType'
						},
						{
							name: 'status_date',
							type: 'timestamp',
							default: 'now()'
						}
					],
					'int'
				)
			})
		);
	}

	public async createForeignKeys(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createForeignKey(
			'external_account',
			new TableForeignKey({
				columnNames: ['client_id'],
				referencedColumnNames: ['id'],
				referencedTableName: 'client',
				name: 'external_account_client',
				onDelete: 'RESTRICT',
				onUpdate: 'CASCADE'
			})
		);
		await queryRunner.createForeignKey(
			'account_event',
			new TableForeignKey({
				columnNames: ['external_account_id'],
				referencedColumnNames: ['id'],
				referencedTableName: 'external_account',
				name: 'account_event_external_account',
				onDelete: 'RESTRICT',
				onUpdate: 'CASCADE'
			})
		);
		await queryRunner.createForeignKey(
			'operation',
			new TableForeignKey({
				columnNames: ['client_id'],
				referencedColumnNames: ['id'],
				referencedTableName: 'client',
				name: 'operation_client',
				onDelete: 'RESTRICT',
				onUpdate: 'CASCADE'
			})
		);
		await queryRunner.createForeignKey(
			'operation',
			new TableForeignKey({
				columnNames: ['asset_id'],
				referencedColumnNames: ['id'],
				referencedTableName: 'asset',
				name: 'operation_asset',
				onDelete: 'RESTRICT',
				onUpdate: 'CASCADE'
			})
		);
		await queryRunner.createForeignKey(
			'operation_status',
			new TableForeignKey({
				columnNames: ['operation_id'],
				referencedColumnNames: ['id'],
				referencedTableName: 'operation',
				name: 'operation_status_operation',
				onDelete: 'RESTRICT',
				onUpdate: 'CASCADE'
			})
		);
		await queryRunner.createForeignKey(
			'asset',
			new TableForeignKey({
				columnNames: ['company_id'],
				referencedColumnNames: ['id'],
				referencedTableName: 'company',
				name: 'asset_company',
				onDelete: 'RESTRICT',
				onUpdate: 'CASCADE'
			})
		);
	}
}
