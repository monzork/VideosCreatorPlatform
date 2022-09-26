import { Express, Router } from 'express';
import { UserController } from '../controllers';
import { auth } from '../middlewares/auth';

export function initRoutes(app: Express, router: Router) {
  const userController = new UserController();
  // router.get('/', auth, (req, response) =>
  //   response.status(200).json(userController.readAll())
  // );
  // router.post('/', async (req, response) => {
  //   try {
  //     response.status(200).json(await userController.create(req.body));
  //   } catch {
  //     response.status(500).send('Creation Failed');
  //   }
  // });
  // router.post('/sigin', async (req, response) =>
  //   response.status(200).json(await userController.sigIn(req.body))
  // );
  return router;
}
