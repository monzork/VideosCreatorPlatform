import {
  Column,
  Model,
  Table,
  PrimaryKey,
  Index,
  BelongsToMany,
  ForeignKey,
  Default,
  AutoIncrement
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
  // @NotNull
  public title: string;

  @Column
  // @NotNull
  public url: string;

  @BelongsToMany(() => User, () => UserVideo)
  public users: User[];

  @ForeignKey(() => User)
  @Column
  public userId: number;
}
