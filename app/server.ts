import express, { Express, urlencoded } from 'express';
import dotenv from 'dotenv';
import logger from './logger';
import swaggerUi from 'swagger-ui-express';
import bodyParser = require('body-parser');
import * as routes from './routes';
import cors from 'cors';
import morgan from 'morgan';
import environment from './config/environment';

import Sequelice from './models/db';

import * as swaggerJson from '../public/swagger.json';

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
    this.app.use(
      bodyParser.urlencoded({
        extended: true
      })
    );

    this.app.use(bodyParser.json());

    this.app.use(
      ['/openapi', '/docs', '/swagger'],
      swaggerUi.serve,
      swaggerUi.setup(swaggerJson)
    );

    Sequelice.sync().then(() => {
      this.app.listen(PORT, () => {
        logger.log('info', `--> Server successfully started at port ${PORT}'`);
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
