import { Get, Route, Controller, Query, Post, Body, Put } from 'tsoa';
import Video from '../models/domain/video.model';
import { instanceToPlain } from 'class-transformer';
import autoMap from '../utils/autoMap';
import {
  InsertVideoDto,
  ReadVideoDto,
  ReadVideoDtoPaginated,
  UpdateVideoDto
} from '../models/schemas/video/video';

@Route('video')
export class VideoController extends Controller {
  /**
   * Get video by id
   *
   * @summary Get video
   *
   * @param {string} id video id
   */
  @Get('{id}')
  public async get(id: number): Promise<ReadVideoDto> {
    return autoMap(ReadVideoDto, await Video.findOne({ where: { id } }));
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
  public async getAll(
    @Query() search?: string,
    @Query() pageNumber: number = 1,
    @Query() pageSize: number = 5
  ): Promise<ReadVideoDtoPaginated> {
    const totalVideos = await Video.count();

    const videos = await Video.findAll({
      limit: pageSize,
      offset: (pageNumber - 1) * pageSize
    });
    return {
      total: totalVideos,
      data: autoMap(ReadVideoDto, videos)
    };
  }

  /**
   * Create video
   *
   * @summary Create video
   *
   * @param video
   */

  @Post()
  public async create(@Body() video: InsertVideoDto): Promise<ReadVideoDto> {
    return autoMap(ReadVideoDto, await Video.create(instanceToPlain(video)));
  }

  @Put()
  public async update(@Body() video: UpdateVideoDto): Promise<number[]> {
    return await Video.update(video, { where: { id: video.id } });
  }
}
