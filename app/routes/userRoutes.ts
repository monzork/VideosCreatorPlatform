import { Express, Router } from 'express';
import { UserController } from '../controllers';
export function initRoutes(app: Express, router: Router) {
  const userController = new UserController();
  router.get('/', userController.readAll);
  router.post('/', userController.create);
  return router;
}
