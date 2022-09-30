import dotenv from 'dotenv';
import path from 'path';
import { SequelizeOptions } from 'sequelize-typescript';

dotenv.config();

interface IConfig {
  [key: string]: SequelizeOptions;
}

const config = {
  development: {
    username: process.env.DB_USER!,
    password: process.env.DB_PASS!,
    database: process.env.DB_NAME!,
    host: process.env.DB_HOST!,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    models: [path.join(__dirname, '../models/domain')],
    logging: false
  }
} as IConfig;
export default config;
module.exports = config;
