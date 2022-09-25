import { Request, Response } from 'express';
import { UserAttributes } from '../db/models/user';
import db from '../db/models/index';

export class UserController {
  readAll(req: Request, res: Response) {
    db.User.findAll()
      .then((users: UserAttributes[]) => {
        res.json(users);
      })
      .catch((err: any) => {
        res.json(err);
      });
  }

  read(req: Request, res: Response) {
    db.User.findById(req.params.id)
      .then((user: UserAttributes | null) => {
        if (user) {
          res.json(user);
        } else {
          res.status(204).send();
        }
      })
      .catch((err: any) => {
        res.json(err);
      });
  }

  create(req: Request, res: Response) {
    db.User.create(req.body)
      .then((user: UserAttributes) => {
        res.json(user);
      })
      .catch((err: any) => {
        res.status(500).json(err);
      });
  }

  update(req: Request, res: Response) {
    db.User.update(req.body, {
      fields: Object.keys(req.body),
      where: { id: req.params.id }
    })
      .then((affectedRows: [number, UserAttributes[]]) => {
        res.json({
          affectedRows: Number(affectedRows)
        });
      })
      .catch((err: any) => {
        res.json(err);
      });
  }

  delete(req: Request, res: Response) {
    db.User.destroy({
      where: { id: req.params.id }
    })
      .then((removedRows: number) => {
        res.json({
          removedRows
        });
      })
      .catch((err: any) => {
        res.json(err);
      });
  }
}
