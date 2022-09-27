import {
  Column,
  HasMany,
  Model,
  Table,
  PrimaryKey,
  BelongsToMany,
  Index,
  AutoIncrement
} from 'sequelize-typescript';
import UserVideo from './uservideo.model';
import Video from './video.model';

@Table({ tableName: 'user' })
export default class User extends Model {
  @Index
  @AutoIncrement
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
  public email: string;

  @Column
  public password: string;

  @Column
  public type: string;

  @Column
  public photo: string;
}
