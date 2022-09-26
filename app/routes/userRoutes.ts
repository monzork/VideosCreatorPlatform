import { Express, Router } from 'express';
import { UserController } from '../controllers';
import { auth } from '../middlewares/auth';
export function initRoutes(app: Express, router: Router) {
  const userController = new UserController();
  router.get('/', auth, (req, response) =>
    userController.readAll(req, response)
  );
  router.post('/', (req, response) => userController.create(req, response));
  router.post('/sigin', (req, response) => userController.sigIn(req, response));
  return router;
}
