import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
  PrimaryKey,
  BelongsToMany
} from 'sequelize-typescript';

@Table({ tableName: 'user' })
export default class User extends Model {
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
