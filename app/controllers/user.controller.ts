import { Get, Route, Controller, Query, Post, Body, Security } from 'tsoa';
import bcrypt from 'bcrypt';
import User from '../models/domain/user.model';
import {
  InsertUserDto,
  ReadUserDto,
  ReadUserDtoPaginated
} from '../models/schemas/users/user';
import { instanceToPlain } from 'class-transformer';
import autoMap from '../utils/autoMap';
import jwt from 'jsonwebtoken';

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
  @Security('jwt')
  public async get(id: number): Promise<ReadUserDto> {
    return autoMap(ReadUserDto, await User.findOne({ where: { id } }));
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
  @Security('jwt')
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
      data: autoMap(ReadUserDto, users)
    };

    return response;
  }

  /**
   * Create user
   *
   * @summary Create user
   *
   * @param user
   */

  @Post()
  public async create(@Body() user: InsertUserDto): Promise<{ token: string }> {
    user.password = bcrypt.hashSync(user.password, +process.env.SALT!);
    const userInserted = await User.create(instanceToPlain(user));
    return {
      token: jwt.sign(
        { id: userInserted.id, email: userInserted.email },
        process.env.SECRET!
      )
    };
  }
}
