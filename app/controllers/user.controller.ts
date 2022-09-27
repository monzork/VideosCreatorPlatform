import {
  Get,
  Route,
  Controller,
  Query,
  Post,
  Body,
  SuccessResponse
} from 'tsoa';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import User from '../models/domain/user.model';
import {
  ReadUserDto,
  ReadUserDtoPaginated
} from '../models/schemas/users/user';

import { plainToInstance } from 'class-transformer';

@Route('users')
export class UserController extends Controller {
  /**
   * Get user by id
   *
   * @summary Get user
   *
   * @param {string} id user id
   */
  @Get('{id}')
  public async get(id: number): Promise<ReadUserDto> {
    const user = await User.findOne({ where: { id } });

    return plainToInstance(ReadUserDto, user, {
      excludeExtraneousValues: true
    });
  }

  /**
   * Get users paginated
   *
   * @summary Get users
   *
   * @param {string} pageNumber page number
   * @param {string} pageSize page size
   */
  @Get()
  public async getAll(
    @Query() search?: string,
    @Query() pageNumber: number = 1,
    @Query() pageSize: number = 5
  ): Promise<ReadUserDtoPaginated> {
    const totalUsers = await User.count();

    const users = await User.findAll({
      limit: pageSize,
      offset: (pageNumber - 1) * pageSize
    });

    const response: ReadUserDtoPaginated = {
      total: totalUsers,
      data: plainToInstance(ReadUserDto, users, {
        excludeExtraneousValues: true
      })
    };

    return response;
  }

  // @Get()
  // public async readAll(@Query() search?: string): Promise<UserDTO[]> {
  //   return await db.User.findAll();
  // }

  // @SuccessResponse('201', 'Created')
  // @Post()
  // public async create(@Body() user: UserDTO): Promise<UserDTO> {
  //   user.password = bcrypt.hashSync(user.password, 3);
  //   return await db.User.create(user);
  // }

  // @SuccessResponse(200, 'Sign In')
  // async sigIn(userSigIn: sigIn) {
  //   const { dataValues: userFound } = await db.User.findOne({
  //     where: {
  //       name: userSigIn.name
  //     }
  //   });

  //   if (bcrypt.compareSync(userSigIn.password, userFound.password)) {
  //     const secret = process.env.SECRET as string;
  //     return { token: jwt.sign(userFound, secret) };
  //   }
  // }
  // read(req: Request, res: Response) {
  //   db.User.findById(req.params.id)
  //     .then((user: UserAttributes | null) => {
  //       if (user) {
  //         res.json(user);
  //       } else {
  //         res.status(204).send();
  //       }
  //     })
  //     .catch((err: any) => {
  //       res.json(err);
  //     });
  // }

  // create(req: Request, res: Response) {
  //   db.User.create(req.body)
  //     .then((user: UserAttributes) => {
  //       res.json(user);
  //     })
  //     .catch((err: any) => {
  //       res.status(500).json(err);
  //     });
  // }

  // update(req: Request, res: Response) {
  //   db.User.update(req.body, {
  //     fields: Object.keys(req.body),
  //     where: { id: req.params.id }
  //   })
  //     .then((affectedRows: [number, UserAttributes[]]) => {
  //       res.json({
  //         affectedRows: Number(affectedRows)
  //       });
  //     })
  //     .catch((err: any) => {
  //       res.json(err);
  //     });
  // }

  // delete(req: Request, res: Response) {
  //   db.User.destroy({
  //     where: { id: req.params.id }
  //   })
  //     .then((removedRows: number) => {
  //       res.json({
  //         removedRows
  //       });
  //     })
  //     .catch((err: any) => {
  //       res.json(err);
  //     });
  // }
}
