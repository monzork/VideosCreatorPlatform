import { Express, Request, Response } from 'express';
import * as express from 'express';
import * as userRoutes from './userRoutes';

export function initRoutes(app: Express) {
  app.get('/', (_: Request, res: Response) =>
    res.status(200).send({ message: 'Welcome to IMFO world' })
  );

  app.use('/user', userRoutes.initRoutes(app, express.Router()));
}
