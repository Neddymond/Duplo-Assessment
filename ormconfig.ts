import { DataSource } from 'typeorm';

const source = new DataSource({
  "type": "postgres",
  "host": "db",
  "port": 5432,
  "username": "postgres",
  "password": "postgres",
  "database": "postgres",
  "entities": [
    "dist/**/*.entity.js"
  ],
  "migrationsTableName": "migration",
  "migrations": [
    "dist/src/db/migrations/*.js"
  ],
  "ssl": false
});

source.initialize();

export default source;