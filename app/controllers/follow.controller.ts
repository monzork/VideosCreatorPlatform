import { Route, Controller, Post, Body, Delete, Query, Get } from 'tsoa';
import { instanceToPlain } from 'class-transformer';
import {
  InsertFollowDto,
  ReadFollowDto,
  ReadFollowDtoPaginated
} from '../models/schemas/users/follow';
import Follow from '../models/domain/follow.model';
import autoMap from '../utils/autoMap';
import User from '../models/domain/user.model';
import { ReadUserDto } from '../models/schemas/users/user';

@Route('follow')
export class FollowController extends Controller {
  /**
   * Follow
   *
   * @summary Follow creator
   *
   * @param follow
   */
  @Post()
  public async follow(@Body() follow: InsertFollowDto): Promise<ReadFollowDto> {
    return autoMap(ReadFollowDto, await Follow.create(instanceToPlain(follow)));
  }

  /**
   * Get all followers
   *
   * @param {number} followedId followedId number
   * @param {string} pageNumber page number
   * @param {string} pageSize page size
   *
   * @param followedId {}
   */
  @Get()
  public async getAllFollowersById(
    @Query() followedId: number,
    @Query() pageNumber: number = 1,
    @Query() pageSize: number = 5
  ): Promise<ReadFollowDtoPaginated> {
    const totalFollowers = await Follow.count({
      where: {
        followedId
      }
    });

    const followers = await Follow.findAll({
      include: [{ model: User, as: 'follower' }],
      limit: pageSize,
      offset: (pageNumber - 1) * pageSize,
      where: {
        followedId
      }
    });

    return {
      total: totalFollowers,
      data: autoMap(
        ReadUserDto,
        followers.map((e) => e.follower)
      )
    };
  }

  /**
   * Unfollow
   *
   * @param {InsertFollowDto} follow follow InsertFollowDto
   *
   */
  @Delete()
  public async unfollow(@Body() follow: InsertFollowDto): Promise<number> {
    return await Follow.destroy({
      where: {
        followedId: follow.followerId,
        followerId: follow.followerId
      }
    });
  }
}
