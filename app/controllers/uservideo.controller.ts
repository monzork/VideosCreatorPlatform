import { Get, Route, Controller, Query, Post, Body, Put } from 'tsoa';
import Video from '../models/domain/video.model';
import { instanceToPlain } from 'class-transformer';
import autoMap from '../utils/autoMap';
import {
  InsertUserVideoDto,
  ReadUserVideoDto,
  ReadUserVideoInformationDto,
  UpdateUserVideoDto
} from '../models/schemas/video/uservideo';
import UserVideo from '../models/domain/uservideo.model';
import sequelize from 'sequelize';
import { ReadVideoDto } from '../models/schemas/video/video';
import User from '../models/domain/user.model';
import { ReadUserDto } from '../models/schemas/users/user';

@Route('uservideo')
export class UserVideoController extends Controller {
  /**
   * Get video by id
   *
   * @summary Get uservideo
   *
   * @param {string} id uservideo id
   */
  @Get('{id}')
  public async get(id: number): Promise<ReadUserVideoDto> {
    return autoMap(
      ReadUserVideoDto,
      await UserVideo.findOne({ where: { id } })
    );
  }

  /**
   * Get videos paginated
   *
   * @summary Get videos
   *
   * @param {string} pageNumber page number
   * @param {string} pageSize page size
   */
  @Get()
  public async getVideoInformation(
    @Query() videoId: number
  ): Promise<ReadUserVideoInformationDto> {
    const userVideoGroup = await UserVideo.findOne({
      attributes: [
        [sequelize.fn('sum', sequelize.col('view')), 'view'],
        [
          sequelize.fn('sum', sequelize.cast(sequelize.col('like'), 'integer')),
          'like'
        ]
      ],
      include: [
        {
          model: Video,
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['name']
            }
          ]
        }
      ],
      where: {
        videoId
      },
      group: ['video.id', 'video->user.id']
    });
    return {
      ...autoMap(ReadUserVideoInformationDto, userVideoGroup),
      ...autoMap(ReadVideoDto, userVideoGroup?.video),
      ...autoMap(ReadUserDto, userVideoGroup?.video.user)
    };
  }

  /**
   * Create view/like
   *
   * @summary Create view/like
   *
   * @param userVideo
   */

  @Post()
  public async create(
    @Body() userVideo: InsertUserVideoDto
  ): Promise<ReadUserVideoDto> {
    return autoMap(
      ReadUserVideoDto,
      await UserVideo.create(instanceToPlain(userVideo))
    );
  }

  @Put()
  public async update(
    @Body() userVideo: UpdateUserVideoDto
  ): Promise<number[]> {
    return await UserVideo.update(userVideo, {
      where: {
        videoId: userVideo.videoId,
        userId: userVideo.userId
      }
    });
  }
}
