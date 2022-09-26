import path from 'path';
import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

import config from '../config/database-env';

const env = process.env.NODE_ENV || 'development';

const sequelize = new Sequelize({
  models: [path.join(__dirname, '/domain/*.model.ts')],
  ...(config[env] as SequelizeOptions)
});

export default sequelize;
