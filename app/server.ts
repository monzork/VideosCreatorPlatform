import express, { Express, urlencoded } from 'express';
import dotenv from 'dotenv';
import logger from './logger';
import swaggerUi from 'swagger-ui-express';
import bodyParser = require('body-parser');

import cors, { CorsOptions } from 'cors';
import morgan from 'morgan';
import environment from './config/environment';

import Sequelize from './models/db';

import { RegisterRoutes } from '../build/routes';

// ########################################################################
// controllers
import './controllers/user.controller';
import './controllers/auth.controller';
// ########################################################################

dotenv.config();

const PORT: number = +environment.port! || 5000;

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
    this.app.use(
      bodyParser.urlencoded({
        extended: true
      })
    );

    const allowedOrigins: string[] = ['http://localhost:5000'];

    const options: CorsOptions = {
      origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin || '') !== -1) {
          callback(null, true);
        }
      }
    };

    this.app.use(cors(options));

    this.app.use(bodyParser.json());

    RegisterRoutes(this.app);

    this.app.use('/docs', swaggerUi.serve, async (_req: any, res: any) =>
      res.send(swaggerUi.generateHTML(await import('../build/swagger.json')))
    );

    Sequelize.sync().then(() => {
      this.app.listen(PORT, () => {
        logger.log('info', `--> Server successfully started at port ${PORT}'`);
      });
    });
  }

  getApp() {
    return this.app;
  }
}

// eslint-disable-next-line no-new
new Server();
