import express, { Express, urlencoded } from 'express';
import dotenv from 'dotenv';
import * as winston from 'winston';
import * as routes from './routes';
import cors from 'cors';
import morgan from 'morgan';
import environment from './config/environment';
import db from './db/models';
dotenv.config();

const PORT: number = environment.port ? +environment.port : 5000;

export class Server {
  private app: Express;
  constructor() {
    this.app = express();

    this.app.use(
      cors({
        optionsSuccessStatus: 200
      })
    );
    this.app.use(
      urlencoded({
        extended: true
      })
    );
    this.app.use(morgan('combined'));
    db.sequelize.sync().then(() => {
      this.app.listen(PORT, () => {
        winston.log('info', `--> Server successfully started at port ${PORT}'`);
      });
    });

    routes.initRoutes(this.app);
  }

  getApp() {
    return this.app;
  }
}

// eslint-disable-next-line no-new
new Server();

// const allowedOrigins = ['http://localhost:5000'];

// const options: cors.CorsOptions = {
//   origin: allowedOrigins
// };

// app.use(cors(options));
