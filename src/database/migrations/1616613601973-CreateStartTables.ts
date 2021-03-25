import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';
import { TableColumnOptions } from 'typeorm/schema-builder/options/TableColumnOptions';

export class CreateStartTables1616613601973 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		/**
		 * Creating Tables
		 */
		await this.createTableClient(queryRunner);
		await this.createTableExternalAccount(queryRunner);
		await this.createTableAccountEvent(queryRunner);
		await this.createTableOperation(queryRunner);
		await this.createTableOperationStatus(queryRunner);
		await this.createTableCompany(queryRunner);
		await this.createTableAsset(queryRunner);
		/**
		 * Creating Foreign Keys
		 */
		await this.createForeignKeys(queryRunner);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		/**
		 * Drop Table Foreign Keys
		 */
		await queryRunner.dropForeignKey('external_account', 'external_account_client');
		await queryRunner.dropForeignKey('account_event', 'account_event_external_account');
		await queryRunner.dropForeignKey('operation', 'operation_client');
		await queryRunner.dropForeignKey('operation', 'operation_asset');
		await queryRunner.dropForeignKey('operation_status', 'operation_status_operation');
		await queryRunner.dropForeignKey('asset', 'asset_company');
		/**
		 * Drop Tables
		 */
		await queryRunner.dropTable('client');
		await queryRunner.dropTable('external_account');
		await queryRunner.dropTable('account_event');
		await queryRunner.dropTable('operation');
		await queryRunner.dropTable('operation_status');
		await queryRunner.dropTable('company');
		await queryRunner.dropTable('asset');
		/**
		 * Drop Types
		 */
		await queryRunner.query('DROP TYPE "operationType"');
		await queryRunner.query('DROP TYPE "statusType"');
		await queryRunner.query('DROP TYPE "assetType"');
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
							type: 'varchar(11)'
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
							name: 'register_date',
							type: 'timestamp',
							default: 'now()'
						}
					],
					'bigint'
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
							type: 'bigint'
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
					'bigint'
				)
			})
		);
	}

	public async createTableAccountEvent(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'account_event',
				columns: this.configColumnsTable(
					[
						{
							name: 'external_account_id',
							type: 'bigint'
						},
						{
							name: 'name',
							type: 'varchar(10)'
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
							name: 'event_date',
							type: 'timestamp',
							default: 'now()'
						}
					],
					'bigint'
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
							type: 'bigint'
						},
						{
							name: 'asset_id',
							type: 'int'
						},
						{
							name: 'quantity',
							type: 'bigint'
						},
						{
							name: 'executed',
							type: 'bigint'
						},
						{
							name: 'unitary_value',
							type: 'decimal(18, 2)'
						},
						{
							name: 'tax_value',
							type: 'decimal(18, 2)'
						},
						{
							name: 'type',
							type: 'enum',
							enum: ['BUY', 'SELL'],
							enumName: 'operationType'
						}
					],
					'bigint'
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
							type: 'bigint'
						},
						{
							name: 'quantity',
							type: 'bigint'
						},
						{
							name: 'type',
							type: 'enum',
							enum: ['PENDING', 'PRTEXEC', 'TTLEXEC', 'REJECTD', 'CANCELD'],
							enumName: 'statusType'
						},
						{
							name: 'status_date',
							type: 'timestamp',
							default: 'now()'
						}
					],
					'bigint'
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
							type: 'varchar(14)'
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
							enum: ['ON', 'PN', 'UNIT', 'FII', 'CALL', 'PUT'],
							enumName: 'assetType'
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
