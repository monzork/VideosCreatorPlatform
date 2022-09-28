import {
  Column,
  Model,
  Table,
  PrimaryKey,
  Index,
  ForeignKey,
  Default,
  AutoIncrement,
  BelongsTo
} from 'sequelize-typescript';
import User from './user.model';
import Video from './video.model';

@Table({ tableName: 'uservideo', timestamps: true })
export default class UserVideo extends Model {
  @Index
  @AutoIncrement
  @PrimaryKey
  @Column
  public id: number;

  @Column
  public like: boolean;

  @Default(0)
  @Column
  public view: number;

  @ForeignKey(() => Video)
  @Column
  public videoId: number;

  @BelongsTo(() => Video)
  public video: Video;

  @BelongsTo(() => User)
  public user: User;

  @ForeignKey(() => User)
  @Column
  public userId: number;
}
