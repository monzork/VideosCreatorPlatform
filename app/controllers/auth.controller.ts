import { Route, Controller, Body, Post } from 'tsoa';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { ReadSignInUserDto, SignInUserDto } from '../models/schemas/users/auth';
import User from '../models/domain/user.model';

@Route('auth')
export class AuthController extends Controller {
  /**
   * Sign in user
   *
   * @summary Sign in user
   *
   */
  @Post()
  public async create(
    @Body() userSignIn: SignInUserDto
  ): Promise<ReadSignInUserDto | null> {
    const targetUser = await User.findOne({
      where: {
        email: userSignIn.email
      }
    });

    if (!targetUser) {
      this.setStatus(401);
      return null;
    }

    try {
      if (bcrypt.compareSync(userSignIn.password, targetUser.password)) {
        const secret = process.env.SECRET!;
        return {
          token: jwt.sign(
            { id: targetUser.id, email: targetUser.email },
            secret
          )
        };
      }
      this.setStatus(401);
      return null;
    } catch (err) {
      this.setStatus(401);
      return null;
    }
  }
}
