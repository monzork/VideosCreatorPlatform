import {
  Column,
  HasMany,
  Model,
  Table,
  PrimaryKey,
  BelongsToMany,
  Index
} from 'sequelize-typescript';
import UserVideo from './uservideo.model';
import Video from './video.model';

@Table({ tableName: 'user' })
export default class User extends Model {
  @Index
  @PrimaryKey
  @Column
  public id: number;

  @BelongsToMany(() => Video, () => UserVideo)
  public videos: Video[];

  @HasMany(() => Video)
  public video: Video[];

  @Column
  public name: string;

  @Column
  public email: number;

  @Column
  public password: string;

  @Column
  public type: string;

  @Column
  public photo: string;
}
