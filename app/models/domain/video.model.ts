import {
  Column,
  Model,
  Table,
  PrimaryKey,
  Index,
  BelongsToMany,
  ForeignKey,
  Default,
  AutoIncrement,
  HasMany,
  BelongsTo
} from 'sequelize-typescript';
import User from './user.model';
import UserVideo from './uservideo.model';

@Table({ tableName: 'video' })
export default class Video extends Model {
  @Index
  @PrimaryKey
  @AutoIncrement
  @Column
  public id: number;

  @Default(false)
  @Column
  public published: boolean = false;

  @Column
  public title: string;

  @Column
  public url: string;

  @BelongsTo(() => User)
  public user: User;

  @HasMany(() => UserVideo)
  public uservideos: UserVideo[];

  @BelongsToMany(() => User, () => UserVideo)
  public users: User[];

  @ForeignKey(() => User)
  @Column
  public createdBy: number;
}
