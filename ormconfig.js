const rootDir = process.env.NODE_ENV === 'development' ? './src' : './build/src';
const arqTypeEntities = process.env.NODE_ENV === 'development' ? 'ts' : 'js';

module.exports = {
	type: process.env.DB_TYPE,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	username: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
	schema: process.env.DB_SCHEMA,
	entities: [`${rootDir}/layers/models/*.${arqTypeEntities}`],
	migrations: [`${rootDir}/database/migrations/*.ts`],
	cli: {
		migrationsDir: `${rootDir}/database/migrations`
	}
};
