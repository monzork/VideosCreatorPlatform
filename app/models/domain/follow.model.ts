import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
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

  // @ForeignKey(() => User)
  // @Column
  @BelongsTo(() => User, 'fk_idFollowed')
  public followed: User[];

  // @ForeignKey(() => User)
  // @Column
  @BelongsTo(() => User, 'fk_idFollower')
  public follower: User[];
}
