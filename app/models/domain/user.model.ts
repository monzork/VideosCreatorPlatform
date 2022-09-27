import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
  PrimaryKey,
  BelongsToMany,
  Index
} from 'sequelize-typescript';
import Follow from './follow.model';

@Table({ tableName: 'user' })
export default class User extends Model {
  @Index
  @PrimaryKey
  @Column
  public id: number;

  // @BelongsToMany(() => User, () => Follow)
  // public follows: Follow[];

  // @BelongsToMany(() => User, () => Follow)
  // public followed: Follow[];

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
