import {
  BelongsTo,
  Column,
  Model,
  Table,
  PrimaryKey,
  Index,
  AutoIncrement
} from 'sequelize-typescript';
import User from './user.model';

@Table({ tableName: 'follow' })
export default class Follow extends Model {
  @Index
  @AutoIncrement
  @PrimaryKey
  @Column
  public id: number;

  @BelongsTo(() => User, 'followedId')
  public followed: User;

  @BelongsTo(() => User, 'followerId')
  public follower: User;
}
