import { Dialect, Sequelize } from 'sequelize';
import { environment } from '.';
const dbName = environment.DB_NAME as string;
const dbUser = environment.DB_USER as string;
const dbHost = environment.DB_HOST;
const dbDriver = environment.DB_DRIVER as Dialect;
const dbPassword = environment.DB_PASSWORD;

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDriver
});
export default sequelizeConnection;
