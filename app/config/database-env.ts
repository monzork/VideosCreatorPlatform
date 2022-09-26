import dotenv from 'dotenv';
import { SequelizeOptions } from 'sequelize-typescript';

dotenv.config();

interface IConfig {
  [key: string]: SequelizeOptions;
}

export default {
  development: {
    username: process.env.DB_USER!,
    password: process.env.DB_PASS!,
    database: process.env.DB_NAME!,
    host: '127.0.0.1',
    port: 15432,
    dialect: 'postgres',
    logging: false
  },
  production: {
    username: 'root',
    password: 'root',
    database: 'database_production',
    host: '127.0.0.1',
    port: 15432,
    dialect: 'postgres'
  }
} as IConfig;
