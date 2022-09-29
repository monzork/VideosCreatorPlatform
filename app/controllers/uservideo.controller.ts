import {
  Get,
  Route,
  Controller,
  Query,
  Post,
  Body,
  Put,
  Security,
  Header
} from 'tsoa';
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
   * Get video information paginated
   *
   * @summary Get video information
   *
   * @param {string} pageNumber page number
   * @param {string} pageSize page size
   */
  @Get()
  @Security('jwt')
  public async getVideosInformation(
    @Header('token') token: string,
    @Query() pageNumber: number = 1,
    @Query() pageSize: number = 5
  ): Promise<ReadUserVideoInformationDto[]> {
    const userVideoGroup = await UserVideo.findAll({
      attributes: [
        [sequelize.fn('sum', sequelize.col('view')), 'view'],
        [
          sequelize.fn('sum', sequelize.cast(sequelize.col('like'), 'integer')),
          'like'
        ]
      ],
      limit: pageSize,
      offset: (pageNumber - 1) * pageSize,
      include: [
        {
          model: Video,
          attributes: ['id', 'published', 'title', 'url'],
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['name']
            }
          ]
        }
      ],
      group: ['video.id', 'video->user.id']
    });

    return userVideoGroup.map((usg) => ({
      view: usg.view,
      id: usg.videoId,
      like: Number(usg.like),
      published: usg.video.published,
      title: usg.video.title,
      url: usg.video.url,
      name: usg.video.user.name
    }));
  }

  /**
   * Get video information paginated
   *
   * @summary Get video information
   *
   * @param {string} pageNumber page number
   * @param {string} pageSize page size
   */
  @Get('{id}')
  public async getVideoInformation(
    id: number
  ): Promise<ReadUserVideoInformationDto> {
    const userVideoGroup = await UserVideo.findOne({
      attributes: [
        [sequelize.fn('sum', sequelize.col('view')), 'viewCount'],
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
        id
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

  /**
   * Update Like status
   *
   * @summary Update Like status
   *
   * @param userVideo
   */

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
