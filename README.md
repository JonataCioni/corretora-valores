# corretora-valores
Projeto Corretora De Valores

# Database
CREATE SCHEMA corretora AUTHORIZATION postgres;

# Configuration
In .ENV file, set database connection config:
DB_TYPE, DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME and DB_SCHEMA

# Comands To Run
1º: yarn install
2º: yarn dev:typeorm migration:run