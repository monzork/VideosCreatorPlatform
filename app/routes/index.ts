import { Express, Request, Response } from 'express';

export function initRoutes(app: Express) {
  app.get('/', (_: Request, res: Response) =>
    res.status(200).send({ message: 'Welcome to IMFO world' })
  );
}
